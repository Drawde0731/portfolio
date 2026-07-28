"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function KeyboardScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 50);
    camera.position.set(0, 2.4, 7);

    // Scene
    const scene = new THREE.Scene();

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const point = new THREE.PointLight(0xffffff, 2);
    point.position.set(5, 5, 5);
    scene.add(point);

    // Rotating cube (placeholder — Task 4 replaces with keyboard geometry)
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x3b6fe8, roughness: 0.4, metalness: 0.6 }),
    );
    scene.add(mesh);

    // Animation loop
    let raf: number;
    let startMs = 0;
    const animate = (ms: number) => {
      raf = requestAnimationFrame(animate);
      if (!startMs) startMs = ms;
      const t = (ms - startMs) / 1000;
      mesh.rotation.y = t * 0.4;
      mesh.rotation.x = t * 0.2;
      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    // Resize
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
