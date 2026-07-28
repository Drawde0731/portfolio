# Cinematic Keyboard Hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the terminal-based HeroSection with a cinematic two-column layout centered on a React Three Fiber 3D mechanical keyboard.

**Architecture:** Left column = typography + CTAs with Framer Motion stagger; right column = R3F Canvas (dynamic import, `ssr: false`) rendering a programmatic 60% mechanical keyboard with PBR materials, dramatic spotlighting, and mouse-driven parallax. No external 3D assets — all geometry is procedural.

**Tech Stack:** `three`, `@react-three/fiber`, `@react-three/drei` (new); Framer Motion, Next.js dynamic import (existing)

## Global Constraints

- Next.js 15, React 19, TypeScript strict — no `any`, no experimental APIs
- Tailwind CSS 3 — utility-first; no new CSS files created
- Font: Inter (`--font-inter`), existing; no new typefaces
- Background token: `bg-ink` = `#111111`
- Name display: "Drawde" (mixed case in DOM, weight + size carry the visual mass)
- Tagline verbatim: "From Design to Deployment. Any Stack. Any Platform."
- Supporting copy verbatim: "I architect systems, build applications, and automate what shouldn't be done by hand — then ship it to production."
- Roles (static, stacked): "Software Engineer" / "Full Stack Developer" / "AI Application Builder"
- Accent emissive color: `#3B6FE8`
- No OrbitControls — mouse parallax only, via keyboard group rotation
- `dpr={[1, 2]}` on Canvas — caps pixel ratio at 2x

---

### Task 1: Install 3D dependencies

**Files:**
- Modify: `package.json` (via npm install)

**Interfaces:**
- Produces: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` in node_modules; TypeScript resolves R3F types

- [ ] **Step 1: Install packages**

```bash
npm install three @react-three/fiber @react-three/drei
npm install --save-dev @types/three
```

- [ ] **Step 2: Verify TypeScript resolves the new types**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors referencing `three` or `@react-three/fiber`. Ignore any pre-existing type errors unrelated to the new packages.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install three, @react-three/fiber, @react-three/drei"
```

---

### Task 2: Rewrite HeroSection — two-column layout + typography

**Files:**
- Modify: `components/sections/HeroSection.tsx` (full rewrite — deletes Terminal, RoleCycler, KeyboardKey)

**Interfaces:**
- Consumes: `framer-motion`, `lucide-react/ChevronDown` (existing)
- Produces: `<HeroSection>` with two-column grid; right column = empty dark placeholder (canvas wired in Task 3)

