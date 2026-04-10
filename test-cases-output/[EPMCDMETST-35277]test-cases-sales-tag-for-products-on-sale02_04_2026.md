# Test Cases: Sales Tag for Products on Sale

> **Generated:** 2026-04-02
> **JIRA Issue:** EPMCDMETST-35277
> **Feature:** Products on any page that carry a price reduction (strikethrough original price) must display a 'Sale' tag; products without a price reduction must not display it.
> **Total:** 13 test cases — 4 Positive | 4 Negative | 5 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-STAG-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on a sale product on the Home page | AC-1 |
| TC-STAG-002 | P1 | Positive | All featured products with a strikethrough price simultaneously display a 'Sale' tag | AC-1 |
| TC-STAG-003 | P1 | Positive | Full-price product on the Home page shows no 'Sale' tag | AC-2 |
| TC-STAG-004 | P1 | Positive | All full-price featured products simultaneously display no 'Sale' tag | AC-2 |
| TC-STAG-005 | P2 | Negative | Count of 'Sale' tags equals count of products with a strikethrough price | AC-1, AC-2 |
| TC-STAG-006 | P2 | Negative | Full-price product adjacent to a sale product does not inherit the 'Sale' tag | AC-2 |
| TC-STAG-007 | P2 | Negative | 'Sale' tag text is exactly "Sale" — not "Discount", "Offer", "SALE", or "% Off" | AC-1 |
| TC-STAG-008 | P2 | Negative | 'Sale' tag on a sale product is visually rendered and not hidden by CSS or an overlay | AC-1 |
| TC-STAG-009 | P3 | Edge | Sale products initially below the viewport display a 'Sale' tag after being scrolled into view | AC-1 |
| TC-STAG-010 | P3 | Edge | 'Sale' tag persists on a sale product after a hard browser refresh | AC-1 |
| TC-STAG-011 | P3 | Edge | Logged-in user sees identical 'Sale' tag behaviour to a non-logged-in user | AC-1, AC-2 |
| TC-STAG-012 | P4 | Edge | 'Sale' tag is displayed on discounted products on a category listing page | AC-1, AC-2 |
| TC-STAG-013 | P4 | Edge | 'Sale' tag remains visible at a narrow (mobile) viewport width | AC-1 |

---

## Test Cases

<!--
ANALYSIS
========

Domain
------
automationteststore.com is a demo e-commerce storefront. The Home page contains a "Featured"
products section presenting a grid of product cards. Some cards display two prices: a
strikethrough original price (e.g. "$33.00") alongside a reduced current price (e.g. "$19.00"),
indicating a price reduction / on-sale status. The business requirement mandates that every
such card displays a clearly visible 'Sale' tag, and that cards without a price reduction
display none.

The reference Gherkin scenario scopes the happy path to a non-logged-in user on the Home page,
but AC-1 states "all products on the page" without restricting scope to the Home page or to
unauthenticated sessions — so cross-page and cross-session coverage is warranted.

Screenshot (JIRA attachment "Screenshot at Mar 25 21-11-33.png") could not be analysed;
the fetch tool does not support binary image retrieval. Test cases are derived solely from
AC text and reference Gherkin scenario.

AC Decomposition
----------------
AC-1: Every product with a price reduction (strikethrough original price) MUST display a 'Sale' tag.
  Condition A — Single sale product renders tag (individual happy path)                  → TC-STAG-001
  Condition B — All sale products in a section simultaneously render tag (bulk assertion)  → TC-STAG-002
  Condition C — Tag text is exactly "Sale" (correct label, not a synonym)                  → TC-STAG-007
  Condition D — Tag is visually accessible (not hidden by CSS or overlapping elements)     → TC-STAG-008
  Condition E — Tag count equals strikethrough product count (no over- or under-tagging)   → TC-STAG-005
  Condition F — Tag renders for products initially off-screen after scroll                 → TC-STAG-009
  Condition G — Tag persists after hard reload (not a transient JS race)                   → TC-STAG-010
  Condition H — Tag present at narrow/mobile viewport (responsive layout)                  → TC-STAG-013

