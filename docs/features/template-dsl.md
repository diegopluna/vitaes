# Template DSL

## Status

Proposed

## Goal

Define templates as structured data instead of handwritten React components.

This DSL should be expressive enough to support strong resume layouts while remaining constrained enough to validate, version, migrate, and moderate.

## Core Principle

Users should author template intent, not PDF engine code.

That means templates should describe:

- page setup
- regions
- blocks
- typography tokens
- color tokens
- section variants
- layout density

The renderer then maps those decisions into `@react-pdf/renderer`.

## Proposed Model

### 1. Resume Data

Resume data remains content-only and independent from layout.

Examples:

- personal information
- summary
- experience
- education
- skills
- projects
- certifications

### 2. Template Definition

A template defines how resume data is presented.

Potential top-level shape:

```ts
type ResumeTemplate = {
  id: string
  name: string
  version: number
  page: {
    size: 'A4' | 'LETTER'
    margins: { top: number; right: number; bottom: number; left: number }
    columns?: { left: number; right: number }
  }
  theme: {
    fonts: {
      heading: string
      body: string
    }
    colors: {
      text: string
      accent: string
      muted: string
      background: string
    }
    density: 'compact' | 'comfortable' | 'airy'
  }
  regions: {
    header?: Block[]
    sidebar?: Block[]
    main: Block[]
    footer?: Block[]
  }
}
```

### 3. Blocks

Blocks are constrained primitives that bind layout to resume data.

Examples:

```ts
type Block =
  | { type: 'identity'; variant: 'centered' | 'split' | 'sidebar' }
  | {
      type: 'section'
      source: 'experience'
      variant: 'timeline' | 'compact-list'
    }
  | { type: 'section'; source: 'skills'; variant: 'badges' | 'categories' }
  | { type: 'text'; source: 'summary' }
  | { type: 'divider' }
  | { type: 'spacer'; size: number }
  | { type: 'group'; layout: 'stack' | 'row'; children: Block[] }
```

## DSL Constraints

The first version should support:

- predefined block types
- predefined variants
- simple visibility rules
- simple ordering rules
- token-based styling

The first version should not support:

- arbitrary JavaScript
- arbitrary HTML/CSS
- arbitrary LaTeX macros
- unrestricted positioning
- custom loops beyond supported section bindings

## Validation

The DSL should be validated with Zod before rendering or publishing.

Validation should cover:

- required regions
- allowed block types
- allowed bindings to resume sections
- supported variants
- compatible layout combinations
- token constraints and defaults

## Versioning

Every template should be versioned.

We should plan for:

- schema migrations
- renderer compatibility checks
- template upgrade paths for stored user templates

## Benefits

- safer than raw React templates
- easier to store in the database
- easier to diff and review
- easier to power a template editor later
- easier to keep preview and export behavior aligned

## Open Questions

- How much control should users have over section-level layout vs theme-level customization?
- Should user templates be full templates or derived templates based on system templates?
- How should pagination hints be expressed in the DSL?
