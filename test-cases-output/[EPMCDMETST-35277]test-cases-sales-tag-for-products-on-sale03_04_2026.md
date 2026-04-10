# Test Cases: Sales Tag for Products on Sale

> **Generated:** 2026-04-03
> **JIRA Issue:** EPMCDMETST-35277
> **Feature:** Products on the Home page that carry a price reduction (strikethrough original price) must display a 'Sale' tag; products without a price reduction must not display it.
> **Total:** 17 test cases — 6 Positive | 6 Negative | 5 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-STAG-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on a sale product in the Featured section | AC-1 |
| TC-STAG-002 | P1 | Positive | Non-logged-in user sees 'Sale' tag on a sale product in the Latest Products section | AC-1 |
| TC-STAG-003 | P1 | Positive | All Featured products with a strikethrough price simultaneously display a 'Sale' tag | AC-1 |
| TC-STAG-004 | P1 | Positive | All Latest Products with a strikethrough price simultaneously display a 'Sale' tag | AC-1 |
| TC-STAG-005 | P1 | Positive | Full-price product in the Featured section shows no 'Sale' tag | AC-2 |
| TC-STAG-006 | P1 | Positive | Full-price product in the Latest Products section shows no 'Sale' tag | AC-2 |
| TC-STAG-007 | P2 | Negative | Count of 'Sale' tags in Featured section equals count of strikethrough-price products | AC-1, AC-2 |
| TC-STAG-008 | P2 | Negative | Count of 'Sale' tags in Latest Products section equals count of strikethrough-price products | AC-1, AC-2 |
| TC-STAG-009 | P2 | Negative | SKINSHEEN BRONZER STICK displays 'Sale' tag alongside both original and discounted prices | AC-1 |
| TC-STAG-010 | P2 | Negative | BENEFIT GIRL MEETS PEARL does not display a 'Sale' tag | AC-2 |
| TC-STAG-011 | P2 | Negative | 'Sale' tag text is exactly "Sale" — not "Discount", "Offer", "SALE", or "% Off" | AC-1 |
| TC-STAG-012 | P2 | Negative | 'Sale' tag on a sale product is visually rendered and not hidden by CSS or an overlay | AC-1 |
| TC-STAG-013 | P3 | Edge | Sale products in Latest Products section below the viewport display a 'Sale' tag after scroll | AC-1 |
| TC-STAG-014 | P3 | Edge | Both Featured and Latest Products sections simultaneously comply with 'Sale' tag rules | AC-1, AC-2 |
| TC-STAG-015 | P3 | Edge | 'Sale' tag persists on a sale product after a hard browser refresh | AC-1 |
| TC-STAG-016 | P4 | Edge | Logged-in user sees identical 'Sale' tag behaviour across both Featured and Latest Products sections | AC-1, AC-2 |
| TC-STAG-017 | P4 | Edge | 'Sale' tag is displayed on discounted products on the Skincare category listing page | AC-1, AC-2 |

---

## Test Cases

<!--
ANALYSIS
========

Domain
------
automationteststore.com is a demo e-commerce storefront. The Home page contains two product
sections relevant to this feature:
  1. "Featured" section — "See Our Most Featured Products"
  2. "Latest Products" section — "See New Products"

Both sections present a grid of product cards. Cards for sale items display two prices: a
strikethrough original price (e.g. "$29.50") alongside a reduced current price (e.g. "$19.00"),
with a "Sale" tag overlay on the card. The business requirement mandates that every such card
displays a clearly visible "Sale" tag, and that cards without a price reduction display none.

Screenshot Analysis (input-images/Screenshot at Mar 25 21-11-33.png — 2476×1364 RGBA)
-------------------------------------------------------------------------------------------
OCR extracted the following product names and states from the screenshot:

Featured section:
  - SKINSHEEN BRONZER STICK: two prices ($29.50 strikethrough and $19.00) → "Sale" tag visible ✓
  - BENEFIT GIRL MEETS PEARL: single price ($30.00) → no "Sale" tag ✓

Latest Products section:
  - ABSOLUTE ANTI-AGE SPOT / REPLENISHING UNIFYING TREATMENTSPF: prices not clearly extracted
  - ABSOLUE EYE PRECIOUS CELLS: "Sale" tag visible ✓
  - LANCOME / BENEFIT BELLA BAMBA: price $28.00 (relationship to strikethrough unclear from OCR)
  - TOTAL MOISTURE FACIAL CREAM / TROPIQUES MINERALE LOOSE BRONZER: price $38.50
  - FLASH BRONZER BODY GEL: "Sale" tag visible ✓