- [ ] **Step 1: Replace the entire contents of HeroSection.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FADE_UP = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function HeroSection() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen bg-ink overflow-hidden">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Two-column grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 min-h-screen grid grid-cols-1 lg:grid-cols-[46%_54%] items-center">

        {/* ── Left: Typography ── */}
        <div className="flex flex-col gap-7 py-28 lg:py-0">

          {/* Status badge */}
          <motion.div {...FADE_UP(0.10)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              Status: Spraying Insecticide to Prod
            </span>
          </motion.div>

          {/* Name */}
          <motion.div {...FADE_UP(0.25)}>
            <h1
              className="font-bold text-white leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: "clamp(4.5rem, 11vw, 8.5rem)" }}
            >
              Drawde
            </h1>
          </motion.div>

          {/* Roles — stacked, static */}
          <motion.div {...FADE_UP(0.40)} className="flex flex-col gap-0.5">
            {[
              "Software Engineer",
              "Full Stack Developer",
              "AI Application Builder",
            ].map((role) => (
              <span
                key={role}
                className="text-base font-light leading-loose"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div {...FADE_UP(0.52)}>
            <div
              className="h-px w-44"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div {...FADE_UP(0.58)}>
            <p
              className="text-base font-medium leading-snug"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              From Design to Deployment.
              <br />
              Any Stack. Any Platform.
            </p>
          </motion.div>

          {/* Supporting copy */}
          <motion.div {...FADE_UP(0.66)}>
            <p
              className="text-sm font-light leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              I architect systems, build applications, and automate what
              shouldn&apos;t be done by hand — then ship it to production.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...FADE_UP(0.75)}
            className="flex flex-col sm:flex-row gap-3 pt-1"
          >
            <button
              onClick={() => go("projects")}
              className="px-7 py-3 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
              style={{ background: "#FFFFFF", color: "#111111" }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = "rgba(255,255,255,0.88)";
                t.style.transform = "translateY(-1px)";
                t.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = "#FFFFFF";
                t.style.transform = "translateY(0)";
                t.style.boxShadow = "none";
              }}
            >
              View My Work
            </button>
            <button
              onClick={() => go("contact")}
              className="px-7 py-3 text-sm font-light rounded-full transition-all duration-200 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.65)",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = "rgba(255,255,255,0.06)";
                t.style.borderColor = "rgba(255,255,255,0.30)";
                t.style.color = "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = "transparent";
                t.style.borderColor = "rgba(255,255,255,0.18)";
                t.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* ── Right: 3D canvas placeholder (wired in Task 3) ── */}
        <div className="hidden lg:block h-screen" />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.22em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Visual verification**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- Full-width dark hero (`#111111` background)
- Status badge with green dot, top-left of content column
- "Drawde" large and left-aligned
- Three roles stacked below in muted white
- Thin horizontal rule
- Tagline, supporting copy, two pill CTAs
- Right column is empty dark space
- Scroll hint at bottom center
- No terminal, no floating key decorations

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: two-column hero layout with editorial typography and premium CTAs"
```

---

### Task 3: Create KeyboardScene scaffold + wire into HeroSection

**Files:**
- Create: `components/three/KeyboardScene.tsx`
- Modify: `components/sections/HeroSection.tsx` (add dynamic import + wire right column)

**Interfaces:**
- Produces: `<KeyboardScene />` — a self-contained R3F canvas accepting no props; dynamically importable with `ssr: false`

- [ ] **Step 1: Create the directory and scaffold file**

Create `components/three/KeyboardScene.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Smoke-test placeholder — replaced with keyboard geometry in Task 4
function PlaceholderCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.4;
    ref.current.rotation.x = clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#3B6FE8" roughness={0.4} metalness={0.6} />
    </mesh>
  );
}

export default function KeyboardScene() {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 2.4, 7], near: 0.1, far: 50 }}
      shadows
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <PlaceholderCube />
    </Canvas>
  );
}
```

- [ ] **Step 2: Wire KeyboardScene into HeroSection**

In `components/sections/HeroSection.tsx`, add these two lines after the existing imports:

```tsx
import dynamic from "next/dynamic";

const KeyboardScene = dynamic(
  () => import("@/components/three/KeyboardScene"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full"
        style={{ background: "rgba(255,255,255,0.015)", borderRadius: "8px" }}
      />
    ),
  }
);
```

Replace the right column `<div className="hidden lg:block h-screen" />` with:

```tsx
{/* ── Right: 3D canvas ── */}
<motion.div
  className="hidden lg:flex h-screen relative items-center justify-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.35, duration: 0.8 }}
>
  <KeyboardScene />
</motion.div>
```

- [ ] **Step 3: Visual verification — canvas renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- A rotating blue cube in the right half of the hero
- No hydration errors or console errors
- Left column typography unchanged
- Cube fades in at ~0.35s

- [ ] **Step 4: Commit**

```bash
git add components/three/KeyboardScene.tsx components/sections/HeroSection.tsx
git commit -m "feat: scaffold KeyboardScene and wire into hero right column"
```

---

### Task 4: Build full 60% keyboard geometry

**Files:**
- Modify: `components/three/KeyboardScene.tsx` (replace PlaceholderCube with full keyboard components)

**Interfaces:**
- Produces: `KeyboardModel` — renders 61 keys across 5 rows; `KeyCap` and `AccentKeyCap` sub-components; `KEY_LAYOUT` constant (module-level)

- [ ] **Step 1: Replace the full file with the keyboard geometry implementation**

Replace the entire contents of `components/three/KeyboardScene.tsx`:

```tsx
"use client";

