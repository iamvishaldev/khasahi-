# Personas

## Persona Framework
These personas represent high-value early adopters for Khasahi AI and anchor product, design, and AI behavior decisions.

## Persona 1: The Careful Parent

| Attribute | Detail |
| --- | --- |
| Name | Asha |
| Age Range | 31-40 |
| Context | Buys packaged food for children and extended family |
| Motivation | Avoid harmful additives and simplify label reading |
| Pain Point | Ingredient labels are too technical under time pressure |
| Product Need | Clear warnings with simple explanations |

## Persona 2: The Restriction-Led Shopper

| Attribute | Detail |
| --- | --- |
| Name | Rohan |
| Age Range | 24-34 |
| Context | Manages lactose intolerance and nut allergy |
| Motivation | Prevent accidental exposure |
| Pain Point | Ingredient aliases are difficult to remember |
| Product Need | Deterministic allergy-focused highlighting |

## Persona 3: The Ethical Eater

| Attribute | Detail |
| --- | --- |
| Name | Meera |
| Age Range | 22-35 |
| Context | Follows vegetarian diet with ingredient scrutiny |
| Motivation | Align purchases with values |
| Pain Point | Labels do not clearly indicate hidden animal-derived ingredients |
| Product Need | Context-aware explanation of non-obvious ingredients |

## Persona 4: The Fitness Optimizer

| Attribute | Detail |
| --- | --- |
| Name | Arjun |
| Age Range | 20-30 |
| Context | Tracks protein, sugar, and processed food intake |
| Motivation | Make faster tradeoff decisions in grocery stores |
| Pain Point | Nutrition labels provide data but not judgment |
| Product Need | Goal-aware summaries and practical takeaways |

## Needs Matrix

| Persona | Fast Scan | Allergy Safety | Ethical Filter | Plain Language | History |
| --- | --- | --- | --- | --- | --- |
| Asha | High | Medium | Low | High | Medium |
| Rohan | High | Very High | Low | Medium | High |
| Meera | Medium | Low | Very High | High | Medium |
| Arjun | High | Low | Low | Medium | High |

## Behavioral Insights

| Insight | Product Implication |
| --- | --- |
| Users want answers, not just data | Lead with summary rather than raw nutrition tables |
| Trust increases when rationale is visible | Show why an ingredient is flagged |
| Repeat usage depends on speed | Optimize camera and caching workflows |
| Preferences change over time | Profile model must support easy edits |

## Persona-to-Feature Mapping

| Persona | Critical Feature | Why |
| --- | --- | --- |
| Asha | Plain-language ingredient summaries | Reduces cognitive load |
| Rohan | Allergen detection and warnings | Direct safety value |
| Meera | Ingredient source interpretation | Supports ethical decisions |
| Arjun | Goal-based analysis emphasis | Makes output actionable |

## Assumptions

| Assumption | Consequence |
| --- | --- |
| Early adopters are willing to complete onboarding if value is clear | Onboarding can include lightweight preference setup |
| Users trust structured explanations more than opaque scores | Avoid single-number health ratings as primary output |

## Decision Notes
These personas justify a product strategy centered on personalized interpretation instead of generalized food scoring. Khasahi AI should feel like a user-specific decision assistant, not a generic scanner utility.
