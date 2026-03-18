# Test Cases: Pricing Collapsed View - Price From per Kg

> **Generated:** 2026-03-13
> **Feature:** Display pricing with "Price From per Kg" for flight offers in collapsed view, including proper unit, currency, and minimal price selection from service tiers and fare types.
> **Total:** 24 test cases — 8 Positive | 5 Negative | 11 Edge

---

## Summary Table

| ID | Priority | Type | Title | AC Ref |
|----|----------|------|-------|--------|
| TC-PCP-001 | P1 | Positive | Display "Price From per KG" for single offer in collapsed view | AC-2, AC-3, AC-4, AC-5 |
| TC-PCP-002 | P1 | Positive | Display "Price From per LB" when user preference is LB | AC-2, AC-3 |
| TC-PCP-003 | P1 | Positive | Display minimal price from Perform tier | AC-4 |
| TC-PCP-004 | P1 | Positive | Display Standard fare type with pricing in collapsed view | AC-5 |
| TC-PCP-005 | P1 | Positive | Display Flex fare type with pricing in collapsed view | AC-5 |
| TC-PCP-006 | P1 | Positive | Display minimal price between Standard and Flex fare types | AC-5 |
| TC-PCP-007 | P1 | Positive | Display correct currency from Optima response with currency code | AC-3 |
| TC-PCP-008 | P1 | Positive | Display flight details in collapsed view for "Contact for pricing" without rate | AC-6 |
| TC-PCP-009 | P2 | Negative | Fail to display pricing when Optima unit preference is missing | AC-2 |
| TC-PCP-010 | P2 | Negative | Fail to display pricing when Optima currency response is null | AC-3 |
| TC-PCP-011 | P2 | Negative | Fail to display pricing when no tiers are available from Optima | AC-4 |
| TC-PCP-012 | P2 | Negative | Fail to display pricing when Optima response is malformed | AC-2, AC-3, AC-4, AC-5 |
| TC-PCP-013 | P2 | Negative | Fail to display pricing when no fare type data is available | AC-5 |
| TC-PCP-014 | P3 | Edge | Display minimal price when only Perform tier is available | AC-4 |
| TC-PCP-015 | P3 | Edge | Display minimal price when only Prioritize tier is available | AC-4 |
| TC-PCP-016 | P3 | Edge | Display minimal price when only Critical tier is available | AC-4 |
| TC-PCP-017 | P3 | Edge | Display pricing when only Standard fare type is available | AC-5 |
| TC-PCP-018 | P3 | Edge | Display pricing when only Flex fare type is available | AC-5 |
| TC-PCP-019 | P3 | Edge | Display identical pricing across Perform, Prioritize, and Critical tiers | AC-4 |
| TC-PCP-020 | P3 | Edge | Display identical pricing for Standard and Flex fare types | AC-5 |
| TC-PCP-021 | P3 | Edge | Render responsive UI correctly on desktop (1920x1080) | AC-1 |
| TC-PCP-022 | P3 | Edge | Render responsive UI correctly on tablet (768x1024) | AC-1 |
| TC-PCP-023 | P3 | Edge | Render responsive UI correctly on mobile (375x667) | AC-1 |
| TC-PCP-024 | P4 | Edge | Display pricing with appropriate decimal precision (e.g., 2 decimals for USD) | AC-3 |

---

## Test Cases

<!--
## Analysis

### Domain Understanding
- **Feature**: Displays pricing information in a collapsed view for flight bookings in an e-commerce platform
- **User**: .com Customers using the e-booking platform
- **Business Goal**: Enable customers to quickly understand the minimum cost per kilogram (or pound) for a flight option
- **System Context**: Integrates with Optima backend for pricing data, unit preferences, and currency details. Part of MVP for e-booking.

### Acceptance Criteria Decomposition
1. **AC-1 (UI Responsive)**: Ensure layout adapts seamlessly across screen sizes (mobile, tablet, desktop)
2. **AC-2 (Unit Display per User Preference)**: Fetch and display pricing unit (KG or LB) from Optima based on user settings
3. **AC-3 (Currency from Optima)**: Display currency symbol/code exactly as returned by Optima API
4. **AC-4 (Minimal Price from Tiers)**: Select and display the lowest price available across Perform, Prioritize, and Critical service tiers
5. **AC-5 (All Fare Types with Minimal Price)**: Show both Standard and Flex fares; if both exist, display the minimal price
6. **AC-6 (Contact for Pricing Handling)**: When pricing is marked "Contact for pricing", show flight details but suppress rate display

