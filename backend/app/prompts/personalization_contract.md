# Personalization Contract

## Purpose
This document defines the backend contract for building AI requests that are personalized by lifestyle profile, health goals, dietary preferences, allergies, and optional age.

## Rules
- The AI layer must consume structured profile data, not a single persona label.
- Lifestyle-specific follow-up answers must be included as first-class context.
- Recommendations must be tied to product ingredients and nutrition facts.
- The engine must remain data-driven so new lifestyle profiles can be added without changing the core prompt orchestration model.

## Required AI Input Sections
- `user_profile.lifestyle.profile_id`
- `user_profile.lifestyle.answers`
- `user_profile.health_goals`
- `user_profile.dietary_preferences`
- `user_profile.allergies`
- `user_profile.age`
- `product.product_name`
- `product.ingredients`
- `product.nutrition_facts`

## Implementation Note
The prompt builder should transform structured context into a readable prompt, but it must not discard the original typed representation used for validation and observability.
