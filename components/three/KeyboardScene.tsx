"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Constants ───────────────────────────────────────────────────────────────
const U   = 0.19;   // three.js units per key "unit"
const GAP = 0.010;  // gap between keycaps
const KH  = 0.048;  // keycap height
const PH  = 0.055;  // keyboard plate thickness
const BZ  = 0.12;   // bezel (keyboard body margin around keys)

// ── Key layout data ─────────────────────────────────────────────────────────
// [x_offset_in_units, width_in_units, material_index]
// 0 = base keycap (dark gray)
// 1 = accent keycap (brand blue: WASD + Space)
// 2 = modifier keycap (darkest)
type K = [number, number, 0 | 1 | 2];

// Standard 60% ANSI layout — total width per row = 15u
const ROWS: K[][] = [
  // ── Number row ──────────────────────────────────────────────────────────
  [[0,1,2],[1,1,0],[2,1,0],[3,1,0],[4,1,0],[5,1,0],
   [6,1,0],[7,1,0],[8,1,0],[9,1,0],[10,1,0],[11,1,0],[12,1,0],[13,2,2]],
  // ── QWERTY row — W accented ─────────────────────────────────────────────
  [[0,1.5,2],[1.5,1,0],[2.5,1,1],[3.5,1,0],[4.5,1,0],[5.5,1,0],
   [6.5,1,0],[7.5,1,0],[8.5,1,0],[9.5,1,0],[10.5,1,0],[11.5,1,0],[12.5,1,0],[13.5,1.5,2]],
  // ── Home row — A S D accented ───────────────────────────────────────────
  [[0,1.75,2],[1.75,1,1],[2.75,1,1],[3.75,1,1],[4.75,1,0],[5.75,1,0],
   [6.75,1,0],[7.75,1,0],[8.75,1,0],[9.75,1,0],[10.75,1,0],[11.75,1,0],[12.75,2.25,2]],
  // ── ZXCV row ────────────────────────────────────────────────────────────
  [[0,2.25,2],[2.25,1,0],[3.25,1,0],[4.25,1,0],[5.25,1,0],[6.25,1,0],
   [7.25,1,0],[8.25,1,0],[9.25,1,0],[10.25,1,0],[11.25,1,0],[12.25,2.75,2]],
  // ── Bottom modifiers — Space accented ───────────────────────────────────
  [[0,1.25,2],[1.25,1.25,2],[2.5,1.25,2],[3.75,6.25,1],[10,1.25,2],[11.25,1.25,2],[12.5,2.5,2]],
];

// ── Build keyboard geometry ─────────────────────────────────────────────────
function buildKeyboard(): THREE.Group {
  const group = new THREE.Group();

  // Materials — MeshPhysicalMaterial for clearcoat glossy-plastic look
  const matBase = new THREE.MeshPhysicalMaterial({
    color: 0x26262e, roughness: 0.55, metalness: 0.02,
    clearcoat: 0.85, clearcoatRoughness: 0.18,
  });
  const matAccent = new THREE.MeshPhysicalMaterial({
    color: 0x3b6fe8, roughness: 0.45, metalness: 0.05,
    clearcoat: 0.95, clearcoatRoughness: 0.10,
    emissive: new THREE.Color(0x1a3580), emissiveIntensity: 0.08,
  });
  const matMod = new THREE.MeshPhysicalMaterial({
    color: 0x1c1c24, roughness: 0.65, metalness: 0.0,
    clearcoat: 0.5, clearcoatRoughness: 0.35,
  });
  const matPlate = new THREE.MeshPhysicalMaterial({
    color: 0x0d0d12, roughness: 0.25, metalness: 0.75,
  });

  const MATS = [matBase, matAccent, matMod] as const;

  const boardW = 15 * U + BZ * 2;
  const boardD =  5 * U + BZ * 2;

  // Keyboard body / plate
  const plate = new THREE.Mesh(new THREE.BoxGeometry(boardW, PH, boardD), matPlate);
  plate.receiveShadow = true;
  group.add(plate);

  // Keycaps
  ROWS.forEach((row, rowIdx) => {
    // z increases downward in layout, map to -Z (front) to +Z (back)
    const z = (rowIdx - 2) * U; // center rows at z=0

    row.forEach(([x, w, flag]) => {
      const cx = (x + w / 2) * U - (15 * U) / 2; // center at x=0
      const cw = w * U - GAP;
      const cd = U - GAP;

      const geo = new THREE.BoxGeometry(cw, KH, cd);
      const mesh = new THREE.Mesh(geo, MATS[flag]);
      mesh.position.set(cx, PH / 2 + KH / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      group.add(mesh);
    });
  });

  return group;
}

// ── Component ───────────────────────────────────────────────────────────────
export default function KeyboardScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── Camera ───────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 50);
    camera.position.set(0.4, 3.8, 5.2);
    camera.lookAt(0, 0, 0);

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Lighting — 3-point product studio setup ──────────────────────────
    // Ambient (low, keeps shadows from going pitch black)
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    // Key light — warm, upper-right-front
    const keyLight = new THREE.SpotLight(0xfff5e8, 6.0, 20, Math.PI / 5, 0.3, 1.5);
    keyLight.position.set(4, 7, 3);
    keyLight.target.position.set(0, 0, 0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    scene.add(keyLight.target);

    // Fill light — cool blue, upper-left (softens shadows)
    const fillLight = new THREE.DirectionalLight(0x6080ff, 0.5);
    fillLight.position.set(-4, 4, 2);
    scene.add(fillLight);

    // Rim light — from behind, highlights keyboard edge
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 2, -6);
    scene.add(rimLight);

    // ── Keyboard ─────────────────────────────────────────────────────────
    const kb = buildKeyboard();
    // Tilt to show the top surface (product-shot angle)
    kb.rotation.x = -Math.PI / 8;
    scene.add(kb);

    // ── Mouse parallax state ─────────────────────────────────────────────
    const target = { rx: -Math.PI / 8, ry: 0.12 };
    const current = { rx: -Math.PI / 8, ry: 0.12 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      target.ry = 0.12 + nx * 0.18;
      target.rx = -Math.PI / 8 + ny * 0.08;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ───────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ───────────────────────────────────────────────────
    let raf: number;
    let startMs = 0;

    const animate = (ms: number) => {
      raf = requestAnimationFrame(animate);
      if (!startMs) startMs = ms;
      const t = (ms - startMs) / 1000; // seconds since mount

      // Entrance: scale + rise over 1.2 s (ease-out cubic)
      const enterP = Math.min(t / 1.2, 1);
      const ease = 1 - Math.pow(1 - enterP, 3);
      const scale = 0.82 + 0.18 * ease;
      const rise  = -0.6 + 0.6 * ease;

      // Idle float — subtle sin wave after entrance completes
      const float = Math.sin(t * 0.55) * 0.055;

      kb.scale.setScalar(scale);
      kb.position.y = rise + float;

      // Parallax — smooth LERP toward mouse target
      current.rx += (target.rx - current.rx) * 0.07;
      current.ry += (target.ry - current.ry) * 0.07;
      kb.rotation.x = current.rx;
      kb.rotation.y = current.ry;

      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
