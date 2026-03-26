# Test Cases: Sales Tag for Products on Sale

> **Generated:** 2026-03-26
> **Feature:** Products with a price reduction (strikethrough price) on any listing page must display a 'Sale' tag; full-price products must not.
> **Total:** 10 test cases — 3 Positive | 2 Negative | 5 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-SALE-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on product with strikethrough price on Home page | AC-1 |
| TC-SALE-002 | P1 | Positive | Non-logged-in user does not see 'Sale' tag on full-price product on Home page | AC-2 |
| TC-SALE-003 | P1 | Positive | All products with price reduction show 'Sale' tag; all full-price products do not | AC-1, AC-2 |
| TC-SALE-004 | P2 | Negative | Full-price product does not show 'Sale' tag when surrounded by sale products | AC-2 |
| TC-SALE-005 | P2 | Negative | Sale product with strikethrough price does not hide its 'Sale' tag | AC-1 |
| TC-SALE-006 | P3 | Edge | Products with price reduction below the fold display 'Sale' tag after scrolling | AC-1 |
| TC-SALE-007 | P3 | Edge | 'Sale' tag persists on sale product after full page reload | AC-1 |
| TC-SALE-008 | P3 | Edge | Logged-in user sees the same 'Sale' tag behaviour as a non-logged-in user | AC-1, AC-2 |
| TC-SALE-009 | P4 | Edge | 'Sale' tag is visible on sale products on a category listing page | AC-1, AC-2 |
| TC-SALE-010 | P4 | Edge | No 'Sale' tags are displayed when no products on the page are on sale | AC-2 |

---

## Test Cases

<!--
ANALYSIS

