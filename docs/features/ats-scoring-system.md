# ATS Scoring System

## Status

Proposed

## Objective

Add an ATS scoring system that evaluates both:

- the structured resume source data
- the exported or uploaded PDF artifact that an ATS will actually parse

The system should produce:

- a normalized score
- explainable sub-scores
- actionable recommendations
- durable analysis snapshots for the dashboard and editor

The first version should fit the existing Vitaes architecture:

- structured resume data in `convex/shared/resume.ts`
- user-owned resume records in `convex/resumes.ts`
- authenticated data access through Convex
- dashboard surfaces in `src/routes/{-$locale}/dashboard/*`

## Product Position

ATS scoring should not be a generic "resume quality" number, and it should not only score internal source data.

It should answer four questions:

- how well does the source resume content match a specific role
- how well does the exported or uploaded PDF artifact match that role
- does the PDF preserve the source content when parsed
- which fixes improve both match quality and parsing reliability without turning the resume into keyword spam

That means the scoring model should be centered on:

- a target job description
- a parsed artifact view of the resume
- a fidelity comparison between source and artifact

## Why This Fits The Current Codebase

The current resume model is already strongly structured.

Useful properties already available:

- `basics` for identity and contact completeness
- section visibility flags
- normalized sections for summary, experience, education, skills, projects, certifications, languages, and custom content
- repeatable item arrays for experience, education, and projects

This makes deterministic source analysis practical without first building a full resume parser.

Current gaps:

- no job description entity
- no analysis snapshot entity
- no resume artifact entity
- no PDF parsing pipeline
- no artifact-to-source comparison layer
- no backend scoring module
- no editor surface for recommendations
- only a placeholder ATS badge in `src/routes/{-$locale}/dashboard/index.tsx`

## Decision

We should implement ATS scoring in three layers:

1. A deterministic source scoring engine over the canonical `ResumeDocument`.
2. A PDF artifact parsing and normalization pipeline.
3. A fidelity and compatibility layer that compares parsed artifact output against source data.

An optional AI enrichment layer can be added later for suggestions and semantic expansion.

The deterministic layer should remain the source of truth for the numeric score composition.

## Architecture

### 1. Inputs

The ATS system should evaluate:

- one resume document
- one target job description
- zero or one resume artifact PDF
- optional target metadata such as title, company, and seniority

Suggested normalized target shape:

```ts
type JobTarget = {
  title: string
  company?: string
  description: string
  locale?: string
}
```

### 2. Analysis Output

The scorer should return a durable snapshot, not just a transient number.

Suggested shape:

```ts
type AtsAnalysis = {
  version: 1
  resumeId: Id<"resumes">
  targetHash: string
  sourceScore: number
  artifactScore?: number
  fidelityScore?: number
  finalScore: number
  subscores: {
    sourceKeywordMatch: number
    sourceSectionCompleteness: number
    sourceFormattingSafety: number
    sourceContentStrength: number
    artifactKeywordMatch?: number
    artifactFormattingSafety?: number
    parseFidelity?: number
  }
  sourceMatchedKeywords: string[]
  sourceMissingKeywords: string[]
  artifactMatchedKeywords?: string[]
  artifactMissingKeywords?: string[]
  parseWarnings: string[]
  suggestions: Array<{
    id: string
    severity: "high" | "medium" | "low"
    category:
      | "keywords"
      | "summary"
      | "experience"
      | "skills"
      | "format"
      | "contact"
      | "parsing"
      | "template"
    message: string
    sectionId?: string
  }>
  artifactId?: Id<"resumeArtifacts">
  computedAt: number
}
```

`targetHash` should be derived from the normalized job description so identical targets can reuse cached results.

### 3. Storage

We should add four new Convex tables.

#### `jobTargets`

Purpose:

- store user-entered job descriptions
- allow multiple targets per user
- support re-scoring across resumes

Suggested fields:

- `userId`
- `title`
- `company?`
- `description`
- `locale?`
- `normalizedText`
- `targetHash`
- `updatedAt`

Suggested indexes:

- `by_user_updated_at`
- `by_user_target_hash`