### Test Case Coverage Strategy

**Positive Path (Happy Path):**
- Basic rendering of pricing with correct unit, currency, minimal tier price, and minimal fare price
- Each AC is validated with concrete test data from Optima

**Negative Path:**
- Invalid or missing Optima responses (null unit, missing currency, empty tiers, malformed JSON)
- Absence of required data fields forces graceful degradation

**Edge Cases:**
- Availability of only one tier (Perform only, etc.)
- Availability of only one fare type (Standard only, etc.)
- Price parity across tiers or fare types (no differentiation)
- Decimal precision and extremely large/small values
- Responsive design across different device sizes

### Priority Rationale
- **P1**: Core feature functionality — if these fail, pricing is not displayed correctly
- **P2**: Integration failures with Optima — if these fail, pricing is missing or invalid
- **P3**: Edge behaviors — if these fail, feature works in most cases but breaks under specific conditions
- **P4**: Quality-of-life and formatting — if these fail, feature still works but user experience is suboptimal
-->

---

## P1 — Positive Test Cases

---

## TC-PCP-001 | P1 | Positive | Display "Price From per KG" for single offer in collapsed view

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2, AC-3, AC-4, AC-5

```gherkin
Scenario: Display "Price From per KG" with minimal price from all sources
  Given the customer is on the flight search results page in collapsed view
  And the customer's unit preference from Optima is "KG"
  And an availability offer exists with the following data:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 45.50 USD      | 48.75 USD  |
    | Prioritize | 42.00 USD      | 50.00 USD  |
    | Critical   | 55.00 USD      | 52.00 USD  |
  When the page renders the collapsed view pricing section
  Then I should see the text "Price From 42.00 USD per KG" (minimal price 42.00 from Prioritize Standard)
  And the pricing information displays the correct currency code "USD"
  And no individual tier or fare type prices are displayed in the collapsed view
```

**Notes:**
- Minimal price across all tiers and fare types is 42.00 USD (Prioritize Standard)
- Unit "KG" is fetched from Optima user preferences
- Currency "USD" is provided in Optima response
- Collapsed view shows only the single minimal price summary

---

## TC-PCP-002 | P1 | Positive | Display "Price From per LB" when user preference is LB

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-2, AC-3

```gherkin
Scenario: Display "Price From per LB" when Optima user preference is LB
  Given the customer is on the flight search results page in collapsed view
  And the customer's unit preference from Optima is "LB"
  And an availability offer exists with pricing:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 20.25 GBP      | 22.00 GBP  |
    | Prioritize | 19.50 GBP      | 21.00 GBP  |
    | Critical   | 23.00 GBP      | 24.50 GBP  |
  When the page renders the collapsed view pricing section
  Then I should see the text "Price From 19.50 GBP per LB" (minimal price is 19.50 GBP)
  And the unit is displayed as "LB" not "KG"
```

**Notes:**
- Demonstrates proper unit switching based on Optima user preferences
- Currency is GBP (British Pounds)
- Minimal price logic applies regardless of unit

---

## TC-PCP-003 | P1 | Positive | Display minimal price from Perform tier

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-4

```gherkin
Scenario: Display minimal price when multiple fares exist in Perform tier only
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing only in the Perform tier:
    | Fare Type  | Price     |
    | Standard   | 35.00 EUR |
    | Flex       | 38.50 EUR |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 35.00 EUR per KG" (minimal price from Perform tier, Standard is cheaper)
```

**Notes:**
- Verifies that minimal price selection logic applies within a single tier
- Only Perform tier has data; Prioritize and Critical are absent

---

## TC-PCP-004 | P1 | Positive | Display Standard fare type with pricing in collapsed view

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-5

