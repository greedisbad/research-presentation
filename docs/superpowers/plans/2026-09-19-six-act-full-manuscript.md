# Six-Act Full Presentation Manuscript Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an evidence-linked, deliberately over-complete Chinese manuscript for the approved six-act presentation, plus a reusable case-material manuscript and multiple opening/closing candidates.

**Architecture:** Treat the existing research repository as the evidence layer, `docs/38-案例演讲素材母稿.md` as the factual story layer, `docs/39-开场与结尾候选.md` as the rhetorical option layer, and `docs/37-全量逐页演讲稿.md` as the assembled presentation layer. Read original local project retrospectives before expanding Codex behavior claims; write the detailed case material before composing slide narration so the full manuscript can link every concrete claim back to a source.

**Tech Stack:** Markdown, Git, ripgrep, shell-based structural checks, existing local project retrospectives and evidence documents.

**Spec:** `docs/36-六幕全量演讲稿结构设计.md`

## Global Constraints

- Write in Chinese and preserve necessary English terms such as Issue, PR, Commit Message, worktree, lint and runtime.
- Preserve `docs/30-完整长版故事板.md`, `docs/31-长版故事板逐页制作规格.md` and `docs/32-逐页演讲文稿母版.md` unchanged as historical and methodological references.
- Do not modify or stage the user's existing changes in `docs/19-外部大师观点与成熟实践.md`.
- Do not compress the material to 45 minutes during this implementation; label material for later deletion instead.
- Keep B747, WPS, Web Excel and Deck.gl as the four narrative anchors; Deck.gl must appear in the later Codex act rather than the opening half.
- Keep Bilibili video transcription to a brief personal attempt, not a standalone chapter or a source of expert conclusions.
- Use aircraft modeling, Dice, Tabloom and the dice-game visual example as short evidence of Codex behaviors, not as full project walkthroughs.
- Do not invent the ECharts field name, package version, number of failed attempts, source screenshot or internal company code.
- Do not claim knowledge of Codex or Claude's unobservable internal search implementation and do not produce a model-brand ranking.
- Treat “几个月后工具可能自己补上” as humor and personal expectation, not a dated prediction.
- Treat jokes as rhetorical devices; do not present anthropomorphism such as “AI 偷懒” as a measured technical fact.
- For every slide, include one primary judgment, screen copy, full narration, visual placeholder, evidence/boundary, transition and arrangement label.
- Prefer real local project images and records. Mark reconstructed graphics as “示意” and unavailable evidence as “待补证”.
- Every concrete project claim must point to an existing local file or a clearly identified evidence document.
- Do not push to GitHub as part of this plan.

---

## File Structure

- Create `docs/37-全量逐页演讲稿.md`: assembled six-act slide-by-slide manuscript; this is the main artifact the speaker will later prune.
- Create `docs/38-案例演讲素材母稿.md`: detailed project stories, factual boundaries, candidate narration and visual inventory; this file feeds `docs/37` without imposing slide length.
- Create `docs/39-开场与结尾候选.md`: three supplied jokes, alternative non-joke hooks, placement advice, transitions and closing variants.
- Create `docs/evidence/C01-Codex项目复盘交叉提炼.md`: evidence matrix derived from the original Deck.gl, aircraft-modeling, Web Excel and Dice retrospective files plus existing Tabloom evidence.
- Modify `README.md`: add the four new documents to the project navigation after all four artifacts exist.
- Do not modify `docs/36-六幕全量演讲稿结构设计.md` unless execution uncovers a direct contradiction; record any such contradiction before changing the approved design.

### Task 1: Build the Codex Behavior Evidence Matrix

**Files:**
- Create: `docs/evidence/C01-Codex项目复盘交叉提炼.md`
- Read: `/Users/wang/Documents/ChatGPT/deckgl-rotation/IMPLEMENTATION-NOTES.md`
- Read: `/Users/wang/Documents/ChatGPT/aircraft-modeling/IMPLEMENTATION-NOTES.md`
- Read: `/Users/wang/Documents/ChatGPT/web-excel/IMPLEMENTATION-NOTES.md`
- Read: `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-08-31-session-retrospective.md`
- Read: `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-09-01-session-retrospective.md`
- Read: `/Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-09-02-session-retrospective.md`
- Read: `docs/26-案例-Tabloom信息搜集与决策轨迹.md`
- Read: `docs/evidence/T01-Tabloom信息缺口与来源路由.md`
- Read: `docs/evidence/T02-Tabloom真实边界与业务有效性.md`