import { useRef, useMemo } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Layout constants ───────────────────────────────────────────────────────
const UNIT = 0.42     // 1u key width in Three.js units
const KEY_H = 0.22    // keycap body height (Y)
const KEY_D = 0.68    // keycap depth (Z, front-to-back)
const GAP = 0.04      // horizontal gap between adjacent keys
const ROW_GAP = 0.05  // Z-axis gap between rows

// ── 60% key layout ─────────────────────────────────────────────────────────
interface KeyDef {
  label: string
  width: number    // in units: 1 = 1u, 2 = 2u, etc.
  accent?: boolean // ESC, Enter, Space — get emissive blue pulse
}

const ROWS: KeyDef[][] = [
  // Row 0: number row
  [
    { label: "ESC",   width: 1,    accent: true },
    { label: "1",     width: 1 }, { label: "2",  width: 1 },
    { label: "3",     width: 1 }, { label: "4",  width: 1 },
    { label: "5",     width: 1 }, { label: "6",  width: 1 },
    { label: "7",     width: 1 }, { label: "8",  width: 1 },
    { label: "9",     width: 1 }, { label: "0",  width: 1 },
    { label: "-",     width: 1 }, { label: "=",  width: 1 },
    { label: "BS",    width: 2 },
  ],
  // Row 1: QWERTY
  [
    { label: "Tab",   width: 1.5 },
    { label: "Q",     width: 1 }, { label: "W",  width: 1 },
    { label: "E",     width: 1 }, { label: "R",  width: 1 },
    { label: "T",     width: 1 }, { label: "Y",  width: 1 },
    { label: "U",     width: 1 }, { label: "I",  width: 1 },
    { label: "O",     width: 1 }, { label: "P",  width: 1 },
    { label: "[",     width: 1 }, { label: "]",  width: 1 },
    { label: "\\",    width: 1.5 },
  ],
  // Row 2: home row
  [
    { label: "Caps",  width: 1.75 },
    { label: "A",     width: 1 }, { label: "S",  width: 1 },
    { label: "D",     width: 1 }, { label: "F",  width: 1 },
    { label: "G",     width: 1 }, { label: "H",  width: 1 },
    { label: "J",     width: 1 }, { label: "K",  width: 1 },
    { label: "L",     width: 1 }, { label: ";",  width: 1 },
    { label: "'",     width: 1 },
    { label: "Ent",   width: 2.25, accent: true },
  ],
  // Row 3: bottom alpha
  [
    { label: "Shift", width: 2.25 },
    { label: "Z",     width: 1 }, { label: "X",  width: 1 },
    { label: "C",     width: 1 }, { label: "V",  width: 1 },
    { label: "B",     width: 1 }, { label: "N",  width: 1 },
    { label: "M",     width: 1 }, { label: ",",  width: 1 },
    { label: ".",     width: 1 }, { label: "/",  width: 1 },
    { label: "Shift", width: 2.75 },
  ],
  // Row 4: modifiers
  [
    { label: "Ctrl",  width: 1.25 },
    { label: "Win",   width: 1.25 },
    { label: "Alt",   width: 1.25 },
    { label: "Space", width: 6.25, accent: true },
    { label: "Fn",    width: 1 },
    { label: "Ctrl",  width: 1.25 },
  ],
]

// ── Flatten ROWS into positioned key data (module-level, runs once) ────────
interface KeyLayout extends KeyDef {
  x: number
  z: number
  accentIdx: number  // -1 for standard keys; 0/1/2 for ESC/Enter/Space
  id: string
}

function computeKeyLayout(): KeyLayout[] {
  const rowDepthStep = KEY_D + ROW_GAP
  const zStart = -((ROWS.length - 1) * rowDepthStep) / 2
  let accentCount = 0

  return ROWS.flatMap((row, rowIdx) => {
    const totalWidth =
      row.reduce((sum, k) => sum + k.width * UNIT + GAP, 0) - GAP
    let x = -totalWidth / 2

    return row.map((key, keyIdx) => {
      const w = key.width * UNIT
      const keyX = x + w / 2
      x += w + GAP
      return {
        ...key,
        x: keyX,
        z: zStart + rowIdx * rowDepthStep,
        accentIdx: key.accent ? accentCount++ : -1,
        id: `${rowIdx}-${keyIdx}`,
      }
    })
  })
}