Key findings beyond prior test runs (April 2, 2026):
  1. The "Latest Products" section (distinct from "Featured") also contains products with Sale tags.
     Previous runs focused only on the Featured section. AC-1 says "all products on the page",
     so Latest Products is equally in scope. NEW test cases TC-STAG-002, TC-STAG-004,
     TC-STAG-006, TC-STAG-008, TC-STAG-013 address this gap.
  2. SKINSHEEN BRONZER STICK is a concrete sale product with identifiable prices ($29.50→$19.00).
     TC-STAG-009 validates the full card state: tag + both price values.
  3. BENEFIT GIRL MEETS PEARL is a concrete full-price product ($30.00) in the Featured grid
     alongside a sale product. TC-STAG-010 provides a named, reproducible AC-2 assertion.
  4. At least two products in Latest Products (ABSOLUE EYE PRECIOUS CELLS, FLASH BRONZER BODY GEL)
     carry Sale tags, confirming the section is in scope and requires bulk coverage (TC-STAG-004).
  5. TC-STAG-014 creates a cross-section assertion to prevent a scenario where one section
     is fixed and the other regresses.

AC Decomposition
----------------
AC-1: Every product with a price reduction (strikethrough original price) MUST display a 'Sale' tag.
  Condition A — Single Featured sale product renders tag                 → TC-STAG-001
  Condition B — All Featured sale products simultaneously render tag     → TC-STAG-003
  Condition C — Single Latest Products sale product renders tag          → TC-STAG-002 (NEW)
  Condition D — All Latest Products sale products simultaneously render  → TC-STAG-004 (NEW)
  Condition E — SKINSHEEN BRONZER STICK (named product) shows tag + both prices → TC-STAG-009 (NEW)
  Condition F — Tag text is exactly "Sale"                               → TC-STAG-011
  Condition G — Tag is visually accessible                               → TC-STAG-012
  Condition H — Tag count = strikethrough count in Featured             → TC-STAG-007
  Condition I — Tag count = strikethrough count in Latest Products      → TC-STAG-008 (NEW)
  Condition J — Off-screen sale products in Latest Products tagged after scroll → TC-STAG-013 (NEW)
  Condition K — Tag persists after hard reload                           → TC-STAG-015

AC-2: Products WITHOUT a price reduction MUST NOT display a 'Sale' tag.
  Condition L — Single Featured full-price product has no tag                   → TC-STAG-005
  Condition M — Single Latest Products full-price product has no tag            → TC-STAG-006 (NEW)
  Condition N — BENEFIT GIRL MEETS PEARL (named full-price product) has no tag → TC-STAG-010 (NEW)
  Conditions H & I (shared) — Count equality guards against over-tagging

Cross-cutting
  Condition O — Both sections obey rules simultaneously (no one-section regression) → TC-STAG-014 (NEW)
  Condition P — Authenticated session produces same behaviour             → TC-STAG-016
  Condition Q — Category listing page obeys the same rules               → TC-STAG-017

Priority assignments
  P1 — Core happy paths in both the Featured and Latest Products sections
  P2 — Regression guards: wrong label, hidden tag, count mismatch, named product assertions
  P3 — Realistic edge conditions encountered by real users (scroll, cross-section, reload)
  P4 — Scope extensions with lower defect probability (auth session, category pages)
-->

---
## TC-STAG-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on a sale product in the Featured section

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Non-logged-in user sees 'Sale' tag on a sale product in the Featured section
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the Featured products section
  And a product card is visible showing a strikethrough original price alongside a reduced current price
  Then that product card displays a "Sale" tag
```

---
## TC-STAG-002 | P1 | Positive | Non-logged-in user sees 'Sale' tag on a sale product in the Latest Products section

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Non-logged-in user sees 'Sale' tag on a sale product in the Latest Products section
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down past the Featured section to the "Latest Products" section
  And a product card is visible showing a strikethrough original price alongside a reduced current price
  Then that product card displays a "Sale" tag
```

**Notes:** The screenshot (Mar 25) shows "ABSOLUE EYE PRECIOUS CELLS" and "FLASH BRONZER BODY GEL" in Latest Products both carrying Sale tags. This section was not covered in previous test runs; AC-1 applies to all products on the page.