#### `resumeAnalyses`

Purpose:

- persist ATS results
- allow dashboard reads without recomputing
- keep historical analyses per resume and target

Suggested fields:

- `userId`
- `resumeId`
- `jobTargetId`
- `targetHash`
- `artifactId?`
- `analysisVersion`
- `resumeUpdatedAt`
- `sourceScore`
- `artifactScore?`
- `fidelityScore?`
- `finalScore`
- `subscores`
- `sourceMatchedKeywords`
- `sourceMissingKeywords`
- `artifactMatchedKeywords?`
- `artifactMissingKeywords?`
- `parseWarnings`
- `suggestions`
- `computedAt`

Suggested indexes:

- `by_resume_computed_at`
- `by_resume_target`
- `by_user_computed_at`

#### `resumeArtifacts`

Purpose:

- represent the concrete file the user exports from Vitaes or uploads for checking
- track format and provenance
- support scoring the exact artifact that external ATS tools will see

Suggested fields:

- `userId`
- `resumeId?`
- `storageId`
- `mimeType`
- `fileName`
- `source`
  - `"exported"`
  - `"uploaded"`
- `templateId?`
- `templateVersion?`
- `createdAt`

Suggested indexes:

- `by_resume_created_at`
- `by_user_created_at`

#### `artifactParses`

Purpose:

- store the normalized parse result of a PDF artifact
- separate parsing from analysis so parse output can be reused across targets

Suggested fields:

- `userId`
- `artifactId`
- `parseVersion`
- `rawText`
- `normalizedText`
- `tokens`
- `detectedSections`
- `detectedContact`
- `warnings`
- `parserMetadata`
- `computedAt`

Suggested indexes:

- `by_artifact_computed_at`
- `by_user_computed_at`

## Scoring Model

## V1 Principles

The first scoring model should be:

- explainable
- deterministic where possible
- fast enough to run on every save or on-demand
- difficult to game with trivial repetition

The score should be a weighted aggregate from 0 to 100, but it should distinguish between source quality and artifact safety.

### Score Layers

The system should compute:

- `Source Score`: how well the structured resume content matches the target role
- `Artifact Score`: how well the parsed PDF artifact matches the target role
- `Fidelity Score`: how faithfully the parsed artifact preserves the source content
- `Final Score`: a weighted aggregate that penalizes strong source resumes when the exported artifact parses poorly

This avoids a misleading outcome where the app says a resume is strong even though the uploaded PDF loses critical information.

### Source Keyword Match: 30%

Goal:

- measure whether the resume includes the important terms from the job description

Implementation outline:

- normalize the job description text
- extract candidate keywords and multi-word phrases
- remove stop words and low-signal filler
- weight terms by frequency and by location heuristics
- compare against a normalized source resume text corpus built from:
  - headline
  - summary
  - skills
  - experience titles
  - experience highlights
  - project titles and highlights
  - certifications

Guardrails:

- cap repeated term contribution
- treat phrase matches as stronger than isolated token matches
- avoid rewarding hidden or invisible sections

### Source Section Completeness: 20%

Goal:

- ensure the resume has the fields ATS systems and recruiters expect

Checks can include:

- full name present
- email present
- headline present
- summary present
- at least one experience item
- experience items include dates
- skills section present with populated groups
- education or equivalent credential section present

This is a good fit for the existing `ResumeDocumentSchema`.

### Source Formatting Safety: 10%

Goal:

- approximate ATS-friendly structure even before DOCX/PDF parsing is introduced

V1 should stay content-based and avoid pretending we can fully inspect third-party ATS parsing behavior.

Checks can include:

- section titles exist where appropriate
- custom sections do not dominate the document
- bullet counts are within sane ranges
- links use valid URLs
- contact information is stored as plain text, not only external profiles

Later we can add stronger template-level checks once export formats stabilize.

### Source Content Strength: 15%

Goal:

- reward strong resume writing signals without relying on LLM judgment for the score

Checks can include:

- experience items contain highlights, not only titles
- highlights have reasonable length
- presence of action verbs
- measurable outcomes or numeric evidence in highlights
- recency and continuity signals from date ranges

