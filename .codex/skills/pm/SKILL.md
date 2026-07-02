# PM

## Purpose

Convert a ticket, issue, or feature request into a clear implementation specification before any coding begins.

## Use when

- A new ticket is assigned
- A GitHub issue is received
- A feature request is provided
- The implementation is not yet planned

## Responsibilities

- Read the ticket thoroughly.
- Identify any missing or ambiguous requirements.
- List assumptions separately from confirmed requirements.
- Break the work into logical sections.
- Define acceptance criteria.
- Identify dependencies and risks.
- Produce a `requirements.md` document.

## requirements.md template

# Feature

## Summary

A brief description of the feature.

## Business Goal

Why this feature exists.

## Functional Requirements

- Requirement 1
- Requirement 2
- Requirement 3

## Non-Functional Requirements

- Performance
- Security
- Accessibility
- Reliability

## API Changes

Describe any new or modified endpoints.

## Database Changes

Describe any schema or migration changes.

## Edge Cases

- Case 1
- Case 2

## Acceptance Criteria

- [ ] Requirement met
- [ ] Tests pass
- [ ] Documentation updated

## Open Questions

List anything that requires clarification.

## Deliverable

Create a `requirements.md` file in the project root.