**Interfaces:**
- Consumes: original project retrospectives and previously verified Tabloom evidence.
- Produces: a claim matrix with fields `能力表现`, `项目事实`, `原始文件`, `可讲判断`, `不能推出`, `建议画面`, `推荐度`; Tasks 2 and 4 may cite only claims recorded in this matrix when describing cross-project Codex behavior.

- [ ] **Step 1: Read every listed source in full and record file length and section headings**

  Run:

  ```bash
  wc -l \
    /Users/wang/Documents/ChatGPT/deckgl-rotation/IMPLEMENTATION-NOTES.md \
    /Users/wang/Documents/ChatGPT/aircraft-modeling/IMPLEMENTATION-NOTES.md \
    /Users/wang/Documents/ChatGPT/web-excel/IMPLEMENTATION-NOTES.md \
    /Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-08-31-session-retrospective.md \
    /Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-09-01-session-retrospective.md \
    /Users/wang/Documents/Codex/2026-08-30/wo/dice-game/docs/research/2026-09-02-session-retrospective.md \
    docs/26-案例-Tabloom信息搜集与决策轨迹.md \
    docs/evidence/T01-Tabloom信息缺口与来源路由.md \
    docs/evidence/T02-Tabloom真实边界与业务有效性.md
  ```

  Expected: all nine files exist and return non-zero line counts.

- [ ] **Step 2: Write the matrix with one evidence row per distinct behavior**

  Include at least these candidate dimensions, but retain only those supported by an original file: project orientation, source routing, version-aware source reading, competing hypotheses, tool fallback, compile/test/runtime feedback, visual inspection, asset acquisition, state persistence, negative knowledge, isolated experimentation and handoff documentation.

- [ ] **Step 3: Add an explicit “不能推出” column and project-level boundaries**

  The document must state that observed project behavior does not reveal vendor-internal reasoning or search architecture, does not prove universal superiority over another model, and may depend on the available tools and environment.

- [ ] **Step 4: Verify every matrix row contains a source path and a boundary**

  Run:

  ```bash
  rg -n '^\| ' docs/evidence/C01-Codex项目复盘交叉提炼.md
  rg -n '不能推出|边界|不证明|不可推出' docs/evidence/C01-Codex项目复盘交叉提炼.md
  git diff --check
  ```

  Expected: matrix rows are visible, boundary language exists, and `git diff --check` exits 0.

- [ ] **Step 5: Commit the evidence matrix**

  ```bash
  git add -- docs/evidence/C01-Codex项目复盘交叉提炼.md
  git commit -m "docs: synthesize Codex behavior evidence"
  ```

### Task 2: Write the Detailed Case-Material Manuscript

**Files:**
- Create: `docs/38-案例演讲素材母稿.md`
- Read: `docs/02-案例-WPS插件.md`
- Read: `docs/02A-WPS参考到代码映射.md`
- Read: `docs/33-新增案例-飞机建模与表格选型.md`
- Read: `docs/34-演讲叙事取舍与ECharts口述案例.md`
- Read: `docs/35-案例-B747货舱资料检索.md`
- Read: `docs/B747-400F_information_retrieval_method.md`
- Read: `docs/17-案例-Deckgl从失败到证据链.md`
- Read: `docs/18-案例-Dice调研记忆与任务交接.md`
- Read: `docs/26-案例-Tabloom信息搜集与决策轨迹.md`
- Read: `docs/evidence/C01-Codex项目复盘交叉提炼.md`
- Read: `docs/evidence/W05-WPS历史真机截图.md`
- Read: `docs/evidence/visual-source-inventory.md`

**Interfaces:**
- Consumes: case archives and the Task 1 evidence matrix.
- Produces: sections named `B747`, `WPS`, `Web Excel`, `Deck.gl`, `ECharts`, `飞机建模`, `Dice`, `Tabloom`, `大话骰视觉反馈`, and `B站转写尝试`, each with the fixed fields `背景`, `可见问题`, `AI行动`, `关键转折`, `工程产物`, `可讲细节`, `不能声称`, `图片候选`, `证据入口`, `建议篇幅`; Task 4 uses these sections as its factual source.