const KEY_LAYOUT = computeKeyLayout()

// ── Shared materials (one instance per type, memoized in component) ────────
function useKeyboardMaterials() {
  return useMemo(
    () => ({
      body: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1C1C1E"),
        roughness: 0.88,
        metalness: 0.04,
      }),
      top: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#242428"),
        roughness: 0.82,
        metalness: 0.02,
      }),
      frame: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0D0D0F"),
        roughness: 0.25,
        metalness: 0.75,
      }),
    }),
    []
  )
}

// ── KeyCap — standard non-accent key ──────────────────────────────────────
function KeyCap({
  width,
  bodyMat,
  topMat,
}: {
  width: number
  bodyMat: THREE.MeshStandardMaterial
  topMat: THREE.MeshStandardMaterial
}) {
  const w = width * UNIT - GAP
  return (
    <group>
      {/* Keycap body */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[w, KEY_H, KEY_D]} />
      </mesh>
      {/* Dish surface (slight inset on top face) */}
      <mesh position={[0, KEY_H / 2 + 0.005, 0]} material={topMat}>
        <boxGeometry args={[w * 0.85, 0.015, KEY_D * 0.85]} />
      </mesh>
    </group>
  )
}

// ── AccentKeyCap — owns its material instance so it can pulse independently
function AccentKeyCap({
  width,
  keyIndex,
  topMat,
}: {
  width: number
  keyIndex: number
  topMat: THREE.MeshStandardMaterial
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1C1C1E"),
        roughness: 0.88,
        metalness: 0.04,
        emissive: new THREE.Color("#3B6FE8"),
        emissiveIntensity: 0.08,
      }),
    []
  )
  const bodyRef = useRef<THREE.Mesh>(null)
  const w = width * UNIT - GAP

  useFrame(({ clock }) => {
    if (!bodyRef.current) return
    ;(bodyRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.08 + Math.sin(clock.elapsedTime * 1.8 + keyIndex * 1.2) * 0.07
  })

  return (
    <group>
      <mesh ref={bodyRef} material={mat} castShadow>
        <boxGeometry args={[w, KEY_H, KEY_D]} />
      </mesh>
      <mesh position={[0, KEY_H / 2 + 0.005, 0]} material={topMat}>
        <boxGeometry args={[w * 0.85, 0.015, KEY_D * 0.85]} />
      </mesh>
    </group>
  )
}

// ── KeyboardModel — assembles all keys + frame ────────────────────────────
function KeyboardModel() {
  const mats = useKeyboardMaterials()

  // Frame sized to wrap all rows with a small border
  const rowDepthStep = KEY_D + ROW_GAP
  const frameW = 15 * UNIT + 14 * GAP + 0.36
  const frameD = ROWS.length * rowDepthStep - ROW_GAP + 0.36

  return (
    <group rotation={[-0.35, 0, 0]}>
      {/* Keyboard base plate */}
      <mesh
        material={mats.frame}
        receiveShadow
        position={[0, -KEY_H / 2 - 0.10, 0]}
      >
        <boxGeometry args={[frameW, 0.16, frameD]} />
      </mesh>

      {/* All keys */}
      {KEY_LAYOUT.map((key) =>
        key.accent ? (
          <group key={key.id} position={[key.x, 0, key.z]}>
            <AccentKeyCap
              width={key.width}
              keyIndex={key.accentIdx}
              topMat={mats.top}
            />
          </group>
        ) : (
          <group key={key.id} position={[key.x, 0, key.z]}>
            <KeyCap width={key.width} bodyMat={mats.body} topMat={mats.top} />
          </group>
        )
      )}
    </group>
  )
}

