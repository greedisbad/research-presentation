# Oral Feedback Manuscript Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a new, evidence-aware slide-by-slide Chinese speaking manuscript from `口播.txt` without forcing a target page count.

**Architecture:** Preserve the six-act macro arc while reorganizing the body around complete project stories. Treat the transcript as both editorial instructions and first-person source material, verify checkable technical claims, and keep uncertain recollections inside explicit evidence boundaries.

**Tech Stack:** Markdown, local project evidence, official technical documentation, Git.

**Spec:** `docs/40-口播反馈重写设计.md`

## Global Constraints

- Do not overwrite `docs/37-全量逐页演讲稿.md`.
- Do not force a fixed page count.
- Keep each project coherent instead of scattering it across method chapters.
- Preserve the three jokes verbatim.
- Do not fabricate screenshots, code, versions, or source findings.
- Keep B747 to two or three main pages and Bilibili to a brief mention.

---

### Task 1: Build the traceability map

**Files:**
- Read: `docs/口播.txt`
- Read: `docs/37-全量逐页演讲稿.md`
- Read: `docs/38-案例演讲素材母稿.md`
- Create: `docs/41-口播反馈落实审计.md`

- [x] Classify every transcript passage as required fact, structural instruction, deletion, correction, or uncertain recollection.
- [x] Map retained passages to the proposed project chapter and record every intentional omission.
- [x] Check the map for unassigned non-instruction project details.

### Task 2: Verify technical claims and source boundaries

**Files:**
- Read: `docs/evidence/`
- Read: local project `IMPLEMENTATION-NOTES.md` files referenced by the evidence index
- Modify: `docs/41-口播反馈落实审计.md`

- [x] Verify ECharts field/version wording against official or installed-version evidence.
- [x] Verify Deck.gl route, validation, and recommendation wording against the implementation notes.
- [x] Verify WPS, Web Excel, B747, Dice, aircraft-modeling, and Tabloom claims against their archived materials.
- [x] Mark recollections that can only be presented as first-person experience.

### Task 3: Write the new full manuscript

**Files:**
- Create: `docs/42-口播反馈重写版逐页演讲稿.md`

- [x] Draft the opening and WPS story with verbatim joke treatment.
- [x] Draft the B747 search-chain story in two or three pages.
- [x] Draft the independent Web Excel, ECharts, and Deck.gl stories.
- [x] Draft the Codex capability and migration chapters using Dice, aircraft modeling, and Tabloom only where they add a new point.
- [x] Draft the closing around durable project memory and the final memory joke.

### Task 4: Perform editorial verification

**Files:**
- Modify: `docs/41-口播反馈落实审计.md`
- Modify: `docs/42-口播反馈重写版逐页演讲稿.md`

- [x] Check that every page carries a fact, turn, method, or transition.
- [x] Check that project stories are not needlessly repeated.
- [x] Check that claims, visuals, and evidence boundaries match.
- [x] Check transcript coverage and document any intentional exclusion.
- [x] Run Markdown structure, placeholder, and broken local-link checks.

### Task 5: Commit the verified manuscript package

**Files:**
- Add: `docs/口播.txt`
- Add: `docs/40-口播反馈重写设计.md`
- Add: `docs/41-口播反馈落实审计.md`
- Add: `docs/42-口播反馈重写版逐页演讲稿.md`
- Add: `docs/superpowers/plans/2026-09-21-oral-feedback-manuscript-rewrite.md`

- [x] Inspect the diff and repository status for unrelated files.
- [x] Commit only the transcript and rewrite package after verification.
