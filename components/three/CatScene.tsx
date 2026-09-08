"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CatScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Colors ── */
    const C = {
      orange: 0xE8924A,
      light:  0xF2B480,
      cream:  0xF5D5AE,
      pink:   0xE8A0A0,
      dpink:  0xD06868,
      dark:   0x1A1714,
      ink:    0x0D0B09,
      white:  0xFCFCFA,
      stripe: 0xBF5B1F,
      belly:  0xFAF0E4,
    };

    /* ── Scene ── */
    const scene = new THREE.Scene();
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    scene.background = new THREE.Color(dark ? 0x111110 : 0xFAFAF8);

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const cam = new THREE.PerspectiveCamera(13, W / H, 0.1, 100);
    cam.position.set(0, 1.55, 12);
    cam.lookAt(0, 0.9, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(W, H, false);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    /* ── Box helper — mesh + inverted-hull outline ── */
    function b(
      w: number, h: number, d: number,
      color: number,
      x: number, y: number, z: number,
      parent: THREE.Object3D,
      ol = 1.09,
    ) {
      const geo  = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color }));
      mesh.position.set(x, y, z);
      if (ol > 0) {
        const outline = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({ color: C.ink, side: THREE.BackSide }),
        );
        outline.scale.setScalar(ol);
        mesh.add(outline);
      }
      parent.add(mesh);
      return mesh;
    }

    /* ── Cat root ── */
    const cat = new THREE.Group();
    scene.add(cat);

    /* ── Shadow (stays on ground during jump) ── */
    const shGeo = new THREE.CircleGeometry(0.52, 32);
    const shMat = new THREE.MeshBasicMaterial({ color: C.ink, transparent: true, opacity: 0.08 });
    const shadow = new THREE.Mesh(shGeo, shMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, 0.001, 0);
    scene.add(shadow);

    /* ── Body ── */
    b(0.82, 1.02, 0.65, C.orange, 0, 0.51, 0, cat, 1.08);
    b(0.40, 0.84, 0.04, C.belly,  0, 0.50, 0.345, cat, 0);

    /* flank stripes */
    b(0.04, 0.62, 0.13, C.stripe, -0.43, 0.53, -0.22, cat, 0);
    b(0.04, 0.50, 0.12, C.stripe, -0.43, 0.48, -0.05, cat, 0);
    b(0.04, 0.58, 0.12, C.stripe, -0.43, 0.52,  0.12, cat, 0);
    b(0.04, 0.44, 0.11, C.stripe, -0.43, 0.44,  0.26, cat, 0);
    b(0.04, 0.62, 0.13, C.stripe,  0.43, 0.53, -0.22, cat, 0);
    b(0.04, 0.50, 0.12, C.stripe,  0.43, 0.48, -0.05, cat, 0);
    b(0.04, 0.58, 0.12, C.stripe,  0.43, 0.52,  0.12, cat, 0);
    b(0.04, 0.44, 0.11, C.stripe,  0.43, 0.44,  0.26, cat, 0);
    /* back stripes */
    b(0.13, 0.60, 0.04, C.stripe, -0.22, 0.52, -0.345, cat, 0);
    b(0.12, 0.55, 0.04, C.stripe,     0, 0.50, -0.345, cat, 0);
    b(0.13, 0.60, 0.04, C.stripe,  0.22, 0.52, -0.345, cat, 0);
    /* spine */
    b(0.14, 0.04, 0.60, C.stripe, -0.16, 1.04, 0, cat, 0);
    b(0.14, 0.04, 0.60, C.stripe,  0.16, 1.04, 0, cat, 0);

    /* neck collar */
    b(0.70, 0.07, 0.04, C.stripe, 0,     1.00,  0.345, cat, 0);
    b(0.70, 0.07, 0.04, C.stripe, 0,     1.00, -0.345, cat, 0);
    b(0.04, 0.07, 0.60, C.stripe, -0.43, 1.00, 0,      cat, 0);
    b(0.04, 0.07, 0.60, C.stripe,  0.43, 1.00, 0,      cat, 0);

    /* right front paw (static) */
    b(0.27, 0.23, 0.34, C.light, 0.21, 0.115, 0.38,  cat, 1.09);
    b(0.24, 0.06, 0.04, C.cream, 0.21, 0.07,  0.555, cat, 0);

    /* ── Tail group ── */
    const tailG = new THREE.Group();
    tailG.position.set(0.3, 0.22, -0.28);
    tailG.rotation.z =  0.5;
    tailG.rotation.x = -0.22;
    cat.add(tailG);
    b(0.17, 0.72, 0.17, C.orange, 0, 0.36, 0, tailG, 1.10);
    ([0.22, 0.52] as number[]).forEach(ty => {
      b(0.20, 0.07, 0.04, C.stripe,  0,     ty,  0.10, tailG, 0);
      b(0.20, 0.07, 0.04, C.stripe,  0,     ty, -0.10, tailG, 0);
      b(0.04, 0.07, 0.20, C.stripe, -0.10,  ty,  0,    tailG, 0);
      b(0.04, 0.07, 0.20, C.stripe,  0.10,  ty,  0,    tailG, 0);
    });
    b(0.22, 0.23, 0.22, C.cream, 0, 0.83, 0, tailG, 1.08);

    /* ── Head group ── */
    const headG = new THREE.Group();
    headG.position.set(0, 1.28, 0.12);
    cat.add(headG);

    b(0.88, 0.88, 0.88, C.orange, 0, 0, 0, headG, 1.08);
    /* chin ring */
    b(0.58, 0.12, 0.06, C.cream,  0,     -0.40,  0.44, headG, 0);
    b(0.58, 0.12, 0.06, C.cream,  0,     -0.40, -0.44, headG, 0);
    b(0.06, 0.12, 0.76, C.cream, -0.44, -0.40,  0,     headG, 0);
    b(0.06, 0.12, 0.76, C.cream,  0.44, -0.40,  0,     headG, 0);
    /* head stripes */
    b(0.10, 0.04, 0.75, C.stripe, -0.22, 0.46, 0, headG, 0);
    b(0.10, 0.04, 0.75, C.stripe,     0, 0.46, 0, headG, 0);
    b(0.10, 0.04, 0.75, C.stripe,  0.22, 0.46, 0, headG, 0);
    b(0.70, 0.06, 0.04, C.stripe,  0,    0.22, 0.46, headG, 0);
    /* ears */
    b(0.23, 0.34, 0.17, C.orange, -0.25, 0.59, 0, headG, 1.09);
    b(0.23, 0.34, 0.17, C.orange,  0.25, 0.59, 0, headG, 1.09);
    b(0.14, 0.22, 0.07, C.pink,   -0.25, 0.59, 0.06, headG, 1.0);
    b(0.14, 0.22, 0.07, C.pink,    0.25, 0.59, 0.06, headG, 1.0);
    /* muzzle + nose */
    b(0.36, 0.24, 0.06, C.cream, 0, -0.10, 0.45, headG, 1.0);
    b(0.10, 0.09, 0.06, C.dpink, 0, -0.08, 0.47, headG, 0);
    /* eyes */
    b(0.21, 0.26, 0.06, C.dark, -0.2, 0.07, 0.46, headG, 0);
    b(0.21, 0.26, 0.06, C.dark,  0.2, 0.07, 0.46, headG, 0);
    /* white highlights — centered so tracking is symmetric */
    const mkHL = (x: number, y: number) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.07, 0.04),
        new THREE.MeshBasicMaterial({ color: C.white }),
      );
      m.position.set(x, y, 0.49);
      headG.add(m);
      return m;
    };
    const leftPupil  = mkHL(-0.20, 0.07);
    const rightPupil = mkHL( 0.20, 0.07);

    /* ── Left paw (animatable) ── */
    const PAW_REST = { x: -0.21, y: 0.115, z: 0.38 };
    const pawG = new THREE.Group();
    pawG.position.set(PAW_REST.x, PAW_REST.y, PAW_REST.z);
    cat.add(pawG);
    b(0.27, 0.23, 0.34, C.light, 0, 0,      0,    pawG, 1.09);
    b(0.24, 0.06, 0.04, C.cream, 0, -0.045, 0.20, pawG, 0);

    /* ── Mouse ── */
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      my = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMove);

    /* ── Animation state machine ── */
    const STATES = ["jump", "paw", "bonk"] as const;
    const DURS   = { jump: 55, paw: 50, bonk: 48 };
    let animState = 0;
    let animT     = -1;
    const onClick = () => { if (animT < 0) animT = 0; };
    canvas.addEventListener("click", onClick);

    const lerp = (a: number, b: number, v: number) => a + (b - a) * v;
    let t = 0;
    let rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      t++;

      const idle = animT < 0;
      if (idle) {
        cat.scale.y    = 1 + Math.sin(t * 0.028) * 0.013;
        cat.rotation.z = Math.sin(t * 0.017) * 0.014;
      }
      tailG.rotation.z = 0.5 + Math.sin(t * 0.048) * 0.28;

      /* pupil tracking — symmetric ±travel from center */
      const eX = mx * 0.045;
      const eY = my * 0.030;
      leftPupil.position.x  = -0.20 + eX;
      leftPupil.position.y  =  0.07 + eY;
      rightPupil.position.x =  0.20 + eX;
      rightPupil.position.y =  0.07 + eY;

      if (idle) { shadow.scale.setScalar(1); shMat.opacity = 0.08; }

      if (animT >= 0) {
        const key = STATES[animState];
        const dur = DURS[key];
        const p   = animT / dur;

        if (key === "jump") {
          const arc = Math.sin(Math.PI * p);
          cat.position.y = arc * 0.75;
          cat.rotation.z = arc * 0.13;
          cat.scale.y    = 1 + arc * 0.04;
          shadow.scale.setScalar(1 - arc * 0.38);
          shMat.opacity = 0.08 * (1 - arc * 0.75);
        }

        if (key === "paw") {
          if (p < 0.20) {
            const pp = p / 0.20;
            pawG.position.set(PAW_REST.x, PAW_REST.y + pp * 0.42, PAW_REST.z + pp * 0.10);
            pawG.rotation.z = pp * 0.55;
          } else if (p < 0.52) {
            const pp = (p - 0.20) / 0.32;
            pawG.position.set(PAW_REST.x - pp * 0.46, PAW_REST.y + 0.42 - pp * 0.52, PAW_REST.z + 0.10 + pp * 0.26);
            pawG.rotation.z = 0.55 - pp * 1.25;
          } else {
            const pp  = (p - 0.52) / 0.48;
            const ease = 1 - Math.pow(1 - pp, 3);
            pawG.position.set(
              lerp(PAW_REST.x - 0.46, PAW_REST.x, ease),
              lerp(PAW_REST.y - 0.10, PAW_REST.y, ease),
              lerp(PAW_REST.z + 0.36, PAW_REST.z, ease),
            );
            pawG.rotation.z = lerp(-0.70, 0, ease);
          }
          headG.rotation.x = Math.sin(p * Math.PI) * (-0.25);
          headG.rotation.y = Math.sin(p * Math.PI * 2) * 0.08;
        }

        if (key === "bonk") {
          if (p < 0.25) {
            const ease = 1 - Math.pow(1 - p / 0.25, 2);
            headG.rotation.x = ease * (-0.55);
            cat.rotation.x   = ease * 0.09;
          } else {
            const ease = 1 - Math.pow(1 - (p - 0.25) / 0.75, 2);
            headG.rotation.x = lerp(-0.55, 0, ease);
            cat.rotation.x   = lerp(0.09,  0, ease);
          }
        }

        animT++;
        if (animT >= dur) {
          animT = -1;
          cat.position.y = 0;
          cat.rotation.set(0, 0, 0);
          cat.scale.setScalar(1);
          headG.rotation.set(0, 0, 0);
          pawG.position.set(PAW_REST.x, PAW_REST.y, PAW_REST.z);
          pawG.rotation.set(0, 0, 0);
          shadow.scale.setScalar(1);
          shMat.opacity = 0.08;
          animState = (animState + 1) % STATES.length;
        }
      }

      renderer.render(scene, cam);
    }
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const nW = canvas.clientWidth;
      const nH = canvas.clientHeight;
      cam.aspect = nW / nH;
      cam.updateProjectionMatrix();
      renderer.setSize(nW, nH, false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair" }}
    />
  );
}
