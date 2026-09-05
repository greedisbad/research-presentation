"""Transcribe short audio samples locally with faster-whisper."""

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    parser.add_argument("inputs", nargs="+", type=Path)
    parser.add_argument("--model", default="base")
    args = parser.parse_args()

    # Delay the optional heavyweight import so `--help` remains usable when the
    # transcription environment has not been installed.
    from faster_whisper import WhisperModel

    model = WhisperModel(args.model, device="cpu", compute_type="int8")
    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "engine": "faster-whisper",
        "model": args.model,
        "samples": [],
    }

    for audio_path in args.inputs:
        segments, info = model.transcribe(
            str(audio_path),
            language="zh",
            beam_size=5,
            vad_filter=True,
            word_timestamps=False,
        )
        report["samples"].append(
            {
                "file": audio_path.name,
                "language": info.language,
                "language_probability": info.language_probability,
                "segments": [
                    {"start": item.start, "end": item.end, "text": item.text.strip()}
                    for item in segments
                ],
            }
        )

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