---
## TC-STAG-003 | P1 | Positive | All Featured products with a strikethrough price simultaneously display a 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: All Featured products with a strikethrough price simultaneously display a 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then every product card that shows a strikethrough original price displays a "Sale" tag
```

**Notes:** Bulk assertion. Guards against an off-by-one defect where only the first sale card receives the tag (e.g. a selector limited to `:first-child`).

---
## TC-STAG-004 | P1 | Positive | All Latest Products with a strikethrough price simultaneously display a 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: All Latest Products with a strikethrough price simultaneously display a 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire "Latest Products" section
  Then every product card that shows a strikethrough original price displays a "Sale" tag
```

**Notes:** Bulk counterpart of TC-STAG-003 applied to the Latest Products section. The screenshot confirms at least two products in this section (ABSOLUE EYE PRECIOUS CELLS, FLASH BRONZER BODY GEL) carry Sale tags.

---
## TC-STAG-005 | P1 | Positive | Full-price product in the Featured section shows no 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product in the Featured section shows no 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the Featured products section
  And a product card is visible showing only a single price with no strikethrough original price
  Then that product card does not display a "Sale" tag
```

---
## TC-STAG-006 | P1 | Positive | Full-price product in the Latest Products section shows no 'Sale' tag

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product in the Latest Products section shows no 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls down to the "Latest Products" section
  And a product card is visible showing only a single price with no strikethrough original price
  Then that product card does not display a "Sale" tag
```

**Notes:** AC-2 applies to all products on the page, not just Featured. The screenshot shows multiple Latest Products cards (e.g. TOTAL MOISTURE FACIAL CREAM at $38.50) without Sale tags.

---
## TC-STAG-007 | P2 | Negative | Count of 'Sale' tags in Featured section equals count of strikethrough-price products

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Count of 'Sale' tags in Featured section equals count of strikethrough-price products
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire Featured products section
  Then the total number of visible "Sale" tags in the Featured section equals the total number of product cards with a strikethrough original price in that section
```

**Notes:** A single count comparison catches both under-tagging (AC-1 violation) and over-tagging (AC-2 violation) simultaneously.

---
## TC-STAG-008 | P2 | Negative | Count of 'Sale' tags in Latest Products section equals count of strikethrough-price products

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Count of 'Sale' tags in Latest Products section equals count of strikethrough-price products
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire "Latest Products" section
  Then the total number of visible "Sale" tags in the Latest Products section equals the total number of product cards with a strikethrough original price in that section
```

**Notes:** Screenshot confirms at least 2 tagged products in Latest Products. The count assertion prevents a defect where one product in the section is missed.

---
## TC-STAG-009 | P2 | Negative | SKINSHEEN BRONZER STICK displays 'Sale' tag alongside both original and discounted prices

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: SKINSHEEN BRONZER STICK displays 'Sale' tag alongside both original and discounted prices
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to the Featured products section
  And the user locates the "SKINSHEEN BRONZER STICK" product card
  Then the card displays a "Sale" tag
  And the card shows a strikethrough original price of "$29.50"
  And the card shows a discounted current price of "$19.00"
```

**Notes:** Uses a concrete product name and prices observed in the screenshot (Mar 25). Provides a reproducible reference data point. Validates that both the tag and the dual-price display are rendered correctly on the same card.

---
## TC-STAG-010 | P2 | Negative | BENEFIT GIRL MEETS PEARL does not display a 'Sale' tag

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-2

```gherkin
Scenario: BENEFIT GIRL MEETS PEARL does not display a 'Sale' tag
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to the Featured products section
  And the user locates the "BENEFIT GIRL MEETS PEARL" product card
  Then the card displays a single price of "$30.00" with no strikethrough
  And the card does not display a "Sale" tag
```

**Notes:** Uses a concrete product name and price observed in the screenshot (Mar 25). This card sits in the same Featured grid as the SKINSHEEN BRONZER STICK sale card, making it the ideal AC-2 assertion for the Featured section.

---
## TC-STAG-011 | P2 | Negative | 'Sale' tag text is exactly "Sale" — not "Discount", "Offer", "SALE", or "% Off"

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario Outline: 'Sale' tag text is exactly "Sale" — not a synonym or different casing
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

**Notes:** Verifies the exact copy specified in AC-1. "SALE" variant catches wrong CSS text-transform. Any alternative label indicates the wrong implementation.

---
## TC-STAG-012 | P2 | Negative | 'Sale' tag on a sale product is visually rendered and not hidden by CSS or an overlay

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag on a sale product is visually rendered and not hidden by CSS or an overlay
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls to a product card in the Featured section that has a strikethrough original price
  Then the "Sale" tag is present in the DOM on that product card
  And the "Sale" tag is visible to the user (not hidden by display:none, visibility:hidden, opacity:0, overflow:hidden clipping, or a covering element)
```