AC-2: Products WITHOUT a price reduction MUST NOT display a 'Sale' tag.
  Condition I — Single full-price product has no tag (individual happy path)               → TC-STAG-003
  Condition J — All full-price products simultaneously have no tag (bulk assertion)        → TC-STAG-004
  Condition K — Full-price product adjacent to sale product does not inherit tag (no bleed)→ TC-STAG-006
  Condition E (shared) — Count equality catches over-tagging of non-sale products          → TC-STAG-005

Cross-cutting
  Condition L — Authenticated session produces same tag behaviour (AC-1 & AC-2 both hold) → TC-STAG-011
  Condition M — Category listing page obeys the same rules as the Home page                 → TC-STAG-012

Priority assignments
  P1 — Core happy paths, both individual and bulk (Conditions A, B, I, J)
  P2 — Regression guards: wrong label, tag bleed, hidden tag, count mismatch (C, D, E, K)
  P3 — Realistic edge conditions encountered by real users (F, G, L)
  P4 — Scope extensions with lower defect probability (H, M)
-->

---
## TC-STAG-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on a sale product on the Home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Non-logged-in user sees 'Sale' tag on a sale product on the Home page
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the Featured products section
  And a product card is visible showing a strikethrough original price alongside a reduced current price
  Then that product card displays a "Sale" tag
```

---
## TC-STAG-002 | P1 | Positive | All featured products with a strikethrough price simultaneously display a 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: All featured products with a strikethrough price simultaneously display a 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then every product card that shows a strikethrough original price displays a "Sale" tag
```

**Notes:** Bulk assertion over all on-sale products in the section; catches scenarios where the tag is applied to the first card only (e.g. off-by-one in a loop or selector limited to `:first-child`).

---
## TC-STAG-003 | P1 | Positive | Full-price product on the Home page shows no 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product on the Home page shows no 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the Featured products section
  And a product card is visible showing only a single price with no strikethrough original price
  Then that product card does not display a "Sale" tag
```

---
## TC-STAG-004 | P1 | Positive | All full-price featured products simultaneously display no 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: All full-price featured products simultaneously display no 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then every product card that shows only a single price (no strikethrough) does not display a "Sale" tag
```

**Notes:** Bulk counterpart to TC-STAG-003. Ensures the absence of the tag is consistent across all full-price products, not just a single sampled card.

---
## TC-STAG-005 | P2 | Negative | Count of 'Sale' tags equals count of products with a strikethrough price

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Count of 'Sale' tags equals count of products with a strikethrough price
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then the total number of visible "Sale" tags equals the total number of product cards with a strikethrough original price
```

**Notes:** A single count comparison catches both under-tagging (AC-1 violated) and over-tagging (AC-2 violated) simultaneously. Fails if the counts diverge for any reason.

---
## TC-STAG-006 | P2 | Negative | Full-price product adjacent to a sale product does not inherit the 'Sale' tag

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product adjacent to a sale product does not inherit the 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user views the Featured products section that contains both sale products (with strikethrough prices) and full-price products (without strikethrough prices) displayed in the same grid
  Then each full-price product card does not display a "Sale" tag
  And each sale product card does display a "Sale" tag
```

**Notes:** Guards against CSS bleed or an overly broad DOM selector that marks any card inside a container that holds at least one sale product (e.g. sibling selector or ancestor-scoped CSS class).

---
## TC-STAG-007 | P2 | Negative | 'Sale' tag text is exactly "Sale" — not "Discount", "Offer", "SALE", or "% Off"

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario Outline: 'Sale' tag text is exactly "Sale" — not "Discount", "Offer", "SALE", or "% Off"
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to a product card that has a strikethrough original price
  Then the product card displays a tag with the text "Sale"
  And the product card does not display a tag with the text "<wrong_label>"

  Examples:
    | wrong_label |
    | Discount    |
    | Offer       |
    | SALE        |
    | % Off       |
    | On Sale     |
```

**Notes:** Verifies the exact copy specified in AC-1. Any alternative label would indicate the wrong implementation. The "SALE" variant catches case-sensitivity defects where the wrong text-transform CSS is applied.

---
## TC-STAG-008 | P2 | Negative | 'Sale' tag on a sale product is visually rendered and not hidden by CSS or an overlay

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag on a sale product is visually rendered and not hidden by CSS or an overlay
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to a product card that has a strikethrough original price
  Then the "Sale" tag is present in the DOM on that product card
  And the "Sale" tag is visible to the user (not hidden by display:none, visibility:hidden, opacity:0, overflow:hidden clipping, or a covering element)
```

