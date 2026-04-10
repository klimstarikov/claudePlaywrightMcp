# Test Cases: Sales Tag for Products on Sale

> **Generated:** 2026-04-01
> **JIRA Issue:** EPMCDMETST-35277
> **Feature:** Products on any listing page that carry a price reduction (strikethrough original price) must display a 'Sale' tag; products without a price reduction must not.
> **Total:** 12 test cases — 4 Positive | 4 Negative | 4 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-STAG-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on sale product on Home page | AC-1 |
| TC-STAG-002 | P1 | Positive | Non-logged-in user sees no 'Sale' tag on full-price product on Home page | AC-2 |
| TC-STAG-003 | P1 | Positive | Every featured product with a strikethrough price displays a 'Sale' tag | AC-1 |
| TC-STAG-004 | P1 | Positive | Every featured product without a strikethrough price has no 'Sale' tag | AC-2 |
| TC-STAG-005 | P2 | Negative | 'Sale' tag label is exactly "Sale" and not an alternative label such as "Discount" or "Offer" | AC-1 |
| TC-STAG-006 | P2 | Negative | Full-price product in a mixed-price list does not inherit 'Sale' tag | AC-2 |
| TC-STAG-007 | P2 | Negative | 'Sale' tag is visible and not obscured by overlapping UI elements | AC-1 |
| TC-STAG-008 | P2 | Negative | Number of 'Sale' tags on the page equals the number of products with a strikethrough price | AC-1, AC-2 |
| TC-STAG-009 | P3 | Edge | Sale products below the initial viewport display 'Sale' tag after scrolling into view | AC-1 |
| TC-STAG-010 | P3 | Edge | 'Sale' tag persists on a sale product after hard browser refresh | AC-1 |
| TC-STAG-011 | P3 | Edge | Logged-in user experiences identical 'Sale' tag behaviour to a non-logged-in user | AC-1, AC-2 |
| TC-STAG-012 | P4 | Edge | 'Sale' tag is displayed on sale products on a category listing page (not only the Home page) | AC-1, AC-2 |

---

## Test Cases

<!--
ANALYSIS
========

Domain: automationteststore.com is a demo e-commerce storefront. The Home page contains a
"Featured" product section showing a grid of product cards. Some cards show two prices: a
strikethrough original price (e.g. "$33.00") and a reduced current price (e.g. "$19.00"),
marking a price reduction. The feature under test requires a visible "Sale" tag to appear
on every such card and to be absent on full-price cards.

The reference Gherkin scenario specifies a non-logged-in user on the Home page — but AC-1
says "all the products on the page", which broadens scope to include category listing pages
and authenticated sessions.

AC Decomposition
----------------
AC-1 — Every product with a price reduction MUST show a 'Sale' tag:
  Condition A: A single sale product renders the tag (core happy path).
  Condition B: All sale products simultaneously visible render the tag (bulk check).
  Condition C: The tag text is exactly "Sale" — not synonyms like "Discount", "Offer", "% Off".
  Condition D: The tag is rendered visibly, not hidden or clipped by z-index or overflow.
  Condition E: Tag count on page equals the count of strikethrough-priced products.
  Condition F: Tag is stable across page reloads (not a transient JS rendering race).
  Condition G: Tags appear on sale products that are initially off-screen after scrolling.

AC-2 — Products WITHOUT a price reduction MUST NOT show a 'Sale' tag:
  Condition H: A single full-price product has no tag (core happy path).
  Condition I: All full-price products simultaneously visible have no tag (bulk check).
  Condition J: A full-price product adjacent to a sale product does not inherit the tag
               (no CSS bleed or off-by-one DOM query).

Cross-cutting conditions:
  Condition K: Authenticated session results in identical tag behaviour (AC-1 & AC-2 both hold).
  Condition L: Category listing page obeys the same rules as the Home page.

Priority assignments:
  P1 — Core happy paths for both ACs, and their bulk equivalents (conditions A, B, H, I).
  P2 — Regression guards: wrong label, tag bleed, hidden tag, count mismatch (C, D, E, J).
  P3 — Realistic additional conditions: scroll, reload, logged-in user (F, G, K).
  P4 — Scope extension: category listing page (L).

Screenshot: JIRA attachment "Screenshot at Mar 25 21-11-33.png" was downloaded but
could not be analysed (vision unavailable for the current model). Test cases are derived
solely from the textual AC and reference Gherkin scenario.
-->

---

## TC-STAG-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on sale product on Home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Non-logged-in user sees 'Sale' tag on sale product on Home page
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the Featured products section
  And a product card is visible with a strikethrough original price alongside a reduced current price
  Then that product card displays a "Sale" tag
```

---

## TC-STAG-002 | P1 | Positive | Non-logged-in user sees no 'Sale' tag on full-price product on Home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Non-logged-in user sees no 'Sale' tag on full-price product on Home page
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the Featured products section
  And a product card is visible showing only a single price with no strikethrough price
  Then that product card does not display a "Sale" tag
```

---