- [ ] **Step 1: Create the ten-section document and fixed field structure**

  Write the title, usage note and all ten case headings before expanding any narration. State that this is a material bank rather than a slide order.

- [ ] **Step 2: Expand the four anchor cases**

  B747, WPS, Web Excel and Deck.gl must each include the full sequence from initial problem through information retrieval or comparison to an executable artifact. B747 receives more business context than in the previous design; Deck.gl remains technical and later in the future slide order.

- [ ] **Step 3: Add the six short case entries**

  ECharts must remain an oral recollection without invented field names. Bilibili must explicitly say it is useful for discovering mainstream viewpoints and keywords but does not automatically provide authoritative conclusions. Aircraft modeling, Dice, Tabloom and dice-game visuals must be framed as Codex capability evidence rather than extra full chapters.

- [ ] **Step 4: Add visual placeholders and provenance labels**

  Every anchor case needs at least two image candidates. Each candidate must be labeled `项目图片`, `网站图片`, `搜索图片`, `示意图` or `待补证`, and state what it can and cannot prove.

- [ ] **Step 5: Verify case coverage and forbidden-detail boundaries**

  Run:

  ```bash
  for section in 'B747' 'WPS' 'Web Excel' 'Deck.gl' 'ECharts' '飞机建模' 'Dice' 'Tabloom' '大话骰视觉反馈' 'B站转写尝试'; do
    rg -q "^## .*${section}" docs/38-案例演讲素材母稿.md || exit 1
  done
  rg -q '不能声称' docs/38-案例演讲素材母稿.md
  ! rg -n 'getIconAngle|ECharts [0-9]+\.[0-9]+|改了[0-9]+版' docs/38-案例演讲素材母稿.md
  git diff --check
  ```

  Expected: all case sections exist, boundaries are explicit, no invented ECharts or Deck.gl API detail appears, and whitespace validation passes.

- [ ] **Step 6: Commit the case-material manuscript**

  ```bash
  git add -- docs/38-案例演讲素材母稿.md
  git commit -m "docs: write full case material manuscript"
  ```

### Task 3: Write Opening, Humor and Closing Candidates

**Files:**
- Create: `docs/39-开场与结尾候选.md`
- Read: `docs/36-六幕全量演讲稿结构设计.md`
- Read: `docs/38-案例演讲素材母稿.md`

**Interfaces:**
- Consumes: approved hook placement and case transitions.
- Produces: at least five opening candidates, placement notes for all three user-supplied jokes, transition variants into Act 2, and at least three closing variants; Task 4 selects one default but preserves alternatives here.

- [ ] **Step 1: Write five distinct opening candidates**

  Include: `AI 打工人` humor, ECharts failure story, B747 mystery-image opening, WPS “11 projects but no answer” opening, and a direct audience question. Each candidate must include 60–120 seconds of narration, strengths, risks, required visual and transition into the center question.

- [ ] **Step 2: Write placement cards for the three supplied jokes**

  Preserve the speaker's tone while providing a shorter stage-safe version and a boundary note for `AI 打工人`, `自己的脑子免费` and `AI has made memory more expensive`.

- [ ] **Step 3: Write three closing candidates**

  Include a practical three-action close, a project-memory close and a humorous future-interaction close. Every close must return responsibility to the human rather than promise autonomous correctness.

- [ ] **Step 4: Recommend a default rhetorical sequence without deleting alternatives**

  Default sequence: `AI 打工人` at opening, `自己的脑子免费` during Codex feedback cost, `AI has made memory more expensive` in Act 6. Explain that rehearsal may remove one or two jokes if the room or timing makes them feel crowded.

- [ ] **Step 5: Verify candidate counts and boundary language**

  Run:

  ```bash
  test "$(rg -c '^## 开场候选' docs/39-开场与结尾候选.md)" -ge 5
  test "$(rg -c '^## 结尾候选' docs/39-开场与结尾候选.md)" -ge 3
  rg -q 'AI 打工人' docs/39-开场与结尾候选.md
  rg -q '不烧 token' docs/39-开场与结尾候选.md
  rg -q 'AI has made memory more expensive' docs/39-开场与结尾候选.md
  rg -q '主观预期|不是.*预测|不能.*推出' docs/39-开场与结尾候选.md
  git diff --check
  ```

  Expected: five openings, three closings, all three jokes and explicit qualification of predictions and anthropomorphism.