Domain: E-commerce store (https://automationteststore.com/). The feature ensures visual
price-reduction signalling via a 'Sale' badge on product cards. The target user is primarily
a non-logged-in shopper on the Home page, though the description is page-agnostic ("all the
products on the page"), so category listing pages are also in scope.

AC Decomposition:
  AC-1 → Every product whose price card shows a strikethrough (original) price alongside a
          reduced current price MUST render a 'Sale' tag.
          Testable conditions:
            - Single sale product → tag present (Positive)
            - Multiple sale products simultaneously visible → all tags present (Positive)
            - Sale product below initial viewport → tag present after scroll (Edge)
            - Tag survives page reload (Edge)
            - Consistent for authenticated users (Edge)
            - Tag not hidden/obscured when sale product is adjacent to non-sale products (Negative)

  AC-2 → Every product displayed at its regular price (no strikethrough) MUST NOT render a
          'Sale' tag.
          Testable conditions:
            - Single full-price product → no tag (Positive)
            - Full-price product co-existing with sale products → still no tag (Negative)
            - Page with zero sale products → zero tags on page (Edge)

Screenshots context: Image attachment present in JIRA but could not be retrieved
(requires authentication). Visual analysis skipped; test cases are derived from the
textual AC and the reference Gherkin scenario only.

Priority assignments:
  P1 – Core happy paths for both ACs, including bulk verification.
  P2 – Regression guards: ensure the wrong state does not appear (tag absent on sale / tag
       present on non-sale) in a mixed-product list.
  P3 – Realistic runtime conditions: scroll, reload, authenticated session.
  P4 – Lower-priority scope extensions: category pages, zero-sale-product state.
-->

---

## TC-SALE-001 | P1 | Positive | Non-logged-in user sees 'Sale' tag on product with strikethrough price on Home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1

```gherkin
Scenario: Non-logged-in user sees 'Sale' tag on product with strikethrough price on Home page
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  When the user scrolls down the Home page
  And a product with a strikethrough original price is visible in the featured products section
  Then that product displays a "Sale" tag
```

---

## TC-SALE-002 | P1 | Positive | Non-logged-in user does not see 'Sale' tag on full-price product on Home page

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2

```gherkin
Scenario: Non-logged-in user does not see 'Sale' tag on full-price product on Home page
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  When the user scrolls down the Home page
  And a product is displayed at its regular price with no strikethrough price visible
  Then that product does not display a "Sale" tag
```

---

## TC-SALE-003 | P1 | Positive | All products with price reduction show 'Sale' tag; all full-price products do not

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: All products with price reduction show 'Sale' tag; all full-price products do not
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  When the user scrolls through the entire featured products section
  Then every product with a strikethrough original price displays a "Sale" tag
  And every product without a strikethrough price does not display a "Sale" tag
```

---

## TC-SALE-004 | P2 | Negative | Full-price product does not show 'Sale' tag when surrounded by sale products

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-2

```gherkin
Scenario: Full-price product does not show 'Sale' tag when surrounded by sale products
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  When the user views the featured products section that contains both reduced-price and full-price products
  Then every full-price product (no strikethrough price) does not display a "Sale" tag
  And every reduced-price product (strikethrough price visible) displays a "Sale" tag
```

**Notes:** Verifies the tag logic is product-specific and not applied section-wide when at least one sale product is present.

---

## TC-SALE-005 | P2 | Negative | Sale product with strikethrough price does not hide its 'Sale' tag

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-1

```gherkin
Scenario: Sale product with strikethrough price does not hide its 'Sale' tag
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  When the user scrolls to a product that has a strikethrough original price and a reduced current price
  Then the product's "Sale" tag is present and visible in the product card
  And the "Sale" tag is not hidden, collapsed, or obscured by other UI elements
```

---

## TC-SALE-006 | P3 | Edge | Products with price reduction below the fold display 'Sale' tag after scrolling

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Products with price reduction below the fold display 'Sale' tag after scrolling
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  And the featured products section is not yet visible in the initial viewport
  When the user scrolls down until the featured products section is fully visible
  Then each product with a strikethrough original price in that section displays a "Sale" tag
```

**Notes:** Ensures lazy-loaded or off-screen product cards also receive the 'Sale' tag, not only those in the initial viewport.

---

## TC-SALE-007 | P3 | Edge | 'Sale' tag persists on sale product after full page reload

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: 'Sale' tag persists on sale product after full page reload
  Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
  And a product with a strikethrough price displays a "Sale" tag on initial load
  When the user performs a full page reload (F5)
  Then the same product still displays a "Sale" tag
  And the strikethrough original price remains visible on that product card
```

---

## TC-SALE-008 | P3 | Edge | Logged-in user sees the same 'Sale' tag behaviour as a non-logged-in user

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: Logged-in user sees the same 'Sale' tag behaviour as a non-logged-in user
  Given a user is logged in with credentials "testuser1@automationteststore.com" / "Test1234!"
  And the user navigates to the Home page at "https://automationteststore.com/"
  When the user scrolls down the Home page
  Then products with a strikethrough original price display a "Sale" tag
  And products without a strikethrough price do not display a "Sale" tag
```

**Notes:** Authentication status must not affect the visibility or absence of 'Sale' tags.

---

## TC-SALE-009 | P4 | Edge | 'Sale' tag is visible on sale products on a category listing page

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-1, AC-2

```gherkin
Scenario: 'Sale' tag is visible on sale products on a category listing page
  Given a non-logged-in user navigates to the Skincare category page at "https://automationteststore.com/index.php?rt=product/category&path=68"
  When the user views the product listing
  Then each product with a strikethrough original price displays a "Sale" tag
  And each product without a strikethrough price does not display a "Sale" tag
```

**Notes:** The feature description states "all products on the page", implying scope beyond the Home page; category pages should also honour the rule.

---

## TC-SALE-010 | P4 | Edge | No 'Sale' tags are displayed when no products on the page are on sale

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-2

```gherkin
Scenario: No 'Sale' tags are displayed when no products on the page are on sale
  Given a non-logged-in user navigates to a product listing page where all products are at full price
  When the user views the complete product listing
  Then no "Sale" tag is displayed on any product card on that page
```

**Notes:** Validates the absence condition comprehensively for a full-price-only product set.

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | Products with a price reduction (strikethrough price) must display a 'Sale' tag | TC-SALE-001, TC-SALE-003, TC-SALE-004, TC-SALE-005, TC-SALE-006, TC-SALE-007, TC-SALE-008, TC-SALE-009 |
| AC-2 | Products not on sale must not display a 'Sale' tag | TC-SALE-002, TC-SALE-003, TC-SALE-004, TC-SALE-008, TC-SALE-009, TC-SALE-010 |
