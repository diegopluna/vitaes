# Template Store and Authoring

## Status

Proposed

## Product Direction

The long-term goal is not only to offer built-in templates, but to support a template ecosystem where users can:

- browse templates
- customize templates
- duplicate templates
- create their own templates
- publish templates to a store

## Authoring Levels

We should not expose full custom template authoring immediately.

Instead, the authoring model should mature in stages.

### Level 1: Theme Customization

Users can customize:

- colors
- font pairings
- spacing density
- section order
- header alignment or style presets

This is the lowest-risk first version and should likely ship first.

### Level 2: Layout Composition

Users can choose among allowed blocks and variants.

Examples:

- timeline experience
- compact education list
- badges for skills
- two-column layout
- sidebar identity block

This is likely the right model for a healthy template marketplace.

### Level 3: Advanced Template Authoring

Users gain access to a broader composition tool with more direct control over regions and block placement.

We should only approach this after the DSL and renderer are stable.

## Why Not Raw React or Raw LaTeX

If users author templates as code:

- safety becomes harder
- moderation becomes harder
- preview failures become harder to debug
- the UX becomes inaccessible to most users

User-created templates should be data-driven and constrained.

## Store Requirements

A template store likely needs:

- template metadata
- screenshots/thumbnails
- template versioning
- compatibility information
- moderation/review status
- visibility controls
- author ownership
- publish and unpublish flows

## Suggested Data Model

Each template record should include at least:

- `id`
- `name`
- `slug`
- `authorId`
- `definition`
- `baseTemplateId` if derived
- `version`
- `status`
- `thumbnailUrl`
- `createdAt`
- `updatedAt`

## Safety Rules

Before allowing publishing, templates should pass:

- schema validation
- rendering validation
- thumbnail generation
- asset/font validation
- compatibility checks

## UX Principle

The template editor should feel like guided design, not like programming.

Users should make choices such as:

- choose a header layout
- choose a section style
- reorder sections
- choose typography
- choose density

The system should translate those choices into a validated template definition.