```gherkin
Scenario: Display Standard fare type pricing when available
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has Standard fare pricing:
    | Tier       | Standard Price |
    | Perform    | 40.00 USD      |
    | Prioritize | 38.00 USD      |
    | Critical   | 42.00 USD      |
  When the page renders the collapsed view pricing section
  Then the pricing information is derived from the Standard fare type
  And the collapsed view shows "Price From 38.00 USD per KG"
```

**Notes:**
- Verifies that Standard fare is correctly identified and processed
- Minimal price from Standard across tiers is 38.00 USD (Prioritize tier)

---

## TC-PCP-005 | P1 | Positive | Display Flex fare type with pricing in collapsed view

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-5

```gherkin
Scenario: Display Flex fare type pricing when available
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has Flex fare pricing:
    | Tier       | Flex Price |
    | Perform    | 50.00 AUD  |
    | Prioritize | 48.00 AUD  |
    | Critical   | 52.00 AUD  |
  When the page renders the collapsed view pricing section
  Then the pricing information is derived from the Flex fare type
  And the collapsed view shows "Price From 48.00 AUD per KG"
```

**Notes:**
- Verifies that Flex fare is correctly identified and processed
- Minimal price from Flex across tiers is 48.00 AUD (Prioritize tier)

---

## TC-PCP-006 | P1 | Positive | Display minimal price between Standard and Flex fare types

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-5

```gherkin
Scenario: Choose minimal price when both Standard and Flex are available
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing for both Standard and Flex:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 45.00 SGD      | 48.00 SGD  |
    | Prioritize | 42.00 SGD      | 41.00 SGD  |
    | Critical   | 50.00 SGD      | 55.00 SGD  |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 41.00 SGD per KG"
  And the pricing source is Flex Standard from the Prioritize tier (lowest price overall)
```

**Notes:**
- Prioritize-Flex (41.00 SGD) is lower than Prioritize-Standard (42.00 SGD)
- System correctly selects the absolute minimum across all combinations

---

## TC-PCP-007 | P1 | Positive | Display correct currency from Optima response with currency code

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-3

```gherkin
Scenario Outline: Display pricing in correct currency code from Optima
  Given the customer is on the flight search results page in collapsed view
  And the Optima response provides currency code as "<CurrencyCode>"
  And an availability offer has pricing of <Price> in <CurrencyCode>
  When the page renders the collapsed view pricing section
  Then the pricing is displayed as "<Price> <CurrencyCode> per KG"
  And the currency code matches exactly the Optima response

  Examples:
    | CurrencyCode | Price |
    | USD          | 40.00 |
    | EUR          | 35.50 |
    | GBP          | 32.25 |
    | AUD          | 55.00 |
    | JPY          | 4500  |
    | INR          | 3200  |
```

**Notes:**
- Currency code (not symbol) is displayed, aligned with AC-3 requirement for symbol coding
- Supports multiple international currencies
- JPY example has no decimal places (standard for Japanese Yen)

---

## TC-PCP-008 | P1 | Positive | Display flight details in collapsed view for "Contact for pricing" without rate

**Priority:** P1
**Type:** Positive
**AC Reference:** AC-6

```gherkin
Scenario: Display flight information without rate for "Contact for pricing" scenario
  Given the customer is on the flight search results page in collapsed view
  And an availability offer is marked as "Contact for pricing"
  And the flight details are:
    | Departure | 08:30 from JFK  |
    | Arrival   | 21:15 to LHR   |
    | Duration  | 7h 45m         |
    | Airline   | British Airways |
  When the page renders the collapsed view
  Then the flight details (departure, arrival, duration, airline) are visible
  And no pricing rate or "Price From" text is displayed
  And a "Contact for Pricing" or similar CTA is visible instead of the price
```

**Notes:**
- Flight information is still displayed for user awareness
- Rate is explicitly suppressed per AC-6
- Design for ok2fwd pending; for now, a CTA or label is shown

---

## P2 — Negative Test Cases

---

## TC-PCP-009 | P2 | Negative | Fail to display pricing when Optima unit preference is missing

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-2

```gherkin
Scenario: Gracefully handle missing unit preference from Optima
  Given the customer is on the flight search results page in collapsed view
  And the Optima response does not include a unit preference field
  And an availability offer has pricing data:
    | Tier       | Standard Price |
    | Perform    | 40.00 USD      |
    | Prioritize | 38.00 USD      |
  When the page attempts to render the collapsed view pricing section
  Then pricing is not displayed
  And an informational message is shown to the customer (e.g., "Pricing unavailable")
  Or a default unit (e.g., "KG") is applied and pricing displays with that default
```

