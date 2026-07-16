# Folder Structure

## Goal
The codebase should be easy to scale by feature, easy to test, and easy for new contributors to navigate. A feature-first structure is the best fit for this product because scan, analysis, history, and profile each combine UI, state, domain logic, and data access.

## Repository Layout
```text
docs/
mobile/
backend/
shared/
infra/
```

## Mobile Structure
```text
mobile/src/
  app/
  navigation/
  core/
  features/
    auth/
    onboarding/
    scanner/
    analysis/
    history/
    profile/
  shared/
```

## Backend Structure
```text
backend/app/
  api/
  core/
  domain/
  services/
  repositories/
  schemas/
  integrations/
  workers/
```

## Shared Contracts

| Path | Purpose |
| --- | --- |
| `shared/contracts` | API request and response types shared across platforms |
| `shared/domain` | Optional cross-platform enums and rule constants |
| `shared/prompts` | Prompt schema references, not secret-bearing content |

## Mobile Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `app` | App bootstrap, providers, dependency registration |
| `navigation` | Root navigators and route definitions |
| `core` | Cross-feature infrastructure such as API client and storage adapters |
| `features` | Feature-owned UI, hooks, domain, repositories, and tests |
| `shared` | Reusable presentational components and utilities |

## Feature Module Shape
```text
features/scanner/
  screens/
  components/
  hooks/
  store/
  domain/
  data/
  services/
  tests/
```

## Why This Structure

| Decision | Reason |
| --- | --- |
| Feature-first top level | Keeps related code close and reduces cross-module coupling |
| Internal per-feature layers | Preserves clean architecture within each feature |
| Shared directory kept small | Prevents dumping unrelated logic into a global bucket |
| Separate `core` infrastructure | Makes app-wide dependencies explicit |

## Dependency Rules

| Rule | Example |
| --- | --- |
| Features may depend on `core` and `shared` | `analysis` can use `shared/components` |
| Features should not import internals from other features casually | `history` should use exposed contracts from `analysis`, not internal hooks |
| Domain models should not depend on UI components | Keeps business logic portable and testable |
| Shared UI should not contain feature-specific business rules | Prevents accidental coupling |

## Assumptions

| Assumption | Effect |
| --- | --- |
| Team size will grow after the hackathon | Structure must support parallel feature ownership |
| Shared type generation is feasible | Reduces drift between backend and mobile contracts |

## Decision Notes
This structure intentionally balances purity and speed. It avoids over-engineering while still giving the team strong boundaries from day one.