## TC-STAG-003 | P1 | Positive | Every featured product with a strikethrough price displays a 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Every featured product with a strikethrough price displays a 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then every product card that shows a strikethrough original price displays a "Sale" tag
```

**Notes:** Covers bulk verification — ensures the tag rule is applied consistently to all on-sale products, not just the first one rendered.

---

## TC-STAG-004 | P1 | Positive | Every featured product without a strikethrough price has no 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Every featured product without a strikethrough price has no 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then every product card that shows only a single current price (no strikethrough) does not display a "Sale" tag
```

**Notes:** Bulk counterpart to TC-STAG-002. Ensures the absence of the tag is consistent across all full-price products in the section.

---

## TC-STAG-005 | P2 | Negative | 'Sale' tag label is exactly "Sale" and not an alternative label such as "Discount" or "Offer"

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag label is exactly "Sale" and not an alternative label such as "Discount" or "Offer"
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to a product card that has a strikethrough original price
  Then the product card displays a tag with the text "Sale"
  And the product card does not display a tag with the text "Discount"
  And the product card does not display a tag with the text "Offer"
  And the product card does not display a tag with the text "% Off"
```

**Notes:** Verifies the exact string copy specified in the requirements. A different label would indicate the wrong implementation.

---

## TC-STAG-006 | P2 | Negative | Full-price product in a mixed-price list does not inherit 'Sale' tag

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product in a mixed-price list does not inherit 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user views the Featured products section that contains both sale products (with strikethrough prices) and full-price products (without strikethrough prices)
  Then each full-price product card does not display a "Sale" tag
  And each sale product card does display a "Sale" tag
```

**Notes:** Guards against CSS bleed or an overly broad DOM selector that would mark any card in a section containing at least one sale product.

---

## TC-STAG-007 | P2 | Negative | 'Sale' tag is visible and not obscured by overlapping UI elements

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag is visible and not obscured by overlapping UI elements
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to a product card that has a strikethrough original price
  Then the "Sale" tag on that product card is present in the DOM
  And the "Sale" tag is visible to the user (not hidden by overflow, z-index, or another element)
```

**Notes:** Addresses a rendering defect scenario where the tag exists in the DOM but is not visually accessible, e.g. clipped by the card container or covered by an image overlay.

---

## TC-STAG-008 | P2 | Negative | Number of 'Sale' tags on the page equals the number of products with a strikethrough price

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Number of 'Sale' tags on the page equals the number of products with a strikethrough price
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then the total count of visible "Sale" tags equals the total count of product cards with a strikethrough original price
```

**Notes:** Catches both over-tagging (tag appears on a non-sale product) and under-tagging (tag missing from a sale product) by comparing counts. Fails if either AC-1 or AC-2 is violated.

---

## TC-STAG-009 | P3 | Edge | Sale products below the initial viewport display 'Sale' tag after scrolling into view

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Sale products below the initial viewport display 'Sale' tag after scrolling into view
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  And the Featured products section is not visible in the initial viewport (page top is displayed)
  When the user scrolls down until the Featured products section is fully visible
  Then each product card with a strikethrough original price that is now visible displays a "Sale" tag
```

**Notes:** Targets deferred/lazy rendering scenarios where off-screen cards may not receive the tag until they enter the viewport.

---

## TC-STAG-010 | P3 | Edge | 'Sale' tag persists on a sale product after hard browser refresh

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag persists on a sale product after hard browser refresh
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  And a product card with a strikethrough original price is visible and displays a "Sale" tag
  When the user performs a hard page refresh (bypassing cache)
  Then the same product card still displays a "Sale" tag after the page finishes loading
  And the strikethrough original price is still visible on that product card
```

**Notes:** Rules out a transient rendering condition where the tag is applied by a client-side script on first load but lost on reload due to a timing or caching issue.

---

## TC-STAG-011 | P3 | Edge | Logged-in user experiences identical 'Sale' tag behaviour to a non-logged-in user

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Logged-in user experiences identical 'Sale' tag behaviour to a non-logged-in user
  Given a user is logged in with credentials "testuser1@automationteststore.com" / "Test1234!"
  And the user navigates to the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then every product card with a strikethrough original price displays a "Sale" tag
  And every product card without a strikethrough price does not display a "Sale" tag
```

**Notes:** AC-1 does not restrict the rule to unauthenticated users. Verifies the tag logic is session-state agnostic.

---

## TC-STAG-012 | P4 | Edge | 'Sale' tag is displayed on sale products on a category listing page (not only the Home page)

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: 'Sale' tag is displayed on sale products on a category listing page (not only the Home page)
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user navigates to the "Skincare" category listing page
  Then every product card with a strikethrough original price on the Skincare listing page displays a "Sale" tag
  And every product card without a strikethrough price on the Skincare listing page does not display a "Sale" tag
```

**Notes:** AC-1 states "all the products on the page" without restricting scope to the Home page. This edge case extends coverage to a category listing page. The Skincare category was selected as a representative example accessible via Men > Skincare.

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | All products on the page that have a price reduction (strikethrough price) should display a 'Sale' tag | TC-STAG-001, TC-STAG-003, TC-STAG-005, TC-STAG-007, TC-STAG-008, TC-STAG-009, TC-STAG-010, TC-STAG-011, TC-STAG-012 |
| AC-2 | Products which are not on sale should not display a 'Sale' tag | TC-STAG-002, TC-STAG-004, TC-STAG-006, TC-STAG-008, TC-STAG-011, TC-STAG-012 |