// ── SceneLighting ─────────────────────────────────────────────────────────
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.08} />
      {/* Key light: warm white from upper-left */}
      <spotLight
        position={[-4, 6, 4]}
        angle={0.35}
        penumbra={0.7}
        intensity={4.5}
        color="#FFF8EE"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Rim light: cool blue from back-right */}
      <spotLight
        position={[5, 3, -3]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.8}
        color="#4477EE"
        castShadow={false}
      />
      {/* Fill: very soft from below-front */}
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#FFFFFF" />
    </>
  )
}

// ── CameraRig — mouse parallax applied to keyboard group rotation ──────────
function CameraRig({
  isMobile,
  children,
}: {
  isMobile: boolean
  children: ReactNode
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ pointer }) => {
    if (!groupRef.current || isMobile) return
    const targetY = pointer.x * 0.10
    const targetX = -pointer.y * 0.06
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04
  })

  return <group ref={groupRef}>{children}</group>
}

// ── KeyboardScene — canvas root, exported as default ──────────────────────
export default function KeyboardScene() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches

  return (
    <Canvas
      camera={{ fov: 40, position: [0, 2.4, 7], near: 0.1, far: 50 }}
      shadows
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneLighting />
      <CameraRig isMobile={isMobile}>
        <KeyboardModel />
      </CameraRig>
    </Canvas>
  )
}
```

- [ ] **Step 2: Visual verification — geometry + lighting**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- 60% keyboard layout visible in right column — 5 rows of dark keys
- Keyboard tilted ~20° toward viewer (number row at top/back, spacebar row at front)
- Warm key light from upper-left; cool blue rim from right/back
- ESC, Enter, and Space keys have a faint pulsing blue glow (subtle — not neon)
- Moving the mouse left/right tilts the keyboard slightly on Y axis

**If keyboard is too large** (clips too much): reduce `UNIT` from `0.42` to `0.38` and lower camera `position[2]` from `7` to `6.5`.  
**If keyboard is too small** (lost in the canvas): increase `UNIT` to `0.46` or reduce camera `position[2]` to `6`.  
**If accent glow is too strong**: reduce `emissiveIntensity` base from `0.08` to `0.04` in `AccentKeyCap.useMemo`.

- [ ] **Step 3: Commit**

```bash
git add components/three/KeyboardScene.tsx
git commit -m "feat: 60% keyboard geometry, PBR materials, dramatic lighting, mouse parallax"
```

---

### Task 5: Add entrance + idle float animations to KeyboardModel

**Files:**
- Modify: `components/three/KeyboardScene.tsx` (update `KeyboardModel` to animate on mount)

**Interfaces:**
- Consumes: `KeyboardModel` from Task 4
- Produces: `KeyboardModel` with entrance scale-in (1.2s) and idle float (continuous sine)

- [ ] **Step 1: Replace the KeyboardModel function**

Find the `function KeyboardModel()` block in `components/three/KeyboardScene.tsx` and replace it with this version that adds `startTime` ref and a `useFrame` for entrance + float:

```tsx
function KeyboardModel() {
  const mats = useKeyboardMaterials()
  const groupRef = useRef<THREE.Group>(null)
  // null until first frame — lets us compute elapsed relative to mount time
  const startTime = useRef<number | null>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    if (startTime.current === null) {
      startTime.current = clock.elapsedTime
    }

    const elapsed = clock.elapsedTime - startTime.current
    const t = Math.min(elapsed / 1.2, 1)
    const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic

    // Entrance: scale from 0.85 → 1.0, rise from -0.5 → 0
    groupRef.current.scale.setScalar(0.85 + eased * 0.15)

    if (t < 1) {
      groupRef.current.position.y = -0.5 + eased * 0.5
    } else {
      // Idle float: gentle sine oscillation after entrance completes
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.06
    }
  })

  const rowDepthStep = KEY_D + ROW_GAP
  const frameW = 15 * UNIT + 14 * GAP + 0.36
  const frameD = ROWS.length * rowDepthStep - ROW_GAP + 0.36

  return (
    <group ref={groupRef} rotation={[-0.35, 0, 0]}>
      <mesh
        material={mats.frame}
        receiveShadow
        position={[0, -KEY_H / 2 - 0.10, 0]}
      >
        <boxGeometry args={[frameW, 0.16, frameD]} />
      </mesh>

      {KEY_LAYOUT.map((key) =>
        key.accent ? (
          <group key={key.id} position={[key.x, 0, key.z]}>
            <AccentKeyCap
              width={key.width}
              keyIndex={key.accentIdx}
              topMat={mats.top}
            />
          </group>
        ) : (
          <group key={key.id} position={[key.x, 0, key.z]}>
            <KeyCap width={key.width} bodyMat={mats.body} topMat={mats.top} />
          </group>
        )
      )}
    </group>
  )
}
```

- [ ] **Step 2: Visual verification — entrance and float**

```bash
npm run dev
```

Open `http://localhost:3000`. Hard-refresh (`Ctrl+Shift+R`) to see the entrance. Expected:
- Keyboard scales up from slightly smaller (85%) to full size over ~1.2 seconds
- Keyboard rises slightly into position during the entrance
- After entrance completes, keyboard bobs up and down very subtly (nearly imperceptible, ~12s period)
- Accent key pulse continues independently of float

