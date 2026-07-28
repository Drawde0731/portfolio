# Cinematic 3D Keyboard Hero — Design Spec

**Date:** 2026-07-28  
**Status:** Approved  
**Scope:** Replace `components/sections/HeroSection.tsx` with a cinematic two-column hero featuring a React Three Fiber 3D mechanical keyboard as the visual centerpiece.

---

## 1. Goal

Eliminate the "AI-generated developer portfolio" feeling (terminal animation, floating key decorations, generic glassmorphism) and replace it with a premium, product-landing-page aesthetic. The first impression must communicate: *"This person builds serious software."*

---

## 2. Files Affected

| File | Action |
|---|---|
| `components/sections/HeroSection.tsx` | Full rewrite |
| `components/three/KeyboardScene.tsx` | New — all R3F scene code |
| `app/globals.css` | Remove `.cursor-blink` and `.key-cap` rules |
| `package.json` | Add `three`, `@react-three/fiber`, `@react-three/drei` |

No other sections change. No shared components modified.

---

## 3. Dependencies to Install

```bash
npm install three @react-three/fiber @react-three/drei
npm install --save-dev @types/three
```

`@react-three/fiber` requires React 18+. Project is on React 19 — compatible.

---

## 4. Layout Architecture

### 4.1 Desktop (≥768px)

Two-column CSS Grid: `grid-cols-[45%_55%]`. Left = typography + CTAs. Right = R3F canvas, full section height.

```
┌──────────────────────────┬──────────────────────────────┐
│  ● Status badge          │                              │
│                          │                              │
│  DRAWDE                  │      [3D Keyboard]           │
│                          │                              │
│  Software Engineer       │      cinematic product shot  │
│  Full Stack Developer    │      60% layout              │
│  AI Application Builder  │      dramatic lighting       │
│                          │                              │
│  ─────────────────       │      mouse parallax active   │
│                          │                              │
│  From Design to          │                              │
│  Deployment.             │                              │
│  Any Stack. Any          │                              │
│  Platform.               │                              │
│                          │                              │
│  Supporting copy...      │                              │
│                          │                              │
│  [View My Work]          │                              │
│  [Get in Touch]          │                              │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
                  ↓ Scroll
```

### 4.2 Mobile (<768px)

Single column. Canvas at top, fixed 300px height. Typography stacks below. Mouse parallax disabled on `pointer: coarse`.

### 4.3 Canvas Loading

