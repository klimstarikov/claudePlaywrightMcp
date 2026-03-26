# Test Cases: Sales Tag for Products on Sale

> **Generated:** 2026-03-25
> **JIRA Issue:** EPMCDMETST-35277
> **Feature:** Products with a price reduction on the home page display a visible 'Sale' tag; full-price products display no such tag.
> **Total:** 8 test cases — 2 Positive | 1 Negative | 5 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-SALE-001 | P1 | Positive | Not-logged-in user sees 'Sale' tag on discounted product on home page | AC-1 |
| TC-SALE-002 | P1 | Positive | Product without price reduction does not display 'Sale' tag on home page | AC-2 |
| TC-SALE-003 | P2 | Negative | 'Sale' tag label is not rendered as a variant such as "Discount" or "Offer" | AC-1 |
| TC-SALE-004 | P2 | Edge | All products with price reduction on the home page display a 'Sale' tag | AC-1 |
| TC-SALE-005 | P2 | Edge | No 'Sale' tag appears on any full-price product on the home page | AC-2 |
| TC-SALE-006 | P3 | Edge | Regular-price product adjacent to a sale product does not display a 'Sale' tag | AC-2 |
| TC-SALE-007 | P3 | Edge | 'Sale' tags remain displayed on discounted products after a page reload | AC-1 |
| TC-SALE-008 | P4 | Edge | Multiple sale products on the same page each display an independent 'Sale' tag | AC-1 |

---

## Test Cases

<!--
ANALYSIS
========

Domain: automationteststore.com is a demo e-commerce storefront. The home page contains
a "Featured" section showing a grid of product cards. Some cards display two prices:
a strikethrough original price (e.g. $33.00) and a reduced sale price (e.g. $19.00),
indicating a price reduction. The feature under test introduces a visual "Sale" tag on
the card of every product that carries such a reduction.

