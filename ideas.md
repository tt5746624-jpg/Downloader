# Xoni Downloader — Design Brainstorm

## Direction 1

**Theme Name:** Signal Ledger  
**Very Brief Intro:** Editorial technology workspace aesthetics: dark ink, paper-like panels, and sharp signal colors. It feels trustworthy and clear, turning a technical utility into a guided, deliberate action.  
**Probability:** 0.07

## Direction 2

**Theme Name:** Citrus Terminal  
**Very Brief Intro:** A warm, modern utility interface using citrus-orange energy against navy ink. The experience is friendly but structured, with an intentional download workflow rather than a generic converter page.  
**Probability:** 0.04

## Direction 3

**Theme Name:** Soft Orbit  
**Very Brief Intro:** Airy monochrome panels and orbital visual cues make media conversion feel quiet and premium. It aims for a minimal product-tool personality over entertainment styling.  
**Probability:** 0.09

---

# Chosen Direction: Citrus Terminal

## Design Movement

**Post-digital editorial utility.** The visual language blends the pragmatic labels and hard-working controls of a studio tool with the warmth and tangible hierarchy of contemporary editorial design.

## Core Principles

1. **The link field is the stage.** The principal action is immediately legible and visually dominant, without the usual generic centered card.
2. **Confidence through hierarchy.** Compact labels, readable supporting copy, and clear format choices guide users in one continuous flow.
3. **Warm utility, not neon spectacle.** Strong orange gives the brand forward momentum while dark ink creates contrast and seriousness.
4. **Earned decoration.** Grid lines, inset rules, and small status markers support orientation instead of becoming visual noise.

## Color Philosophy

The interface uses **Roasted Tangerine** as its energetic owner-color: it signals action and progress without defaulting to social-media red. Charcoal-navy acts as the grounded “terminal” surface, while pale parchment softens reading areas and makes the utility feel approachable. Acid-lime is used sparingly to signify an available, safe-to-download state.

## Layout Paradigm

An **editorial utility strip** arrangement: the header reads like a control bar, the hero becomes a broad left-anchored work surface with a floating output rail, and later content alternates between horizontally offset instruction blocks rather than uniform cards in a centered grid.

## Signature Elements

1. A vertical **orange signal rail** that runs beside the main downloader workbench.
2. Fine **technical-grid linework** and numbered step markers.
3. A modular **format tile** that shifts between video and audio with a tangible active outline.

## Interaction Philosophy

Every interaction has a tangible acknowledgment: link input changes the ready-state, format choices click into a selected rail, and processing progresses through legible phase labels. Controls are direct, keyboard-accessible, and never hide the next step.

## Animation

Inputs, format tiles, and the submit control transition with a 160–220ms custom ease-out. The active state moves via border/color/transform only; a short segmented progress indicator appears only after a valid link is submitted. Decorative grid elements remain static. All nonessential motion is disabled with `prefers-reduced-motion`.

## Typography System

**Space Grotesk** handles display headlines, labels, and buttons with firm geometric presence. **DM Mono** handles status text, links, file formats, and metrics for a studio-tool cadence. Headlines use compact tracking and a 600–700 weight; body copy remains generous and calm at 400–500.

## Brand Essence

**Xoni turns the public-video link you already have into a format-ready file in a focused, transparent workflow.**  
Personality: **direct, warm, precise**.

## Brand Voice

Headlines are compact and action-led; CTAs name the outcome; microcopy clarifies rather than apologizes.  
Example headline: “Bring the link. Choose the file.”  
Example CTA: “Inspect link & choose format”

## Wordmark & Logo

The Xoni mark is a bold **split-play glyph**: an offset orange capsule containing a charcoal triangular cutout, crossed by a thin signal line. The wordmark uses custom letter spacing and a cropped terminal-like “X” rather than a default-font lockup.

## Signature Brand Color

**Roasted Tangerine — #FF6B35**

## Style Decisions

- The first viewport always frames an actionable link-entry workflow; imagery remains a supporting material texture rather than the hero’s primary subject.
- The orange signal rail is a persistent navigation motif that ties together the workspace, instructional flow, responsible-use guidance, and the final action.
- The Xoni wordmark uses a custom cut-through terminal “X” and intentionally compact letter spacing, so the identity remains distinct beyond its color treatment.