**Notes:**
- AC-2 cannot be satisfied without unit information
- System should either skip rendering or apply a safe default
- Error handling is critical to prevent blank/broken UI

---

## TC-PCP-010 | P2 | Negative | Fail to display pricing when Optima currency response is null

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-3

```gherkin
Scenario: Currency is null in Optima response
  Given the customer is on the flight search results page in collapsed view
  And the Optima response has pricing data but currency field is null
  And an availability offer exists with pricing:
    | Tier  | Price |
    | Perform | 40.00 |
  When the page attempts to render the collapsed view pricing section
  Then no price is displayed (currency is required context)
  And a fallback message is shown
  Or the response is treated as invalid and pricing section is hidden
```

**Notes:**
- AC-3 explicitly requires currency from Optima
- Without currency, displaying a numeric price is confusing and non-compliant
- System must not display partial pricing

---

## TC-PCP-011 | P2 | Negative | Fail to display pricing when no tiers are available from Optima

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-4

```gherkin
Scenario: No service tiers available in Optima response
  Given the customer is on the flight search results page in collapsed view
  And the Optima response does not include Perform, Prioritize, or Critical tier pricing
  And an availability offer exists but has empty tier data
  When the page attempts to render the collapsed view pricing section
  Then pricing is not displayed
  And the flight is visible (display flight but not rate)
  And an informational message or "Contact for Pricing" label appears
```

**Notes:**
- AC-4 cannot be satisfied without tier data
- Flight should still be shown for context
- System gracefully degrades by hiding pricing

---

## TC-PCP-012 | P2 | Negative | Fail to display pricing when Optima response is malformed

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-2, AC-3, AC-4, AC-5

```gherkin
Scenario: Optima returns invalid JSON or incomplete pricing structure
  Given the customer is on the flight search results page in collapsed view
  And the Optima response is malformed (e.g., missing required fields, invalid JSON syntax)
  And no pricing data can be reliably parsed
  When the page attempts to render the collapsed view pricing section
  Then an error is caught and pricing section is not rendered
  And the flight details are still displayed
  And no exception or broken UI elements are visible to the customer
```

**Notes:**
- Malformed responses should prevent rendering but not crash the page
- Defensive programming ensures robustness against backend issues
- All AC that depend on Optima data (2, 3, 4, 5) are blocked

---

## TC-PCP-013 | P2 | Negative | Fail to display pricing when no fare type data is available

**Priority:** P2
**Type:** Negative
**AC Reference:** AC-5

```gherkin
Scenario: Optima response lacks fare type information
  Given the customer is on the flight search results page in collapsed view
  And the Optima response does not include Standard or Flex fare type data
  And tier information is present but fare types are missing
  When the page attempts to render the collapsed view pricing section
  Then pricing is not displayed
  And the flight details remain visible
```

**Notes:**
- AC-5 requires at least one fare type to be available
- If neither Standard nor Flex is present, minimal price logic cannot be applied
- Flight should still display for UX continuity

---

## P3 — Edge Case Test Cases

---

## TC-PCP-014 | P3 | Edge | Display minimal price when only Perform tier is available

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-4

```gherkin
Scenario: Only Perform tier has pricing; Prioritize and Critical are absent
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing only in Perform tier:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 30.00 CHF      | 35.00 CHF  |
    | Prioritize | NULL           | NULL       |
    | Critical   | NULL           | NULL       |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 30.00 CHF per KG"
  And the price is correctly identified from the only available tier
```

**Notes:**
- Minimal price selection must handle sparse tier availability
- Standard (30.00 CHF) is cheaper than Flex (35.00 CHF) in Perform

---

## TC-PCP-015 | P3 | Edge | Display minimal price when only Prioritize tier is available

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-4

