# PDF Template Roadmap

## Status

Draft

## Objective

Build a PDF and template architecture that supports:

- built-in templates
- live preview
- consistent export
- user customization
- future template publishing

## Phase 1: Foundations

Focus on the minimum architecture needed to avoid repeating the old hardcoded template model.

### Deliverables

- canonical resume content schema
- template schema defined in code
- template registry for built-in templates
- renderer boundary that accepts `{ data, template }`
- initial built-in templates expressed through the new model

## Phase 2: Rendering Pipeline

Build the internal rendering system around the DSL.

### Deliverables

- page renderer
- region renderer
- block renderers
- font and asset handling
- PDF preview integration
- PDF download/export integration

## Phase 3: Internal Template Authoring

Before exposing user authoring, we should prove the model internally.

### Deliverables

- migrate several first-party templates into the DSL
- identify missing block types and variants
- define migration strategy for template versions
- establish rendering constraints and defaults

## Phase 4: User Customization

Expose constrained customization to end users.

### Deliverables

- duplicate template flow
- theme editing
- section order controls
- variant switching for supported blocks
- save user-owned derived templates

## Phase 5: Template Store

After the editor and renderer are stable, support publishing and discovery.

### Deliverables

- publish workflow
- template review/moderation
- template metadata pages
- template thumbnails
- compatibility validation
- install/apply template flow

## Risks

- trying to support fully freeform layout too early
- letting template definitions become too close to code
- coupling resume data too tightly to specific template assumptions
- underestimating pagination and overflow behavior

## Implementation Notes

- Keep `@react-pdf/renderer` as the initial rendering backend.
- Treat React components as renderer internals, not template definitions.
- Preserve the option to add another backend later if product needs justify it.
