---
target: app/[lang]/page.tsx
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-06-10T14-16-56Z
slug: app-lang-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Nav active states are good; mailto CTA gives no "what happens next" signal |
| 2 | Match System / Real World | 4 | Language is plain throughout — speaks directly to SMB owners |
| 3 | User Control and Freedom | 3 | Sticky nav, standard back button; no anchor links to jump between sections |
| 4 | Consistency and Standards | 3 | Visual language cohesive; services and why-us are the same 6-card grid shape used back-to-back |
| 5 | Error Prevention | 3 | Low error surface on marketing page |
| 6 | Recognition Rather Than Recall | 4 | All icons labeled, no recall burden |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts, no anchor nav, no direct-dial for repeat visitors |
| 8 | Aesthetic and Minimalist Design | 3 | Mostly clean; two identical grid patterns create visual redundancy |
| 9 | Error Recovery | 2 | No fallback if mailto fails; no form error states on this page |
| 10 | Help and Documentation | 2 | No FAQ, no "what to expect after contacting," no pricing clarity |
| **Total** | | **28/40** | **Good — solid foundation, clear weak areas** |

## Anti-Patterns Verdict

**LLM:** Not AI slop at a glance. Yellow-dark palette is committed. Polish pass removed icon-in-box antipattern. Structural predictability (textbook landing page flow, two identical 6-card grids) is the remaining concern.

**Detector:** 7 findings, all false positives. `text-slate-900 on bg-yellow-400` is ~11:1 contrast (near-black on yellow). Not gray-on-color.

## Overall Impression

Credible, professional agency. Biggest gap: no trust evidence. Zero testimonials, client logos, or work samples on a page targeting skeptical SMB buyers who've been burned before.

## What's Working

1. Brand color discipline — yellow-400 used precisely across states, no bleed into backgrounds.
2. Process section — strongest visually; numbered circles earn their sequence.
3. Navigation — sticky pill-nav with active states, bilingual switcher, mobile drawer.

## Priority Issues

**[P1] No social proof**
- Why: Target user is "skeptical SMB who's been burned." Zero third-party validation on the page.
- Fix: Add testimonial block between Process and Pricing. 1-2 short client quotes minimum.
- Command: /impeccable craft testimonials section

**[P1] Hero right column is a logo, not work**
- Why: Brand principle is "show don't template." Showing your own logo where a client site demo should be wastes the primary visual real estate.
- Fix: Replace logo card with device mockup or representative client screenshot.
- Command: /impeccable craft hero mockup

**[P2] Two identical 6-card grids back-to-back**
- Why: Services + Why Us are structurally identical; visitors process the second as "more of same."
- Fix: Change Why Us to 2-column wider layout, or horizontal ribbon of 3-4 key differentiators.
- Command: /impeccable layout why-choose-us section

**[P2] "Kimuntu Gallery" in primary nav**
- Why: Opaque to SMB visitors; creates confusion about the agency's identity.
- Fix: Move to footer or subdomain. Primary nav should show only the 5 conversion-path pages.
- Command: /impeccable distill navigation

**[P2] CTA is generic — no next-step specificity**
- Why: "Get a Quote" with no response time or process hint is every agency CTA. Ambiguity = less clicks for burned SMBs.
- Fix: Add "We respond within 1 business day. No commitment." below buttons.
- Command: /impeccable clarify cta section

## Persona Red Flags

**Jordan (Confused First-Timer):**
- mailto CTA opens email app with no confirmation — she may close it thinking nothing happened.
- No founder face or "about us" glimpse on home — doesn't know who she's writing to.
- "$500+" pricing is ambiguous; she may leave rather than click through to see full pricing.

**Casey (Distracted Mobile User):**
- Hero logo card appears above CTA on mobile — takes vertical space before content.
- 12 stacked cards (6 services + 6 why-us) on mobile is excessive scrolling.
- Footer nav links are text-xs (12px) — below 14px mobile minimum and touch targets likely <44px.

**Mireille (Bilingual SMB owner — FR route):**
- French hero heading may overflow on mobile due to longer word lengths.
- No FR-specific social proof — a quote from a French-Canadian client would close the bilingual trust gap.

## Minor Observations

- `text-slate-700` on yellow-400 CTA body passes contrast (~6:1) but reads slightly washed-out; consider `text-slate-800`.
- `getProjectList(dictionary)` is called but result never used — dead computation each render.
- Process step descriptions at text-xs (12px) should be text-sm (14px) for mobile readability.
- Footer "Made in Canada 🇨🇦" emoji flag renders inconsistently cross-platform.