- [ ] **Step 3: Commit**

```bash
git add components/three/KeyboardScene.tsx
git commit -m "feat: keyboard entrance scale-in and idle float animation"
```

---

### Task 6: Remove dead CSS

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing
- Produces: `globals.css` without `.cursor-blink` or `.key-cap` rules

- [ ] **Step 1: Delete the terminal cursor block**

In `app/globals.css`, find and delete these exact lines:

```css
/* ── Terminal cursor ── */
@keyframes cursorBlink { 0%,100% { opacity:1; } 50% { opacity:0; } }
.cursor-blink { animation: cursorBlink 1s step-end infinite; }
```

- [ ] **Step 2: Delete the keycap block**

In `app/globals.css`, find and delete these exact lines:

```css
/* ── Keyboard key — physical dark keycap ── */
.key-cap {
  background: #1E1E1E;
  border: 1px solid #333333;
  box-shadow: 0 3px 0 #000, 0 4px 10px rgba(0,0,0,0.5);
  border-radius: 7px;
  color: rgba(255,255,255,0.5);
}
```

- [ ] **Step 3: Verify no visual regressions**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll through all page sections. Expected: nothing looks broken. These classes were only used by the deleted HeroSection components.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "chore: remove dead CSS for terminal cursor and floating keycap decorations"
```

---

## Self-Review Notes

**Spec coverage verified:**
- 60% keyboard layout with ESC/Enter/Space accent keys ✅ (Task 4)
- Matte keycaps + metallic frame PBR materials ✅ (Task 4)
- Key light + rim light + fill point light ✅ (Task 4)
- Mouse parallax via CameraRig ✅ (Task 4)
- Accent key emissive pulse with stagger ✅ (Task 4, `AccentKeyCap.useFrame`)
- Entrance scale + rise animation ✅ (Task 5)
- Idle float ✅ (Task 5)
- Two-column layout, left-aligned editorial typography ✅ (Task 2)
- Static stacked roles (not cycling) ✅ (Task 2)
- Premium pill CTAs with hover states ✅ (Task 2)
- Rewritten supporting copy ✅ (Task 2)
- Dynamic import `ssr: false` + loading placeholder ✅ (Task 3)
- Framer Motion canvas fade-in ✅ (Task 3)
- Mobile: parallax disabled on `pointer: coarse` ✅ (Task 4)
- `dpr={[1, 2]}` GPU cap ✅ (Task 4)
- Terminal removed ✅ (Task 2)
- Floating KeyboardKey decorations removed ✅ (Task 2)
- RoleCycler removed ✅ (Task 2)
- `.cursor-blink` CSS removed ✅ (Task 6)
- `.key-cap` CSS removed ✅ (Task 6)

**Future optimizations (out of scope for this plan):**
- InstancedMesh for standard keycaps (single draw call for ~58 keys) — applicable once basic implementation is validated
- Post-processing bloom/DoF via `@react-three/postprocessing`
- Device orientation API for mobile parallax
