"""Capture reproducible Deck.gl runtime evidence from the four local experiments."""

import json
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright


ROUTES = [
    "01-update-triggers.html",
    "02-transitions.html",
    "03-shader-animation.html",
    "04-baseline-radians.html",
]

BASE_URL = "http://127.0.0.1:8765"
CHROMIUM = (
    "/Users/wang/Library/Caches/ms-playwright/chromium-1234/"
    "chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
)
OUTPUT = Path(__file__).resolve().parents[1] / "runtime" / "deckgl"


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = {
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "base_url": BASE_URL,
        "browser": CHROMIUM,
        "routes": [],
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=CHROMIUM)
        # 1440 px keeps the diagnostic panel inside the captured frame on all
        # four layouts; the narrower viewport clipped route 04's left panel.
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        # The static experiment intentionally has no favicon. Fulfil the browser's
        # implicit request so an unrelated 404 does not pollute console evidence.
        page.route("**/favicon.ico", lambda route: route.fulfill(status=204, body=""))

        for route in ROUTES:
            console_errors = []
            page_errors = []
            http_errors = []

            def on_console(message):
                if message.type == "error":
                    console_errors.append(message.text)

            def on_page_error(error):
                page_errors.append(str(error))

            def on_response(response):
                if response.status >= 400:
                    http_errors.append({"status": response.status, "url": response.url})

            page.on("console", on_console)
            page.on("pageerror", on_page_error)
            page.on("response", on_response)
            response = page.goto(f"{BASE_URL}/{route}", wait_until="domcontentloaded")
            page.locator("#pixel-status").wait_for(state="visible")
            page.wait_for_timeout(5200)

            metrics = page.evaluate(
                """() => ({
                    title: document.querySelector('h1')?.textContent || '',
                    fps: Number(document.querySelector('#fps')?.textContent || 0),
                    frames: Number(document.querySelector('[data-testid="frame-count"]')?.textContent || 0),
                    changes: Number((document.querySelector('#pixel-changes')?.textContent || '0/0').split('/')[0]),
                    pixelSamples: Number((document.querySelector('#pixel-changes')?.textContent || '0/0').split('/')[1]),
                    staticInits: Number(document.querySelector('#static-inits')?.textContent || 0),
                    submits: Number(document.querySelector('#submits')?.textContent || 0),
                    autoPick: document.body.dataset.autoPick || '',
                    deckError: document.body.dataset.error || '',
                    pixelStatus: document.querySelector('#pixel-status')?.textContent?.trim() || ''
                })"""
            )

            page.locator("#toggle").click()
            page.wait_for_timeout(300)
            paused = page.locator("body").get_attribute("data-paused")
            screenshot = OUTPUT / route.replace(".html", ".png")
            page.evaluate("window.scrollTo(0, 0)")
            page.screenshot(path=str(screenshot), full_page=True)

            functional_http_errors = [
                item for item in http_errors if not item["url"].endswith("/favicon.ico")
            ]
            functional_console_errors = [
                message
                for message in console_errors
                if not (
                    message.startswith("Failed to load resource:")
                    and not functional_http_errors
                )
            ]
            ignored_console_errors = [
                message for message in console_errors if message not in functional_console_errors
            ]
            checks = {
                "http_ok": bool(response and response.ok),
                "frames_gt_60": metrics["frames"] > 60,
                "pixel_changes_gte_2": metrics["changes"] >= 2,
                "static_layer_initialized_once": metrics["staticInits"] == 1,
                "icon_pickable": metrics["autoPick"] == "true",
                "pause_control": paused == "true",
                "no_deck_error": not metrics["deckError"],
                "no_page_error": not page_errors,
                "no_functional_http_error": not functional_http_errors,
                "no_console_error": not functional_console_errors,
            }
            report["routes"].append(
                {
                    "route": route,
                    "http_status": response.status if response else None,
                    "metrics": metrics,
                    "paused": paused,
                    "checks": checks,
                    "page_errors": page_errors,
                    "console_errors": console_errors,
                    "ignored_nonfunctional_console_errors": ignored_console_errors,
                    "http_errors": http_errors,
                    "ignored_nonfunctional_errors": [
                        item for item in http_errors if item["url"].endswith("/favicon.ico")
                    ],
                    "screenshot": screenshot.name,
                    "passed": all(checks.values()),
                }
            )

            page.remove_listener("console", on_console)
            page.remove_listener("pageerror", on_page_error)
            page.remove_listener("response", on_response)

        browser.close()

    report["passed"] = all(item["passed"] for item in report["routes"])
    report_path = OUTPUT / "runtime-report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if not report["passed"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