```gherkin
Scenario: Only Prioritize tier has pricing; Perform and Critical are absent
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing only in Prioritize tier:
    | Tier       | Standard Price | Flex Price |
    | Perform    | NULL           | NULL       |
    | Prioritize | 33.00 CAD      | 31.00 CAD  |
    | Critical   | NULL           | NULL       |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 31.00 CAD per KG"
  And the price is correctly identified from the only available tier
```

**Notes:**
- Flex (31.00 CAD) is cheaper than Standard (33.00 CAD) in Prioritize
- System must not fail when expected tiers are missing

---

## TC-PCP-016 | P3 | Edge | Display minimal price when only Critical tier is available

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-4

```gherkin
Scenario: Only Critical tier has pricing; Perform and Prioritize are absent
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing only in Critical tier:
    | Tier       | Standard Price | Flex Price |
    | Perform    | NULL           | NULL       |
    | Prioritize | NULL           | NULL       |
    | Critical   | 45.00 SEK      | 50.00 SEK  |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 45.00 SEK per KG"
  And the price is correctly identified from the only available tier
```

**Notes:**
- Critical is typically the most expensive tier; testing that alone still works
- Standard (45.00 SEK) is cheaper than Flex (50.00 SEK)

---

## TC-PCP-017 | P3 | Edge | Display pricing when only Standard fare type is available

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-5

```gherkin
Scenario: Only Standard fare type exists; Flex is absent
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing only for Standard fare:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 28.00 NZD      | NULL       |
    | Prioritize | 26.00 NZD      | NULL       |
    | Critical   | 32.00 NZD      | NULL       |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 26.00 NZD per KG"
  And the fare type is correctly identified as Standard (only option)
```

**Notes:**
- Minimal price across tiers is 26.00 NZD (Prioritize Standard)
- System must not require Flex to be present

---

## TC-PCP-018 | P3 | Edge | Display pricing when only Flex fare type is available

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-5

```gherkin
Scenario: Only Flex fare type exists; Standard is absent
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing only for Flex fare:
    | Tier       | Standard Price | Flex Price |
    | Perform    | NULL           | 55.00 HKD  |
    | Prioritize | NULL           | 52.00 HKD  |
    | Critical   | NULL           | 60.00 HKD  |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 52.00 HKD per KG"
  And the fare type is correctly identified as Flex (only option)
```

**Notes:**
- Minimal price across tiers is 52.00 HKD (Prioritize Flex)
- System must not require Standard to be present

---

## TC-PCP-019 | P3 | Edge | Display identical pricing across Perform, Prioritize, and Critical tiers

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-4

```gherkin
Scenario: All tiers have identical Standard fare pricing
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has identical pricing across all tiers:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 40.00 USD      | 45.00 USD  |
    | Prioritize | 40.00 USD      | 45.00 USD  |
    | Critical   | 40.00 USD      | 45.00 USD  |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 40.00 USD per KG"
  And the minimal price is correctly identified as 40.00 USD (ties broken by first tier encountered)
```

**Notes:**
- No differentiation across tiers; system must still select minimal (40.00 USD)
- Standard is cheaper than Flex within each tier

---

## TC-PCP-020 | P3 | Edge | Display identical pricing for Standard and Flex fare types

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-5

```gherkin
Scenario: Standard and Flex have identical prices within all tiers
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has identical pricing for Standard and Flex:
    | Tier       | Standard Price | Flex Price |
    | Perform    | 38.00 MXN      | 38.00 MXN  |
    | Prioritize | 36.00 MXN      | 36.00 MXN  |
    | Critical   | 42.00 MXN      | 42.00 MXN  |
  When the page renders the collapsed view pricing section
  Then I should see "Price From 36.00 MXN per KG"
  And the minimal price is correctly identified as 36.00 MXN (Prioritize tier, both fares equal)
```

**Notes:**
- No differentiation between Standard and Flex; system must still display correct minimal price
- Minimal overall is 36.00 MXN (Prioritize tier)

---

## TC-PCP-021 | P3 | Edge | Render responsive UI correctly on desktop (1920x1080)

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Pricing information renders correctly on desktop viewport
  Given the customer accesses the flight search results page on a desktop (1920x1080)
  And an availability offer with pricing is rendered in collapsed view
  When the page loads
  Then the pricing text "Price From {amount} {currency} per {unit}" is clearly visible
  And no content is cut off or overlapping
  And spacing and alignment follow the responsive design guidelines
  And the pricing information is appropriately sized for desktop viewing