- [ ] **Step 6: Commit the rhetorical candidates**

  ```bash
  git add -- docs/39-开场与结尾候选.md
  git commit -m "docs: add presentation openings and closings"
  ```

### Task 4: Assemble the Full Slide-by-Slide Manuscript

**Files:**
- Create: `docs/37-全量逐页演讲稿.md`
- Read: `docs/36-六幕全量演讲稿结构设计.md`
- Read: `docs/38-案例演讲素材母稿.md`
- Read: `docs/39-开场与结尾候选.md`
- Read: `docs/evidence/C01-Codex项目复盘交叉提炼.md`

**Interfaces:**
- Consumes: approved six-act design, case material, rhetorical candidates and Codex behavior matrix.
- Produces: a complete ordered manuscript whose slides each expose `本页唯一判断`, `屏幕文字`, `完整口播`, `画面占位`, `证据与边界`, `转场`, and `编排标签`; this becomes the source for later HTML or PPTX production.

- [ ] **Step 1: Create the document header and six act containers**

  State that this is an intentionally over-complete manuscript, not the 45-minute cut. Include a reading guide explaining `核心`, `可删`, `附录候选`, `项目图片`, `网站图片`, `搜索图片`, `示意图` and `待补证`.

- [ ] **Step 2: Write Acts 1 and 2 for mixed audiences**

  Use the recommended `AI 打工人` opening by default. Keep Act 1 free of deep API detail. Give B747 enough room to explain rare codes, numeric fingerprints, source roles, configuration conflicts and conversion to geometric constraints.

- [ ] **Step 3: Write Acts 3 and 4 around WPS and Web Excel**

  WPS must show the many-sources-to-one-project diagram and source-role table through story rather than list recitation. Web Excel must move from ambiguous requirement through candidate filtering to comparable experiments, then mention Bilibili in no more than one slide or one narration paragraph.

- [ ] **Step 4: Write Act 5 from original retrospective evidence**

  Put Deck.gl here, after the broadly accessible material. Explain compile, lint, tests, runtime, state inspection and screenshots as distinct feedback channels. Use aircraft modeling, Dice, Tabloom and dice visuals only as short corroborating examples. Include small-model/CLI migration, network-access fallback, Skill review by stronger models, Commit Message history and worktree isolation when supported by evidence.

- [ ] **Step 5: Write Act 6 and the default closing**

  Present long-term project memory, the `memory` joke, the “today's requirements still need doing” future-interaction line, the no-AI continuity and the human responsibility boundary. Close on project memory or three practical actions, not a product endorsement.

- [ ] **Step 6: Perform structural validation**

  Run:

  ```bash
  test "$(rg -c '^## 第[一二三四五六]幕' docs/37-全量逐页演讲稿.md)" -eq 6
  slides=$(rg -c '^### [0-9]{2,3}｜' docs/37-全量逐页演讲稿.md)
  judgments=$(rg -c '^\*\*本页唯一判断\*\*' docs/37-全量逐页演讲稿.md)
  scripts=$(rg -c '^\*\*完整口播\*\*' docs/37-全量逐页演讲稿.md)
  visuals=$(rg -c '^\*\*画面占位\*\*' docs/37-全量逐页演讲稿.md)
  evidence=$(rg -c '^\*\*证据与边界\*\*' docs/37-全量逐页演讲稿.md)
  transitions=$(rg -c '^\*\*转场\*\*' docs/37-全量逐页演讲稿.md)
  labels=$(rg -c '^\*\*编排标签\*\*' docs/37-全量逐页演讲稿.md)
  test "$slides" -eq "$judgments"
  test "$slides" -eq "$scripts"
  test "$slides" -eq "$visuals"
  test "$slides" -eq "$evidence"
  test "$slides" -eq "$transitions"
  test "$slides" -eq "$labels"
  printf 'slides=%s all_required_fields=%s\n' "$slides" "$labels"
  git diff --check
  ```

  Expected: exactly six acts; every numbered slide contains every required field; whitespace validation passes.

