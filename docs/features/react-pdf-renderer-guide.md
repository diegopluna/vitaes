# @react-pdf/renderer Reference Guide

## Purpose

This document captures verified behavior of `@react-pdf/renderer` that is relevant to our PDF template system. It exists to prevent regressions and save future contributors (human or AI) from re-investigating the same questions.

All findings are verified against the library source code in `node_modules/@react-pdf`, not just documentation.

## Critical: lineHeight is a CSS-style multiplier

When you pass a bare number to `lineHeight`, react-pdf treats it as a **unitless multiplier** (like CSS `line-height: 1.45`), not an absolute point value (like React Native).

The `transformLineHeight` function in `@react-pdf/stylesheet` (`lib/index.js`) does:

```
unitless number  ->  value * fontSize   (e.g., 1.45 * 10pt = 14.5pt)
percentage "150%" -> 1.5 * fontSize
string "20pt"    ->  20pt (absolute)
```

**Do this:**

```ts
lineHeight: typography.lineHeight   // e.g., 1.45
```

**Not this:**

```ts
lineHeight: typography.baseSize * typography.lineHeight   // WRONG: double-multiplied
```

The second form produces `fontSize * (fontSize * multiplier)` internally, resulting in absurdly tall lines (e.g., 145pt instead of 14.5pt for 10pt text).

## Style arrays accept null safely

The pattern `style={[styles.base, condition ? styles.variant : null]}` is safe. The stylesheet pipeline processes styles through:

1. `castArray` -- wraps non-arrays
2. `compact` -- calls `.filter(Boolean)`, removing `null`, `undefined`, `false`
3. `mergeStyles` -- merges remaining objects, also skips `null`/`undefined` property values

Nested arrays are recursively flattened. This is intentional design, confirmed by JSDoc comments in the source.

## Supported CSS properties

Every CSS property used in our template styles has a dedicated handler in `@react-pdf/stylesheet`. The full list relevant to us:

### Layout (flexbox)
`flexDirection`, `justifyContent`, `alignItems`, `alignSelf`, `flexWrap`, `flexGrow`, `flexShrink`, `flexBasis`, `gap`

`gap` is a shorthand that expands to `rowGap` + `columnGap`. We only use `gap` (not `rowGap`/`columnGap` directly).

### Spacing
`margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginHorizontal`, `marginVertical`

`padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `paddingHorizontal`, `paddingVertical`

The `*Horizontal` and `*Vertical` shorthands expand to their individual sides (e.g., `paddingHorizontal` -> `paddingRight` + `paddingLeft`).

### Dimensions
`width`, `height`, `maxWidth`, `maxHeight`, `minWidth`, `minHeight`

Values accept numbers (interpreted as `pt`) or strings with units (`pt`, `in`, `mm`, `cm`, `%`, `vw`, `vh`).

### Text
`fontSize`, `fontFamily`, `fontWeight`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `textDecoration`

`textTransform` supports: `'capitalize'`, `'lowercase'`, `'uppercase'`, `'upperfirst'`, `'none'`

### Borders
`borderWidth`, `borderColor`, `borderTopWidth`, `borderRightWidth`, `borderBottomWidth`, `borderLeftWidth`, `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor`

We use individual side borders (`borderLeftWidth`/`borderLeftColor` for timeline, `borderBottomWidth`/`borderBottomColor` for compact entry separators). All are fully supported.

### Visual
`backgroundColor`, `color`, `opacity`

## Page wrapping

By default, all `<View>` components wrap across page boundaries. This works well for most content but causes visual issues for views with background colors or borders -- the background/border gets cut at the page break and does not continue on the next page.

Use `wrap={false}` on views that should not split across pages (e.g., card-style entries with `backgroundColor`). Be aware that `wrap={false}` will push the entire view to the next page if it does not fit, which can leave blank space. For views that may be very tall (many bullet points), allow wrapping.

Our approach: `wrap={variant !== 'cards'}` on entry views -- cards stay intact, other variants wrap normally.

## Units

The default unit is `pt` (72 points per inch). All bare numbers in styles are interpreted as `pt`. This matches the PDF coordinate system.

Supported units for string values: `pt`, `in`, `mm`, `cm`, `%`, `vw`, `vh`.

## Available components

| Component | Purpose | Notes |
|-----------|---------|-------|
| `<Document>` | Root container | Required wrapper |
| `<Page>` | Individual page | Accepts `size` (`A4`, `LETTER`, etc.) |
| `<View>` | Generic container | Like `<div>`, supports flexbox |
| `<Text>` | Text content | Required for all text; supports nesting |
| `<Link>` | Hyperlinks | Inherits default styles (blue, underline) |
| `<Image>` | Images | Accepts `src` prop |

Text must always be inside a `<Text>` component. Bare strings inside `<View>` will not render.

## Available fonts

Only the base 14 PDF fonts are available without registration:

- `Courier`, `Courier-Bold`, `Courier-Oblique`, `Courier-BoldOblique`
- `Helvetica`, `Helvetica-Bold`, `Helvetica-Oblique`, `Helvetica-BoldOblique`
- `Times-Roman`, `Times-Bold`, `Times-Italic`, `Times-BoldItalic`
- `Symbol`
- `ZapfDingbats`

Custom fonts require `Font.register()`. Our templates currently use `Helvetica` and `Helvetica-Bold`.

## Template spacing guidelines

With correct `lineHeight` rendering, these spacing scales work well:

| Density | xs | sm | md | lg | xl | Page margins |
|---------|----|----|----|----|-----|-------------|
| compact | 3 | 6 | 10 | 14 | 18 | ~30pt |
| airy | 4 | 8 | 14 | 20 | 26 | ~34-36pt |

These values assume `baseSize` of 9.5-10pt and `lineHeight` of 1.42-1.45.

## Known TypeScript issues

The `TemplateBlockSchema` uses `z.lazy()` for recursive block definitions, which causes Zod to infer `unknown` for the `TemplateBlock` type. This produces ~30+ LSP errors in `playground-pdf-document.tsx` (all `block is of type 'unknown'` variants). These errors do not prevent the build from succeeding because Vite does not type-check. The runtime behavior is correct.

## File reference

- **Renderer**: `src/features/pdf-playground/playground-pdf-document.tsx`
- **Template fixtures**: `src/features/pdf-playground/sample-data.ts`
- **Template schema**: `convex/shared/template.ts`
- **Resume schema**: `convex/shared/resume.ts`