`KeyboardScene` is a Next.js dynamic import with `{ ssr: false }`. While loading, the right column shows a skeleton placeholder (the keyboard's approximate bounding box area, very low opacity).

---

## 5. 3D Keyboard (KeyboardScene.tsx)

### 5.1 Form Factor

60% mechanical keyboard layout, ~61 keys across 5 rows. Key data is defined as a pure JS array (no external assets):

```
Row 0 (number row): ` 1 2 3 4 5 6 7 8 9 0 - = [Backspace 2u]
Row 1 (QWERTY):     [Tab 1.5u] Q W E R T Y U I O P [ ] [\ 1.5u]
Row 2 (home):       [Caps 1.75u] A S D F G H J K L ; ' [Enter 2.25u]
Row 3 (shift):      [Shift 2.25u] Z X C V B N M , . / [Shift 2.75u]
Row 4 (bottom):     [Ctrl 1.25u] [Win 1.25u] [Alt 1.25u] [Space 6.25u] [Fn 1u] [Ctrl 1u]
```

Each key is defined as `{ label: string, width: number, accent?: boolean }`.

### 5.2 Geometry Per Key

Each keycap = two `BoxGeometry` meshes:
- **Body**: `[width * unitSize, keyHeight, keyDepth]` — the main block
- **Top dish**: `[width * unitSize * 0.85, 0.02, keyDepth * 0.85]` positioned flush on top, slightly inset — gives the visual impression of a keycap dish

Unit size = `0.95` (leaves 0.05 gap between keys). Key height = `0.28`. Key depth = `0.88`.

Keyboard frame = one `BoxGeometry` behind/under all keys, slightly larger than the key grid, `4px` border on all sides.

Everything is positioned using grid math: `xOffset += key.width * unitSize + gap`.

### 5.3 Materials

| Surface | Hex | Roughness | Metalness | Emissive |
|---|---|---|---|---|
| Keycap body | `#1C1C1E` | 0.88 | 0.04 | none |
| Keycap top dish | `#242428` | 0.82 | 0.02 | none |
| Frame / plate | `#0D0D0F` | 0.25 | 0.75 | none |
| Accent keys (ESC, Enter, Space) | `#1C1C1E` | 0.88 | 0.04 | `#3B6FE8` pulsing |

Materials are shared across keys of the same type (one `useMemo` per material) — not recreated per key.

### 5.4 Lighting

| Light | Type | Color | Intensity | Position |
|---|---|---|---|---|
| Key light | SpotLight | `#FFF8EE` (warm) | 4.5 | `[-4, 6, 4]` |
| Rim light | SpotLight | `#4477EE` (cool blue) | 1.8 | `[5, 3, -3]` |
| Fill | PointLight | `#FFFFFF` | 0.4 | `[0, -2, 3]` |
| Ambient | AmbientLight | `#FFFFFF` | 0.08 | — |

Key light: `angle 0.35`, `penumbra 0.7`, `castShadow: true`, `shadow-mapSize: 1024`.  
Shadows: `<Canvas shadows>` enabled. Only the keyboard frame receives/casts shadows.

### 5.5 Camera

- FOV: 38 (product-photography compression)
- Position: `[0, 2.8, 6.5]`
- LookAt: `[0, 0, 0]`
- Keyboard group base rotation: `rotateX(-0.35)` (~20° tilt toward viewer)
- `<OrbitControls>` disabled in production (navigation is handled via parallax only)

---

## 6. Animations

### 6.1 Entrance (R3F internal, no Framer Motion inside canvas)

On mount, keyboard group scale lerps from `0.85 → 1.0` over ~1.2s using a `useFrame` delta accumulator. Keyboard also rises from `y: -0.5 → 0` simultaneously.

### 6.2 Idle Float

Keyboard group oscillates on Y: `Math.sin(clock.elapsedTime * 0.5) * 0.06`. Period ~12.5s. Imperceptible but adds life.

### 6.3 Accent Key Pulse

ESC, Enter, and Space keys pulse their emissive intensity:
```js
emissive.intensity = 0.08 + Math.sin(clock.elapsedTime * 1.8 + keyIndex * 1.2) * 0.07
```
Staggered by `keyIndex` so they don't pulse in sync.

### 6.4 Mouse Parallax (CameraRig)

A `CameraRig` component inside the canvas listens to the R3F `useFrame` state's pointer:
- `rotationY = pointer.x * 0.10` (±~6° at screen edges)
- `rotationX = -pointer.y * 0.06` (±~3° at screen edges)
- Applied to keyboard GROUP rotation, lerped at factor 0.04

On `pointer: coarse` (mobile), parallax is disabled.

### 6.5 Page Entrance (Framer Motion, left column only)

Staggered fade-in from Y+20:
- Badge: delay 0.1s
- Name: delay 0.25s
- Roles: delay 0.4s
- Divider + tagline: delay 0.55s
- Supporting copy: delay 0.65s
- CTAs: delay 0.75s

Canvas wrapper fades in at delay 0.35s.

### 6.6 `frameloop` strategy

Canvas uses `frameloop="always"`. The idle float and key-pulse animations run continuously, so there is no benefit to demand-rendering — the frame loop is already occupied every tick. GPU usage is kept low by memoized materials, instanced meshes, and a capped `pixelRatio` (§10), not by pausing the loop.

---

## 7. Typography & Copy

### 7.1 Name

```
DRAWDE
```
- `font-size: clamp(5rem, 12vw, 9rem)`
- `font-weight: 700`
- `letter-spacing: -0.04em`
- `line-height: 0.9`
- `color: #FFFFFF`
- Left-aligned (not centered — editorial confidence)

### 7.2 Roles (static, stacked)

```
Software Engineer
Full Stack Developer
AI Application Builder
```
- `font-size: 1.05rem`
- `font-weight: 300`
- `color: rgba(255,255,255,0.38)`
- `line-height: 1.9`
- Static — no cycling. Three roles shown simultaneously. Looks deliberate.

### 7.3 Divider

1px horizontal rule, `rgba(255,255,255,0.08)`, `max-width: 200px`, left-aligned.

### 7.4 Tagline

```
From Design to Deployment.
Any Stack. Any Platform.
```
- `font-size: 1rem`
- `font-weight: 500`
- `color: rgba(255,255,255,0.60)`
- Left-aligned

### 7.5 Supporting Copy (rewritten)

```
I architect systems, build applications, and automate what 
shouldn't be done by hand — then ship it to production.
```
- `font-size: 0.875rem`
- `font-weight: 300`
- `color: rgba(255,255,255,0.35)`
- `line-height: 1.75`

### 7.6 Status Badge

Keep as-is: `● Status: Spraying Insecticide to Prod`. Personality anchor.

---

## 8. CTA Buttons

### Primary — "View My Work"

```
background: #FFFFFF
color: #111111
border-radius: 9999px
padding: 12px 28px
font-size: 0.875rem
font-weight: 500
```

Hover: `background: rgba(255,255,255,0.88)`, `transform: translateY(-1px)`, `box-shadow: 0 8px 24px rgba(255,255,255,0.12)`.

### Secondary — "Get in Touch"

```
background: transparent
color: rgba(255,255,255,0.65)
border: 1px solid rgba(255,255,255,0.18)
border-radius: 9999px
padding: 12px 28px
font-size: 0.875rem
font-weight: 400
```

Hover: `background: rgba(255,255,255,0.06)`, `border-color: rgba(255,255,255,0.3)`, `color: rgba(255,255,255,0.85)`.

Both use CSS transitions only (no Framer Motion on buttons — overkill for hover states).

---

## 9. Scroll Hint

Keep existing scroll hint (ChevronDown, bottom-center), identical to current. No changes.

---

## 10. Performance Guardrails

- `pixelRatio: Math.min(window.devicePixelRatio, 2)` — prevents 3x retina overdraw
- Shadow map size: 1024×1024 (sufficient for keyboard at this scale)
- Materials memoized with `useMemo` — one instance per material type
- Key meshes merged where possible using `instancedMesh` for the standard keys (same geometry, same material → single draw call). Accent keys are separate meshes.
- Dynamic import with `ssr: false` prevents any server-side R3F execution

---

## 11. What's Removed

| Current element | Status |
|---|---|
| `Terminal` component | Deleted |
| `TERMINAL_LINES` data | Deleted |
| `RoleCycler` component | Deleted — replaced with static stacked roles |
| `KeyboardKey` floating decorations | Deleted |
| `KEYS` / `KEY_POSITIONS` data | Deleted |
| `.cursor-blink` CSS | Removed from globals.css |
| `.key-cap` CSS | Removed from globals.css |

---

## 12. Out of Scope

- Post-processing (bloom, depth of field) — visually nice but adds ~80KB and a second render pass. Can be added later as a progressive enhancement.
- GLTF model loading — deferred; programmatic geometry achieves the visual goal.
- Device orientation API (gyroscope parallax on mobile) — out of scope for v1.
- Key label text (engraved legends) — too small to read at render distance; omitted to keep geometry clean.