- [ ] **Step 7: Perform narrative-order and scope validation**

  Run:

  ```bash
  b747_line=$(rg -n '^## 第二幕' docs/37-全量逐页演讲稿.md | cut -d: -f1)
  deckgl_line=$(rg -n 'Deck\.gl' docs/37-全量逐页演讲稿.md | tail -1 | cut -d: -f1)
  act5_line=$(rg -n '^## 第五幕' docs/37-全量逐页演讲稿.md | cut -d: -f1)
  test "$deckgl_line" -gt "$act5_line"
  rg -q 'B站.*主流观点|主流观点.*B站' docs/37-全量逐页演讲稿.md
  ! rg -n 'getIconAngle|ECharts [0-9]+\.[0-9]+|Codex.*内部.*搜索' docs/37-全量逐页演讲稿.md
  test -n "$b747_line"
  ```

  Expected: B747 is Act 2, Deck.gl occurs in or after Act 5, Bilibili is qualified, and forbidden technical or vendor-internal claims are absent.

- [ ] **Step 8: Commit the full manuscript**

  ```bash
  git add -- docs/37-全量逐页演讲稿.md
  git commit -m "docs: write six-act full presentation manuscript"
  ```

### Task 5: Integrate Navigation and Audit the Manuscript Package

**Files:**
- Modify: `README.md`
- Verify: `docs/36-六幕全量演讲稿结构设计.md`
- Verify: `docs/37-全量逐页演讲稿.md`
- Verify: `docs/38-案例演讲素材母稿.md`
- Verify: `docs/39-开场与结尾候选.md`
- Verify: `docs/evidence/C01-Codex项目复盘交叉提炼.md`

**Interfaces:**
- Consumes: all completed artifacts.
- Produces: discoverable repository navigation and a final verified manuscript package ready for speaker pruning and later visual production.

- [ ] **Step 1: Add the new manuscript package to README navigation**

  Add one concise entry for the six-act design, full slide manuscript, case-material manuscript, opening/closing candidates and Codex evidence matrix. Do not reorder unrelated research documents.

- [ ] **Step 2: Audit internal Markdown links in the five manuscript files**

  Extract relative Markdown links that do not begin with `http`, `/` or `#`, resolve them relative to each source file and report any missing target. Fix only broken links introduced by Tasks 1–5.

- [ ] **Step 3: Audit repository scope and user-owned changes**

  Run:

  ```bash
  git status --short
  git diff --check
  git diff -- docs/19-外部大师观点与成熟实践.md
  ```

  Expected: `docs/19-外部大师观点与成熟实践.md` still contains the pre-existing user diff and is not staged; no unrelated file is staged; whitespace validation passes.

- [ ] **Step 4: Run final content checks**

  Run:

  ```bash
  for file in \
    docs/36-六幕全量演讲稿结构设计.md \
    docs/37-全量逐页演讲稿.md \
    docs/38-案例演讲素材母稿.md \
    docs/39-开场与结尾候选.md \
    docs/evidence/C01-Codex项目复盘交叉提炼.md; do
    test -s "$file" || exit 1
  done
  test "$(rg -c '^## 第[一二三四五六]幕' docs/37-全量逐页演讲稿.md)" -eq 6
  rg -q 'B747' docs/37-全量逐页演讲稿.md
  rg -q 'WPS' docs/37-全量逐页演讲稿.md
  rg -q 'Web Excel' docs/37-全量逐页演讲稿.md
  rg -q 'Deck\.gl' docs/37-全量逐页演讲稿.md
  rg -q '小模型|轻量 Agent' docs/37-全量逐页演讲稿.md
  rg -q '长期.*记忆|项目.*记忆' docs/37-全量逐页演讲稿.md
  git diff --check
  ```

  Expected: all files exist, six acts and four anchors are present, migration and memory conclusions exist, and validation exits 0.

- [ ] **Step 5: Commit navigation integration**

  ```bash
  git add -- README.md
  git commit -m "docs: index six-act manuscript package"
  ```

- [ ] **Step 6: Report the package for speaker review**

  Report the absolute paths to the four main documents, the number of slides in the full manuscript, the recommended default hook, and the fact that this remains intentionally longer than the future 45-minute cut. Do not claim that images or final HTML have been produced.