AC Decomposition
----------------
AC-1 (products with price reduction → 'Sale' tag):
  - Condition A: A single product with a strikethrough price must show the tag.
  - Condition B: The tag text must be exactly "Sale" (correct casing/label).
  - Condition C: The rule applies to ALL price-reduced products on the page, without exception.
  - Condition D: The behaviour is visible to unauthenticated users (scenario's precondition).
  - Condition E: The tag persists on reload (not transient / JS-race dependent).
  - Condition F: Each sale product displays its own independent tag.

AC-2 (products without price reduction → NO 'Sale' tag):
  - Condition G: A single full-price product must not carry the tag.
  - Condition H: Being displayed next to a sale product must not cause a full-price product
                 to inherit the tag (no CSS bleed, no off-by-one DOM targeting).
  - Condition I: The rule applies to ALL non-discounted products on the page.

Coverage mapping
----------------
P1 Critical → Conditions A, G (core happy paths, one per AC).
P2 High     → Conditions B (wrong label is a data-integrity issue), C, I (completeness).
P3 Medium   → Conditions H (adjacent contamination — realistic layout risk), E.
P4 Low      → Condition F (multi-tag independence — low risk, cosmetic).

Priority dropped from P2 to P3/P4 for conditions E and F because the primary P1/P2 cases
already exercise the tag rendering path; these add confidence, not critical coverage.
-->

---

## TC-SALE-001 | P1 | Positive | Not-logged-in user sees 'Sale' tag on discounted product on home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Not-logged-in user sees 'Sale' tag on a product with a price reduction
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls down to the Featured products section
  And   the user locates the first product card that displays a strikethrough original price alongside a reduced price
  Then  that product card displays a 'Sale' tag
```

**Notes:** The embedded JIRA reference scenario maps directly to this test case. Confirm the price reduction is visually presented as a strikethrough price (e.g. ~~$33.00~~ $19.00) before asserting the tag.

---

## TC-SALE-002 | P1 | Positive | Product without price reduction does not display 'Sale' tag on home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product on the home page does not display a 'Sale' tag
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls down to the Featured products section
  And   the user locates a product card that shows only a single price with no strikethrough original price
  Then  that product card does not display a 'Sale' tag
```

---

## TC-SALE-003 | P2 | Negative | 'Sale' tag label is not rendered as a variant such as "Discount" or "Offer"

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag uses the exact label "Sale" and not an alternative text
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls down to the Featured products section
  And   the user locates a product card that displays a strikethrough original price alongside a reduced price
  Then  the tag on that product card reads exactly "Sale"
  And   the tag does not read "Discount", "Offer", "Deal", or any other variant
```

**Notes:** Case-sensitive check — "sale" or "SALE" without matching the expected label "Sale" should also be treated as a failure.

---

## TC-SALE-004 | P2 | Edge | All products with price reduction on the home page display a 'Sale' tag

**Priority:** P2
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Every product with a price reduction on the home page displays a 'Sale' tag
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls through the full Featured products section
  Then  every product card that displays a strikethrough original price alongside a reduced price has a 'Sale' tag
  And   there is no product card with a price reduction that is missing the 'Sale' tag
```

**Notes:** This validates completeness — the AC states "All the products on the page". Test should loop or assert over the full set of discounted product cards, not just the first one.

---

## TC-SALE-005 | P2 | Edge | No 'Sale' tag appears on any full-price product on the home page

**Priority:** P2
**Type:** Edge
**AC Reference:** AC-2

```gherkin
Scenario: No full-price product on the home page displays a 'Sale' tag
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls through the full Featured products section
  Then  every product card that shows only a single price with no strikethrough original price does not display a 'Sale' tag
  And   the total count of 'Sale' tags on the page equals the count of products with a strikethrough price
```

**Notes:** The second assertion provides a useful sanity-check cross-reference — if the counts align, neither false positives nor false negatives exist.

---

## TC-SALE-006 | P3 | Edge | Regular-price product adjacent to a sale product does not display a 'Sale' tag

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product displayed immediately next to a sale product has no 'Sale' tag
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls to the Featured products section
  And   the user identifies a product card with a price reduction that has at least one full-price product card immediately adjacent to it (next cell in the grid)
  Then  the full-price product card adjacent to the sale product does not display a 'Sale' tag
  And   only the discounted product card in that pair displays the 'Sale' tag
```

**Notes:** Targets a realistic layout-level bug where a CSS selector or DOM traversal could inadvertently apply the tag to a sibling card.

---

## TC-SALE-007 | P3 | Edge | 'Sale' tags remain displayed on discounted products after a page reload

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tags persist after a full page reload
  Given a not logged-in user opens the home page at https://automationteststore.com/
  And   the user can see at least one product card with a 'Sale' tag in the Featured section
  When  the user reloads the page
  And   the user scrolls to the Featured products section
  Then  the same discounted product cards display the 'Sale' tag after the reload
  And   no additional 'Sale' tags appear on previously untagged product cards
```

**Notes:** Guards against a race condition where the tag is injected by a slow JS bundle that might not fire consistently on every page load.

---

## TC-SALE-008 | P4 | Edge | Multiple sale products on the same page each display an independent 'Sale' tag

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario Outline: Each sale product displays its own 'Sale' tag independently of others
  Given a not logged-in user opens the home page at https://automationteststore.com/
  When  the user scrolls to the Featured products section
  And   the user locates the <nth> product card that has a strikethrough price
  Then  that product card displays a 'Sale' tag
  And   the 'Sale' tag is contained within that product card and does not overlap adjacent cards

  Examples:
    | nth   |
    | first |
    | second|
    | third |
```

**Notes:** Applicable only when the home page renders three or more discounted products simultaneously. Skip if fewer than three sale products are present. This guards against a single shared DOM element for all tags rather than per-card instances.

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | All products on the page that have a price reduction must display a `Sale` tag | TC-SALE-001, TC-SALE-003, TC-SALE-004, TC-SALE-007, TC-SALE-008 |
| AC-2 | Products that are not on sale must not display a `Sale` tag | TC-SALE-002, TC-SALE-005, TC-SALE-006 |
