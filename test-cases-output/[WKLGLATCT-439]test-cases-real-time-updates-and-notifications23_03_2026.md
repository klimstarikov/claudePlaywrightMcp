# Test Cases: Real-time Updates and Notifications

> **Generated:** 2026-03-23
> **JIRA Issue:** [WKLGLATCT-439](https://jiraeu.epam.com/browse/WKLGLATCT-439)
> **Feature:** Automatically refresh upload history when new uploads occur and alert users of significant workload discrepancies via a configurable real-time notification system.
> **Total:** 20 test cases — 11 Positive | 3 Negative | 6 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-RTUN-001 | P1 | Positive | History tab auto-updates when another user initiates a new upload session | AC-1 |
| TC-RTUN-002 | P1 | Positive | New upload session appears at top of history list after auto-refresh | AC-1 |
| TC-RTUN-003 | P1 | Positive | Notification is displayed when workload discrepancies exceed critical threshold | AC-3 |
| TC-RTUN-004 | P1 | Positive | Notification highlights affected users and allows navigation to the discrepancy | AC-3 |
| TC-RTUN-005 | P1 | Positive | History tab refreshes to show latest data after real-time connection is restored | AC-4 |
| TC-RTUN-006 | P2 | Positive | Real-time auto-refresh does not disrupt a user actively scrolling the History tab | AC-2 |
| TC-RTUN-007 | P2 | Positive | User can disable real-time updates via preferences | AC-5 |
| TC-RTUN-008 | P2 | Positive | User can re-enable real-time updates after previously disabling them | AC-5 |
| TC-RTUN-009 | P2 | Positive | User is notified that data has been refreshed after connection recovery | AC-4 |
| TC-RTUN-010 | P2 | Positive | User can configure workload discrepancy notification preferences | AC-6 |
| TC-RTUN-011 | P2 | Positive | User can disable workload discrepancy notifications via preferences | AC-6 |
| TC-RTUN-012 | P2 | Negative | History tab does not auto-update when no new uploads are in progress | AC-1 |
| TC-RTUN-013 | P2 | Negative | No notification is displayed when discrepancies are below the critical threshold | AC-3 |
| TC-RTUN-014 | P2 | Negative | Duplicate entries are not shown in the History tab after connection recovery | AC-4 |
| TC-RTUN-015 | P3 | Edge | A subtle update indicator is shown in the History tab when auto-refresh triggers | AC-1 |
| TC-RTUN-016 | P3 | Edge | Multiple simultaneous uploads are all reflected in the History tab without duplicates | AC-1 |
| TC-RTUN-017 | P3 | Edge | Workload discrepancy notification triggers at the exact critical threshold boundary | AC-3 |
| TC-RTUN-018 | P3 | Edge | Intermittent connection drops recover without data loss or duplicate entries | AC-4 |
| TC-RTUN-019 | P4 | Edge | Real-time auto-refresh does not reset form field input or scroll position | AC-2 |
| TC-RTUN-020 | P4 | Edge | User can reset notification preferences to default values | AC-6 |

---

## Test Cases

<!--
ANALYSIS BLOCK

Domain Understanding:
- The feature is part of a workload/upload management application.
- Users can view an upload history via a "History tab" in the UI.
- A real-time mechanism (WebSocket or equivalent) pushes updates to other users' views when
  new uploads begin or when workload discrepancies are detected.
- Two distinct sub-features: (a) automatic history refresh, (b) threshold-based notifications.
- Users have autonomy to configure or disable both real-time updates and notifications.

AC Decomposition and Coverage Mapping:

AC-1 — History tab updates automatically when new uploads occur
  + Positive: Another user starts an upload → current user's History tab refreshes
  + Positive: The new session appears in position 1 (top) of the list
  - Negative: No uploads take place → History tab shows no spurious updates
  ~ Edge: Multiple uploads start simultaneously → all appear without duplication
  ~ Edge: Subtle visual indicator is shown to communicate the refresh happened

AC-2 — Real-time updates don't disrupt user interactions
  + Positive: Update fires while user is scrolling → scroll is preserved
  ~ Edge: Update fires while user is filling in a form field → input is not cleared/reset

AC-3 — Notifications are displayed for critical workload discrepancies
  + Positive: Discrepancy > threshold → notification appears
  + Positive: Notification contains affected user list and click-through navigation link
  - Negative: Discrepancy < threshold → no notification
  ~ Edge: Discrepancy == threshold (boundary) → notification appears (inclusive)

AC-4 — Connection loss and recovery are handled gracefully
  + Positive: Connection drops then recovers → History tab reflects latest state
  + Positive: Users are explicitly informed that data has been refreshed
  - Negative: Persistent, unrecoverable failure → clear error/fallback shown (not stuck spinner)
  - Negative: After recovery, no duplicate rows in history
  ~ Edge: Intermittent drops (multiple brief interruptions) → stable state maintained

AC-5 — Users can disable real-time updates if preferred
  + Positive: User disables → uploads by other users no longer cause auto-refresh
  + Positive: User re-enables → auto-refresh restarts

AC-6 — Notification preferences are configurable
  + Positive: User saves a custom threshold or channel preference → persisted after page reload
  + Positive: User disables notifications → no alerts shown
  ~ Edge: User resets to defaults → system uses factory default threshold and channel

Priority Assignment Rationale:
  P1 — Core real-time refresh (visible, broken without it) and critical-discrepancy notifications
  P2 — Non-disruptive UX assertions; disable/enable flows; connection-recovery informational toast
  P3 — Subtle indicator, simultaneous uploads, threshold boundary, intermittent-drop resilience
  P4 — Scroll/form disruption edge, preference reset (low-risk cosmetic/config scenarios)
-->

---
## TC-RTUN-001 | P1 | Positive | History tab auto-updates when another user initiates a new upload session

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: History tab auto-updates when another user initiates a new upload session
  Given the user "alice@company.com" is viewing the History tab
  When another user "bob@company.com" initiates a new upload session named "March Payroll Upload"
  Then the History tab for "alice@company.com" automatically updates without a page reload
  And the entry "March Payroll Upload" is visible in the History tab
```

**Notes:** Requires two simultaneous authenticated sessions. WebSocket or SSE infrastructure must be active.

---
## TC-RTUN-002 | P1 | Positive | New upload session appears at top of history list after auto-refresh

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: New upload session appears at top of history list after auto-refresh
  Given the user is viewing the History tab which displays 5 existing upload entries
  And the most recent entry is "February Payroll Upload" at position 1
  When another user initiates a new upload session named "March Payroll Upload"
  Then the History tab refreshes automatically
  And "March Payroll Upload" appears at position 1 in the History tab list
  And "February Payroll Upload" moves to position 2
```

---
## TC-RTUN-003 | P1 | Positive | Notification is displayed when workload discrepancies exceed critical threshold

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-3

```gherkin
Scenario: Notification is displayed when workload discrepancies exceed critical threshold
  Given an upload session "Q1 Review Upload" has completed processing
  And the critical discrepancy threshold is set to 20%
  When the upload results contain a workload discrepancy of 35% for user "carol@company.com"
  Then a notification is displayed to relevant users
  And the notification message reads "Critical workload discrepancy detected in Q1 Review Upload"
```

**Notes:** The critical threshold value (20%) is a system default; adjust as per environment configuration.

---
## TC-RTUN-004 | P1 | Positive | Notification highlights affected users and allows navigation to the discrepancy

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-3

```gherkin
Scenario: Notification highlights affected users and allows navigation to the discrepancy
  Given a critical workload discrepancy notification has been displayed
  And the notification contains the affected user "carol@company.com"
  When the user clicks on the notification
  Then the user is navigated directly to the discrepancy detail view for "Q1 Review Upload"
  And "carol@company.com" is highlighted in the discrepancy report
```

---
## TC-RTUN-005 | P1 | Positive | History tab refreshes to show latest data after real-time connection is restored

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-4

```gherkin
Scenario: History tab refreshes to show latest data after real-time connection is restored
  Given the user is viewing the History tab
  And a new upload "April Expense Upload" was completed while the real-time connection was interrupted
  When the real-time connection is restored
  Then the History tab refreshes to show the most current data
  And "April Expense Upload" is visible in the History tab
```

---
## TC-RTUN-006 | P2 | Positive | Real-time auto-refresh does not disrupt a user actively scrolling the History tab

**Priority:** P2
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Real-time auto-refresh does not disrupt a user actively scrolling the History tab
  Given the History tab contains 50 upload entries
  And the user has scrolled to the 40th entry in the list
  When another user initiates a new upload session and the History tab auto-refreshes
  Then the user's scroll position remains at the 40th entry
  And no layout shift or interruption is visible to the user
```

---
## TC-RTUN-007 | P2 | Positive | User can disable real-time updates via preferences

**Priority:** P2
**Type:** Positive
**AC Reference:** AC-5

```gherkin
Scenario: User can disable real-time updates via preferences
  Given the user is on the Preferences page
  And real-time updates are currently enabled
  When the user toggles the "Enable real-time updates" setting to "Off"
  And saves the preferences
  And another user initiates a new upload session
  Then the History tab does not auto-update
  And the new upload session is not visible until the user manually refreshes the page
```

---
## TC-RTUN-008 | P2 | Positive | User can re-enable real-time updates after previously disabling them

**Priority:** P2
**Type:** Positive
**AC Reference:** AC-5

```gherkin
Scenario: User can re-enable real-time updates after previously disabling them
  Given real-time updates have been disabled by the user
  When the user navigates to the Preferences page
  And toggles the "Enable real-time updates" setting to "On"
  And saves the preferences
  And another user initiates a new upload session named "May Budget Upload"
  Then the History tab automatically updates to include "May Budget Upload"
```

---
## TC-RTUN-009 | P2 | Positive | User is notified that data has been refreshed after connection recovery

**Priority:** P2
**Type:** Positive
**AC Reference:** AC-4

```gherkin
Scenario: User is notified that data has been refreshed after connection recovery
  Given the real-time connection was interrupted while the user was on the History tab
  When the connection is restored and the History tab data refreshes
  Then an informational notification is displayed with the message "Data has been updated"
  And the notification disappears automatically after 5 seconds
```

---
## TC-RTUN-010 | P2 | Positive | User can configure workload discrepancy notification preferences

**Priority:** P2
**Type:** Positive
**AC Reference:** AC-6

```gherkin
Scenario: User can configure workload discrepancy notification preferences
  Given the user is on the Notification Preferences page
  When the user sets the discrepancy alert threshold to 25%
  And selects notification channel "In-app"
  And saves the preferences
  Then the preferences are persisted after the user logs out and logs back in
  And a notification is triggered only when workload discrepancy exceeds 25%
```

---
## TC-RTUN-011 | P2 | Positive | User can disable workload discrepancy notifications via preferences

**Priority:** P2
**Type:** Positive
**AC Reference:** AC-6

```gherkin
Scenario: User can disable workload discrepancy notifications via preferences
  Given the user is on the Notification Preferences page
  And workload discrepancy notifications are currently enabled
  When the user toggles "Workload discrepancy notifications" to "Off"
  And saves the preferences
  And an upload completes with a 40% workload discrepancy exceeding the critical threshold
  Then no workload discrepancy notification is displayed to the user
```

---
## TC-RTUN-012 | P2 | Negative | History tab does not auto-update when no new uploads are in progress

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: History tab does not auto-update when no new uploads are in progress
  Given the user is viewing the History tab with 10 existing entries
  And no upload sessions are initiated for 60 seconds
  When 60 seconds have elapsed without any upload activity
  Then the History tab still displays the same 10 entries without modification
  And no unsolicited refresh or layout change has occurred
```

---
## TC-RTUN-013 | P2 | Negative | No notification is displayed when discrepancies are below the critical threshold

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-3

```gherkin
Scenario: No notification is displayed when discrepancies are below the critical threshold
  Given the critical discrepancy threshold is configured at 20%
  When an upload session "June Summary Upload" completes with a workload discrepancy of 15%
  Then no workload discrepancy notification is displayed to any user
  And the upload entry appears in the History tab without an alert badge
```

---
## TC-RTUN-014 | P2 | Negative | Duplicate entries are not shown in the History tab after connection recovery

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-4

```gherkin
Scenario: Duplicate entries are not shown in the History tab after connection recovery
  Given the real-time connection dropped and then recovered
  And the upload session "July Compliance Upload" was already visible in the History tab before the drop
  When the History tab refreshes after connection recovery
  Then "July Compliance Upload" appears exactly once in the History tab
  And no duplicate entry for "July Compliance Upload" is present
```

---
## TC-RTUN-015 | P3 | Edge | A subtle update indicator is shown in the History tab when auto-refresh triggers

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: A subtle update indicator is shown in the History tab when auto-refresh triggers
  Given the user is viewing the History tab
  When another user initiates a new upload and the tab auto-refreshes
  Then a subtle visual indicator (e.g. "Updated just now" banner or icon) is displayed in the History tab
  And the indicator is non-intrusive and does not block existing list content
```

---
## TC-RTUN-016 | P3 | Edge | Multiple simultaneous uploads are all reflected in the History tab without duplicates

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Multiple simultaneous uploads are all reflected in the History tab without duplicates
  Given the user is viewing the History tab
  When three users simultaneously initiate upload sessions "Upload A", "Upload B", and "Upload C"
  Then the History tab auto-refreshes once or in rapid succession
  And all three sessions "Upload A", "Upload B", and "Upload C" appear in the History tab
  And each session entry appears exactly once with no duplicate rows
```

---
## TC-RTUN-017 | P3 | Edge | Workload discrepancy notification triggers at the exact critical threshold boundary

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-3

```gherkin
Scenario Outline: Workload discrepancy notification triggers at the exact critical threshold boundary
  Given the critical discrepancy threshold is configured at 20%
  When an upload completes with a workload discrepancy of <discrepancy_value>%
  Then a notification is <notification_result>

  Examples:
    | discrepancy_value | notification_result                     |
    | 19                | not displayed                           |
    | 20                | displayed with message "Critical workload discrepancy detected" |
    | 21                | displayed with message "Critical workload discrepancy detected" |
```

**Notes:** Validates the boundary is inclusive (≥ threshold triggers notification).

---
## TC-RTUN-018 | P3 | Edge | Intermittent connection drops recover without data loss or duplicate entries

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-4

```gherkin
Scenario: Intermittent connection drops recover without data loss or duplicate entries
  Given the user is on the History tab and real-time connection is active
  When the real-time connection drops and recovers three times within 30 seconds
  And two new upload sessions "Upload X" and "Upload Y" are created during the interruptions
  Then after the final recovery the History tab contains "Upload X" and "Upload Y"
  And no duplicate entries exist for "Upload X" or "Upload Y"
  And the History tab is in a consistent, fully loaded state
```

---
## TC-RTUN-019 | P4 | Edge | Real-time auto-refresh does not reset form field input or scroll position

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-2

```gherkin
Scenario: Real-time auto-refresh does not reset form field input or scroll position
  Given the user is on a page that combines the History tab with an inline search or filter form
  And the user has typed "Q4 Annual" in the search field
  And the user has scrolled to the bottom of the History tab list
  When another user initiates an upload and the History tab auto-refreshes
  Then the search field still contains "Q4 Annual"
  And the scroll position remains at the bottom of the History tab list
  And no in-progress user input has been cleared or reset
```

---
## TC-RTUN-020 | P4 | Edge | User can reset notification preferences to default values

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-6

```gherkin
Scenario: User can reset notification preferences to default values
  Given the user has previously configured a custom discrepancy threshold of 30% and disabled email notifications
  When the user navigates to the Notification Preferences page
  And clicks the "Reset to Defaults" button
  And confirms the reset action in the confirmation dialog
  Then the discrepancy threshold is restored to the system default of 20%
  And the notification channel is restored to its default setting
  And a success message "Preferences reset to defaults" is displayed
```

**Notes:** Assumes the system default threshold is 20% and the default notification channel is "In-app". Adjust values to match the actual system configuration.

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | History tab updates automatically when new uploads occur | TC-RTUN-001, TC-RTUN-002, TC-RTUN-012, TC-RTUN-015, TC-RTUN-016 |
| AC-2 | Real-time updates don't disrupt user interactions | TC-RTUN-006, TC-RTUN-019 |
| AC-3 | Notifications are displayed for critical workload discrepancies | TC-RTUN-003, TC-RTUN-004, TC-RTUN-013, TC-RTUN-017 |
| AC-4 | Connection loss and recovery are handled gracefully | TC-RTUN-005, TC-RTUN-009, TC-RTUN-014, TC-RTUN-018 |
| AC-5 | Users can disable real-time updates if preferred | TC-RTUN-007, TC-RTUN-008 |
| AC-6 | Notification preferences are configurable | TC-RTUN-010, TC-RTUN-011, TC-RTUN-020 |