```

**Notes:**
- Desktop is the primary breakpoint for e-booking platforms
- Text size, padding, and layout must accommodate standard viewing

---

## TC-PCP-022 | P3 | Edge | Render responsive UI correctly on tablet (768x1024)

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Pricing information renders correctly on tablet viewport
  Given the customer accesses the flight search results page on a tablet (768x1024)
  And an availability offer with pricing is rendered in collapsed view
  When the page loads
  Then the pricing text is visible and readable without horizontal scrolling
  And the font size is appropriate for tablet viewing distance
  And the pricing element does not compress or overflow the layout
  And all information remains aligned on a single line or is appropriately wrapped
```

**Notes:**
- Tablet breakpoints often require text wrapping or layout adjustment
- Must ensure readability at ~10-12 inch screen distance

---

## TC-PCP-023 | P3 | Edge | Render responsive UI correctly on mobile (375x667)

**Priority:** P3
**Type:** Edge
**AC Reference:** AC-1

```gherkin
Scenario: Pricing information renders correctly on mobile viewport
  Given the customer accesses the flight search results page on a mobile device (375x667)
  And an availability offer with pricing is rendered in collapsed view
  When the page loads
  Then the pricing text is visible without horizontal scrolling
  And the font size is readable for mobile viewing distance (3-6 inches)
  And the pricing element is appropriately sized for the compact layout
  And no elements overlap or are cut off
  And the layout adapts to orientation changes (portrait to landscape and vice versa)
```

**Notes:**
- Mobile is critical for on-the-go e-booking usage
- Text must remain readable and interactions must not be obstructed
- Orientation changes (landscape: 667x375) must also be supported

---

## TC-PCP-024 | P4 | Edge | Display pricing with appropriate decimal precision (e.g., 2 decimals for USD)

**Priority:** P4
**Type:** Edge
**AC Reference:** AC-3

```gherkin
Scenario Outline: Display pricing with currency-appropriate decimal precision
  Given the customer is on the flight search results page in collapsed view
  And an availability offer has pricing of <PriceValue> in <CurrencyCode>
  When the page renders the collapsed view pricing section
  Then the price is displayed with exactly <DecimalPlaces> decimal places
  And the format is "<FormattedPrice> <CurrencyCode> per KG"

  Examples:
    | CurrencyCode | PriceValue | DecimalPlaces | FormattedPrice |
    | USD          | 40.50      | 2             | 40.50          |
    | EUR          | 35.999     | 2             | 36.00          |
    | GBP          | 32.1       | 2             | 32.10          |
    | JPY          | 4567       | 0             | 4567           |
    | KWD          | 12.345     | 3             | 12.345         |
    | BHD          | 15.678     | 3             | 15.678         |
```

**Notes:**
- Different currencies have different decimal conventions (USD/EUR = 2, JPY = 0, etc.)
- Proper formatting improves trust and professionalism
- Rounding is applied according to currency standards (banker's rounding or standard rounding as per Optima specs)

---

## Coverage Matrix

| AC | Description | Test IDs |
|----|-------------|----------|
| AC-1 | UI must be responsive | TC-PCP-021, TC-PCP-022, TC-PCP-023 |
| AC-2 | Display pricing per KG or LB per user preferences from Optima | TC-PCP-001, TC-PCP-002, TC-PCP-009 |
| AC-3 | Display currency as provided in Optima response | TC-PCP-001, TC-PCP-007, TC-PCP-010, TC-PCP-024 |
| AC-4 | Show minimal price from Perform/Prioritize/Critical tiers | TC-PCP-001, TC-PCP-003, TC-PCP-011, TC-PCP-014, TC-PCP-015, TC-PCP-016, TC-PCP-019 |
| AC-5 | Display all fare types (Standard & Flex) with minimal price | TC-PCP-001, TC-PCP-004, TC-PCP-005, TC-PCP-006, TC-PCP-013, TC-PCP-017, TC-PCP-018, TC-PCP-020 |
| AC-6 | For "Contact for pricing": display flight but not rate | TC-PCP-008, TC-PCP-011 |

