# Template Render Pipeline

## Status

In Progress

## Objective

Move Vitaes from a renderer-driven template implementation to a compiler-driven
pipeline where `@react-pdf/renderer` is only the final output adapter.

The immediate goal is not to replace the PDF backend. The immediate goal is to
stop encoding product rules directly inside React PDF components.

## Current Problem

The playground renderer currently performs several responsibilities in one file:

- template block visibility
- resume section lookup
- title fallback resolution
- section/data binding
- layout and variant decisions
- React PDF node emission

This makes the renderer hard to evolve into an editor-friendly architecture,
hard to test in isolation, and too tightly coupled to `react-pdf`.

## Direction

The system should move toward this pipeline:

1. Template DSL
2. Compiler
3. Internal render structures
4. Renderer adapter

### 1. Template DSL

Source of truth for authoring-safe template intent.

Current source:

- `convex/shared/template.ts`

### 2. Compiler

The compiler should own all product logic that translates template intent plus
resume data into resolved rendering data.

Compiler responsibilities:

- visibility rules
- section lookup
- title defaults
- block normalization
- variant expansion
- later: pagination hints and layout planning

### 3. Internal Structures

We should introduce internal types that are independent from `react-pdf`.

Two layers are useful:

- resolved semantic document
- lower-level layout/render IR

Phase 1 introduced the resolved semantic document. Phase 3 adds the lower-level
render tree used by the renderer adapter.

### 4. Renderer Adapter

The renderer adapter should be intentionally dumb.

Its responsibilities should be limited to:

- style/token mapping
- primitive layout emission
- backend-specific node generation

It should not decide:

- whether a block is visible
- which resume section to use
- what a title should fall back to
- whether a summary block is renderable

## Phase Plan

## Phase 1: Resolution Extraction

Extract template-to-resume binding out of the React PDF component.

Deliverables:

- resolved block/document types
- resolver module
- renderer consumes resolved blocks instead of raw template resolution logic

This phase should preserve visual output.

## Phase 2: Style Extraction

Move token/style generation into a dedicated renderer style module.

Deliverables:

- `react-pdf` style builder
- renderer file becomes mostly structural

Status:

- completed in the playground
- implemented at `src/features/pdf-playground/renderers/react-pdf/react-pdf-styles.ts`

## Phase 3: Layout IR

Introduce a lower-level render tree that removes resume semantics from the
renderer path.

Deliverables:

- stacks
- rows
- text nodes
- links
- boxes
- dividers
- spacing primitives
- render hints

Status:

- completed in the playground
- implemented at `src/features/pdf-playground/template-compiler/render-ir.ts`
- planned at `src/features/pdf-playground/template-compiler/plan-render-document.ts`
- emitted at
  `src/features/pdf-playground/renderers/react-pdf/react-pdf-adapter.tsx`

## Phase 4: Section Planning

Move section variant logic into a layout planning pass.

Deliverables:

- entry section planner
- education planner
- skills planner
- custom section planner

Status:

- completed in the playground
- dispatcher kept at
  `src/features/pdf-playground/template-compiler/plan-render-document.ts`
- shared helpers extracted to
  `src/features/pdf-playground/template-compiler/planner-utils.ts`
- block-family planners extracted under
  `src/features/pdf-playground/template-compiler/block-planners/`

## Phase 5: Alternate Adapter Readiness

Keep the option open for another backend without changing the editor model.

Possible future adapters:

- HTML preview adapter
- alternate PDF adapter

## Initial File Structure

Recommended playground-local structure:

- `src/features/pdf-playground/template-compiler/resolved-template-document.ts`
- `src/features/pdf-playground/template-compiler/resolve-template-document.ts`
- `src/features/pdf-playground/template-compiler/render-ir.ts`
- `src/features/pdf-playground/template-compiler/plan-render-document.ts`
- `src/features/pdf-playground/template-compiler/planner-utils.ts`
- `src/features/pdf-playground/template-compiler/block-planners/`
- `src/features/pdf-playground/renderers/react-pdf/react-pdf-adapter.tsx`
- `src/features/pdf-playground/renderers/react-pdf/react-pdf-styles.ts`

## Architectural Rules

- Template DSL is product-facing contract.
- Compiler owns business logic.
- Renderer adapter owns backend mapping only.
- `react-pdf` must be treated as an implementation detail, not the authoring
  model.
- Playground preview and download should share the same compiler output.

## Why This Matters

This gives Vitaes a path to:

- build an editor against stable internal abstractions
- test template resolution without rendering PDFs
- migrate template schema safely
- keep client-side PDF generation
- preserve the option to add another backend later

## Current Phase

Phase 1, Phase 2, Phase 3, and Phase 4 are complete in the playground.

Next target:

- Phase 5: keep the compiler/IR stable enough for alternate adapter work