**Notes:** Addresses a class of defect where the tag exists in the HTML but is not perceivable — for example, clipped by the card container's `overflow: hidden`, positioned behind the product image, or given a zero-opacity CSS rule.

---
## TC-STAG-009 | P3 | Edge | Sale products initially below the viewport display a 'Sale' tag after being scrolled into view

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Sale products initially below the viewport display a 'Sale' tag after being scrolled into view
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  And the Featured products section is not visible in the initial viewport (page top is displayed)
  When the user scrolls down until the Featured products section is fully visible in the viewport
  Then each product card with a strikethrough original price that is now visible displays a "Sale" tag
```

**Notes:** Targets lazy or deferred rendering patterns where off-screen product cards may not receive the 'Sale' tag class until an IntersectionObserver fires. If all cards are rendered eagerly this test still validates the correct final state after scroll.

---
## TC-STAG-010 | P3 | Edge | 'Sale' tag persists on a sale product after a hard browser refresh

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag persists on a sale product after a hard browser refresh
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  And a product card with a strikethrough original price is visible and displays a "Sale" tag
  When the user performs a hard page refresh (bypassing the browser cache)
  Then the same product card still displays a "Sale" tag after the page finishes loading
  And the strikethrough original price is still visible on that product card
```

**Notes:** Rules out transient rendering where the tag is applied by a client-side script on first load but lost on reload due to a timing race or a missing cache-busting strategy.

---
## TC-STAG-011 | P3 | Edge | Logged-in user sees identical 'Sale' tag behaviour to a non-logged-in user

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Logged-in user sees identical 'Sale' tag behaviour to a non-logged-in user
  Given a user is logged in to automationteststore.com with username "testuser1" and password "Test1234!"
  When the user navigates to the Home page at "https://automationteststore.com/"
  And the user scrolls through the entire Featured products section
  Then every product card with a strikethrough original price displays a "Sale" tag
  And every product card without a strikethrough original price does not display a "Sale" tag
```

**Notes:** AC-1 does not restrict the rule to unauthenticated sessions. An authenticated session may receive a different server-side rendered response or a different client-side data payload; this test confirms the tag logic is session-state agnostic.

---
## TC-STAG-012 | P4 | Edge | 'Sale' tag is displayed on discounted products on a category listing page

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: 'Sale' tag is displayed on discounted products on a category listing page
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user navigates to the "Skincare" category listing page via the Men menu
  Then every product card on the Skincare listing page with a strikethrough original price displays a "Sale" tag
  And every product card on the Skincare listing page without a strikethrough original price does not display a "Sale" tag
```

**Notes:** AC-1 states "all products on the page" without restricting scope to the Home page. The Skincare category (accessible via Men > Skincare) was selected as a representative listing page that is already covered by the existing POM framework.

---
## TC-STAG-013 | P4 | Edge | 'Sale' tag remains visible at a narrow (mobile) viewport width

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag remains visible at a narrow (mobile) viewport width
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/" with the browser viewport set to a width of 375 pixels (iPhone SE equivalent)
  When the user scrolls to the Featured products section
  And a product card with a strikethrough original price is visible
  Then that product card displays a "Sale" tag
  And the "Sale" tag is fully visible and not clipped or overflowing outside the product card boundary
```

**Notes:** Responsive layout reflows may cause absolutely- or relatively-positioned badge elements to overflow the card or be hidden by `overflow: hidden` at narrow widths. This test confirms the tag remains perceivable on common mobile screen sizes.

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | All products on the page that have a price reduction (strikethrough price) should display a 'Sale' tag | TC-STAG-001, TC-STAG-002, TC-STAG-005, TC-STAG-007, TC-STAG-008, TC-STAG-009, TC-STAG-010, TC-STAG-011, TC-STAG-012, TC-STAG-013 |
| AC-2 | Products which are not on sale should not display a 'Sale' tag | TC-STAG-003, TC-STAG-004, TC-STAG-005, TC-STAG-006, TC-STAG-011, TC-STAG-012 |