**Notes:** Addresses a defect class where the tag exists in HTML but is imperceptible — clipped by card container overflow, positioned behind the product image, or rendered with zero opacity.

---
## TC-STAG-013 | P3 | Edge | Sale products in Latest Products section below the viewport display a 'Sale' tag after scroll

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Sale products in Latest Products section below the viewport display a 'Sale' tag after scroll
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  And the "Latest Products" section is not visible in the initial viewport (page top is displayed)
  When the user scrolls down until the "Latest Products" section is fully visible in the viewport
  Then each product card in that section with a strikethrough original price displays a "Sale" tag
```

**Notes:** The Latest Products section is typically below the Featured section and thus below the initial viewport fold. Targets lazy-rendering defects where IntersectionObserver-triggered rendering may miss Sale tag assignment for cards in this lower section.

---
## TC-STAG-014 | P3 | Edge | Both Featured and Latest Products sections simultaneously comply with 'Sale' tag rules

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Both Featured and Latest Products sections simultaneously comply with 'Sale' tag rules
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user scrolls through both the Featured products section and the "Latest Products" section in a single page visit
  Then every product card with a strikethrough original price in either section displays a "Sale" tag
  And every product card without a strikethrough original price in either section does not display a "Sale" tag
```

**Notes:** Prevents a regression where one section is fixed and the other silently fails. The screenshot shows Sale tags in both sections, confirming this cross-section assertion is warranted.

---
## TC-STAG-015 | P3 | Edge | 'Sale' tag persists on a sale product after a hard browser refresh

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

**Notes:** Rules out a transient rendering defect where the tag is applied by a client-side script on first load but lost on reload due to a timing race or missing cache-busting strategy.

---
## TC-STAG-016 | P4 | Edge | Logged-in user sees identical 'Sale' tag behaviour across both Featured and Latest Products sections

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Logged-in user sees identical 'Sale' tag behaviour across both Featured and Latest Products sections
  Given a user is logged in to automationteststore.com with username "testuser1" and password "Test1234!"
  When the user navigates to the Home page at "https://automationteststore.com/"
  And the user scrolls through the Featured products section
  And the user scrolls through the "Latest Products" section
  Then every product card with a strikethrough original price in either section displays a "Sale" tag
  And every product card without a strikethrough original price in either section does not display a "Sale" tag
```

**Notes:** AC-1 does not restrict scope to unauthenticated sessions. An authenticated session may receive a different server-rendered payload; this confirms tag logic is session-state agnostic for both sections.

---
## TC-STAG-017 | P4 | Edge | 'Sale' tag is displayed on discounted products on the Skincare category listing page

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: 'Sale' tag is displayed on discounted products on the Skincare category listing page
  Given a non-logged-in user opens the Home page at "https://automationteststore.com/"
  When the user navigates to the "Skincare" category listing page via the Men menu
  Then every product card on the Skincare listing page with a strikethrough original price displays a "Sale" tag
  And every product card on the Skincare listing page without a strikethrough original price does not display a "Sale" tag
```

**Notes:** AC-1 states "all products on the page" without restricting scope to the Home page. Skincare (via Men > Skincare) is used as the representative category listing page as it is already covered by the existing POM framework.

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | All products with a price reduction must display a 'Sale' tag | TC-STAG-001, TC-STAG-002, TC-STAG-003, TC-STAG-004, TC-STAG-007, TC-STAG-008, TC-STAG-009, TC-STAG-011, TC-STAG-012, TC-STAG-013, TC-STAG-014, TC-STAG-015, TC-STAG-016, TC-STAG-017 |
| AC-2 | Products without a price reduction must not display a 'Sale' tag | TC-STAG-005, TC-STAG-006, TC-STAG-007, TC-STAG-008, TC-STAG-010, TC-STAG-014, TC-STAG-016, TC-STAG-017 |