This should remain heuristic in V1.

### Artifact Keyword Match: 10%

Goal:

- measure whether the parsed artifact still contains the important job-description terms

Implementation outline:

- parse the uploaded or exported PDF into normalized text
- extract keywords from the parsed text using the same normalization logic
- compare against the target job description terms
- compare coverage against the source keyword match to detect degradation

This captures cases where a term exists in source data but disappears or becomes hard to detect after export and parsing.

### Artifact Formatting Safety: 5%

Goal:

- detect signals that the PDF may parse unreliably in ATS systems

Checks can include:

- suspicious reading order
- broken section boundaries
- merged contact lines
- repeated header/footer noise
- excessive line fragmentation
- missing text expected from visible source sections

### Parse Fidelity: 10%

Goal:

- measure how closely the parsed artifact preserves the source content

Implementation outline:

- build a normalized source text corpus from the structured resume
- compare against normalized parsed artifact text
- compute recall-like metrics for:
  - basics fields
  - section titles
  - skills terms
  - experience titles
  - highlighted achievements

This is the critical layer for template safety and PDF compatibility.

## Normalization Strategy

We should introduce a shared text-normalization module, for example:

- `convex/shared/ats.ts` for schemas and types
- `src/lib/ats-normalize.ts` or `convex/lib/ats-normalize.ts` for tokenization helpers

Normalization should:

- lowercase
- strip punctuation that does not affect meaning
- preserve important symbols where useful, such as `c++`, `c#`, `node.js`, `next.js`
- singularize simple plurals where safe
- collapse whitespace

The implementation should also build a flattened resume text corpus from structured fields instead of stringifying raw JSON.

## AI Layer

The deterministic engine should own the score composition.

An optional AI layer can add:

- synonym expansion from job descriptions
- semantic grouping of equivalent skills
- rewrite suggestions for summaries and bullets
- prioritization of the most valuable missing concepts
- better section reconstruction from ambiguous parsed PDFs

We should not let an LLM directly assign the final ATS number in V1 because:

- scores become unstable
- regressions become hard to test
- user trust drops when explanations do not match the number

If AI is introduced later, it should enrich analysis output, not replace the scoring core or the fidelity checks.

## Backend Plan

### Shared Modules

Add a shared analysis domain:

- `convex/shared/ats.ts`
  - schemas for job targets, artifact parses, and analysis snapshots
  - analysis version constant
- `convex/lib/ats/extract.ts`
  - keyword extraction
- `convex/lib/ats/normalize.ts`
  - text normalization
- `convex/lib/ats/score-source.ts`
  - pure source scoring function
- `convex/lib/ats/score-artifact.ts`
  - parsed artifact scoring function
- `convex/lib/ats/score-fidelity.ts`
  - source versus artifact comparison
- `convex/lib/ats/parse-pdf.ts`
  - PDF text extraction and normalization boundary
- `convex/lib/ats/suggestions.ts`
  - deterministic recommendation generation across source and parsing issues

The core source scorer should be a pure function:

```ts
scoreSourceResumeAgainstTarget({
  resume,
  target,
}): AtsAnalysisSnapshot
```

Artifact parsing itself will not be pure, but everything after text extraction should be.

### Convex Functions

Suggested functions:

- `jobTargets.createMine`
- `jobTargets.listMine`
- `jobTargets.getMineById`
- `jobTargets.updateMine`
- `jobTargets.removeMine`
- `resumeArtifacts.createUploaded`
- `resumeArtifacts.createFromExport`
- `resumeArtifacts.getMineById`
- `artifactParses.getLatestForArtifact`
- `artifactParses.runForArtifact`
- `resumeAnalyses.runForResumeAndTarget`
- `resumeAnalyses.runForArtifactAndTarget`
- `resumeAnalyses.runFullCheck`
- `resumeAnalyses.getLatestForResume`
- `resumeAnalyses.getLatestForResumeAndTarget`
- `resumeAnalyses.listForResume`

`runForResumeAndTarget` should:

- verify ownership of the resume and target
- reuse cached analysis if `resume.updatedAt` and `targetHash` match the latest snapshot
- otherwise recompute source analysis and persist a new snapshot

`runFullCheck` should:

- verify ownership of the resume, target, and optional artifact
- parse the latest exported or uploaded PDF if needed
- compute source score
- compute artifact score
- compute fidelity score
- persist a unified ATS analysis snapshot

## Frontend Plan

### Dashboard

The existing ATS badge in `src/routes/{-$locale}/dashboard/index.tsx` should be backed by the latest stored full analysis for the current resume.

Useful additions:

- final score badge
- source versus artifact breakdown
- trend or freshness label
- top 3 missing keywords
- top parse warning
- CTA to open full analysis

### My Resumes

`src/routes/{-$locale}/dashboard/my-resumes.tsx` is currently empty and is a good place to show:

- latest final ATS score per resume
- source score versus artifact score
- target role attached to that score
- analysis age
- quick actions to rescore or change target
- quick actions to re-upload or re-parse PDF

### Resume Editor

Once the editor exists, ATS recommendations should appear beside the structured fields, not only as a generic report.

Examples:

- summary recommendation next to summary section
- missing keyword recommendation next to skills or experience
- formatting warnings at the document level
- artifact parsing warnings at the export or template level

This aligns with the current structured resume model much better than a plain text critique panel.

### Export and Upload UX

The user should be able to:

- run a source-only check before export
- run a full ATS check against the exported PDF generated by Vitaes
- upload an external PDF and compare it against the stored source resume

This distinction matters because users may change files after export or upload older resume variants.

## Rollout Plan

### Phase 1

- define ATS schemas and Convex tables
- implement deterministic source scoring engine
- add tests for source scoring and keyword extraction
- expose manual "content match" action for one resume and one target
- show source score in dashboard and resume list as a provisional metric

### Phase 2

- add PDF artifact storage and parsing pipeline
- support exported-PDF and uploaded-PDF checks
- compute artifact score and fidelity score
- add richer suggestions and per-section issue grouping
- add parse warnings and keyword coverage UI

### Phase 3

- introduce AI enrichment for synonyms and rewrite suggestions
- compare deterministic score against AI-assisted suggestions
- add analytics to track whether recommendations improve source and artifact scores over time
- add template-level ATS compatibility reporting

## Testing Strategy

We should test the scoring engine with fixture-driven unit tests.

Important cases:

- a strong match against a frontend job description
- the same resume against a backend role
- resumes with missing skills sections
- resumes with keyword stuffing
- multilingual resumes with locale differences
- resumes with dense custom sections and weak standard sections
- multi-column templates with degraded reading order
- PDFs where contact lines merge incorrectly
- PDFs where section headings are lost or duplicated
- exported artifacts whose parsed text misses source keywords

The PDF playground fixtures in `src/features/pdf-playground/sample-data.ts` are a useful starting point for resume fixtures, but ATS tests should use focused fixtures that isolate scoring behavior.

## Open Questions

- Should ATS scores be tied to one "active target" per resume, or should each resume support many concurrent targets?
- Do we want to score only against pasted job descriptions, or also against saved job URLs later?
- Should suggestions be localized immediately, or can the first version return English-only analysis text?
- Do we want the score to react on every save, or only on explicit user request until the editor exists?
- Should the default dashboard number remain source-only until artifact parsing ships, or should ATS labeling wait until the full check exists?
- Do we want every template version to have an aggregate parse-safety score based on accumulated artifact checks?

## Recommended First Slice

The smallest credible implementation in this repo is:

1. Add `jobTargets` and `resumeAnalyses` tables in Convex.
2. Build a pure deterministic source scorer over `ResumeDocument`.
3. Expose one route where a user pastes a job description and runs a source-only content match.
4. Label that result clearly as source-based until artifact parsing ships.
5. In the next slice, add `resumeArtifacts` and `artifactParses` so exported or uploaded PDFs can be parsed and compared against source data.

That would give Vitaes a staged path:

- fast source scoring first
- honest ATS compatibility once PDF round-trip parsing exists
- a clean path to editor integration, template safety metrics, and optional AI later
