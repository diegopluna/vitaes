# PDF Template System

## Status

Proposed

## Context

The previous project used `@react-pdf/renderer` with hardcoded React template components. That worked for a curated set of built-in resume templates, but it does not scale well to a future where:

- users can create templates
- we can operate a template store
- templates can be versioned and reviewed
- the editor can offer safe customization without exposing arbitrary code

We considered whether the new project should keep `@react-pdf/renderer` or pivot to LaTeX.

## Decision

We should keep `@react-pdf/renderer` as the primary PDF rendering engine for the new project.

We should not use raw React components as the long-term template authoring format.

Instead, we should introduce a template definition layer above the renderer:

- resume data schema
- template schema
- renderer/compiler layer
- preview/export pipeline

## Why Not LaTeX

LaTeX is strong for high-quality typesetting, but it is a poor default authoring model for this product direction.

### Main drawbacks

- weak fit for browser-native live preview
- poor fit for user-authored templates
- higher complexity for safe sandboxed rendering
- worse debugging and error reporting for non-technical users
- more operational complexity if compilation must happen server-side

## Why Keep React PDF

`@react-pdf/renderer` aligns better with the rest of the stack and with the product direction.

### Main advantages

- same language and ecosystem as the app
- easier preview and export integration
- easier sharing of validation logic in TypeScript
- easier incremental migration from the previous implementation
- better foundation for a constrained template DSL

## Architectural Direction

The system should be split into three layers:

1. Resume data layer
2. Template definition layer
3. Rendering layer

The key shift is:

- React PDF remains the rendering runtime
- template definitions become declarative data
- React components become implementation details of the renderer

## Non-Goals

At the beginning, we should avoid:

- raw user-authored React templates
- raw user-authored LaTeX templates
- arbitrary scripting inside templates
- freeform canvas positioning for every element

## Outcome

This gives us a path to:

- support built-in templates
- support user-customized templates
- build a template store
- keep previews and exports consistent
- retain the option to add another renderer in the future if needed
