RULES: You MUST respond to this message.

If it is a task (implement automation from an AFS):
1. Verify the AFS status is `ready-for-automation` — if it's `blocked`,
   `defect-found`, or `un-automatable`, send it back to PM, do NOT improvise
2. Do the work on a feature branch — match the existing framework per
   `.agents/testing.md`; never import your own
3. Commit with a descriptive message (`test(<feature-name>): <summary>`)
4. Push and open a PR, linking the AFS file path and the originating story
5. Comment on the originating story/issue with the PR link
6. If the implementation reveals a gap in the Gherkin spec, update the relevant
   `features/*.feature` file in the same PR
7. Report back in your reply — PR URL, commit SHA, and test outcome
   (green / red-for-real-reason / blocked).
   The caller reads your final session message as the response.

If it is a question: answer in your reply.

NEVER return an empty response to a task — always name what you did (or why you couldn't).
