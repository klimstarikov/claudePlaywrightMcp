# AI Use Case: Automated BDD Test Case Generation

**Summary**
A VS Code Copilot agent that autonomously generates a comprehensive, prioritised BDD test case suite in Gherkin format from a JIRA issue key or free-text Acceptance Criteria. Given a JIRA story URL or key, the agent logs into JIRA, fetches the issue description and AC, analyses any attached screenshots, derives positive/negative/edge scenarios, assigns priority labels (P1–P4), and saves a ready-to-review Markdown file to the project root — all without manual input from the QA engineer.

---

**Business Value**
- *Individual:* Eliminates the most time-consuming part of test design — translating dense AC text into structured Gherkin scenarios. A QA engineer who previously spent 2–4 hours per story on test case authoring can complete the same task in under 5 minutes, freeing capacity for exploratory and automation work.
- *Value stream:* Standardises test case quality across the team (consistent ID scheme, P1–P4 prioritisation, coverage matrix, AC traceability). Reduces the risk of coverage gaps reaching production. Shortens the feedback loop between story creation and test readiness.
- *Potential adopters:* All QA/SDET engineers on the project; BAs and POs who review test coverage before sprint demos. Estimated 5–15 people per team, scales to every team using JIRA + Playwright in the organisation.

---

**Actors**
- **QA Engineer / SDET** — primary consumer; triggers the agent and reviews the generated output.
- **Business Analyst / Product Owner** — secondary consumer; reads the Gherkin scenarios and coverage matrix to validate AC completeness before development or sign-off.

---

**Triggers**
- A QA engineer is assigned a JIRA story and needs to produce test cases.
- A new story reaches "Ready for Testing" or "In QA" status.
- A BA/PO wants a quick coverage check against AC before sprint demo.
- Invocation: type `@generate-test-cases <JIRA-KEY>` (e.g. `@generate-test-cases PROJ-123`) in the VS Code Copilot Chat panel and press Enter. No other input required.

---

**Integrations**
- **JIRA REST API v3** (`/rest/api/3/issue/<KEY>`) — fetches issue summary, description, AC, and binary attachments using Basic Auth credentials stored in a project `.env` file.
- **VS Code GitHub Copilot Chat** — host environment; the agent runs as a custom `.agent.md` file inside the `.github/agents/` directory, invoked via the `@` mention syntax.
- **Local file system** — writes the generated Markdown test case file to the project root.
- **`@jira` subagent** — handles JIRA credential resolution and session caching to avoid re-entering credentials within a session.

---

**Scenarios**

*Happy path — JIRA key input:*
1. QA engineer types `@generate-test-cases EPMCDMETST-999` in Copilot Chat.
2. Agent detects the JIRA key, reads cached credentials from session memory (or prompts once if absent).
3. Agent calls the JIRA API, retrieves issue summary, rendered description, and AC.
4. Agent downloads any image attachments and analyses UI states visible in screenshots.
5. Agent decomposes each AC into testable conditions and assigns coverage types and priorities.
6. Agent writes all scenarios in Gherkin format with unique IDs (`TC-<PREFIX>-NNN`), a summary table, and a coverage matrix.
7. File `[EPMCDMETST-999]test-cases-<feature-name><DD_MM_YYYY>.md` appears in the project root within ~60 seconds.
8. QA engineer reviews, adjusts wording if needed, and links the file to the JIRA story.

*Alternative path — free-text input:*
1. QA engineer pastes a feature description and numbered AC directly into the chat prompt without a JIRA key.
2. Agent skips JIRA authentication, proceeds directly to AC decomposition.
3. Output filename uses the inferred feature name and today's date (no JIRA key prefix).

*Edge — JIRA issue not found / no permission:*
1. Agent receives HTTP 404 or 403 from JIRA API.
2. Agent stops and surfaces a clear error message to the user without producing a partial file.

---

**Effort/Complexity**
**S** — The agent is fully implemented and deployed as `.github/agents/generate-test-cases.agent.md`. Onboarding a new team member requires only: (1) adding JIRA credentials to `.env`, and (2) opening the project in VS Code with the GitHub Copilot extension installed.

---

**Constraints/Dependencies**
- GitHub Copilot Chat extension (VS Code) with agent mode enabled.
- A JIRA account with read access to the target project and a valid API token.
- `.env` file in the project root containing `JIRA_BASE_URL`, `JIRA_USER_EMAIL`, and `JIRA_API_TOKEN`.
- JIRA stories must have structured Acceptance Criteria in the description field; stories with no AC will produce minimal coverage (agent infers from summary only).
- Internet access from the developer machine to reach the JIRA instance.

---

**Recommended model**
Claude Sonnet 4.6 — strong instruction-following for multi-step agentic workflows, reliable structured output (Gherkin + Markdown), and cost-effective for high-frequency per-story invocations.

---

**Outcomes**
- A Markdown file in the project root containing: a summary table, all Gherkin scenarios (sorted P1→P4, Positive→Negative→Edge within each band), and a coverage matrix mapping every AC to its test IDs.
- Immediate visibility into coverage gaps before a single line of automation is written.
- A versioned, reviewable artefact that can be committed alongside test code and linked back to the JIRA story.

---

**PROMPTS**
Agent definition: `.github/agents/generate-test-cases.agent.md`
Invocation: `@generate-test-cases <JIRA-KEY or free-text AC>`

---

**FLOW**
```
User invokes @generate-test-cases with JIRA key or free text
        │
        ▼
[Step 0] JIRA key detected?
   Yes ──► Resolve credentials (@jira subagent or session cache)
           │
           ▼
        Fetch issue via JIRA REST API v3
           │
           ▼
        Download & analyse image attachments
           │
   No ──► [Step 1] Analyse inputs
              (domain understanding, AC decomposition, coverage mapping, priority assignment)
              │
              ▼
           [Step 2] Assign unique TC IDs (TC-<PREFIX>-NNN)
              │
              ▼
           [Step 3] Write all test cases in Gherkin (Scenario / Scenario Outline)
              │
              ▼
           [Step 4] Sort by priority P1→P4, Positive→Negative→Edge
              │
              ▼
           [Step 5] Save Markdown file to project root
```

---

**AI Use Case Update date**
Created: 2026-04-02
