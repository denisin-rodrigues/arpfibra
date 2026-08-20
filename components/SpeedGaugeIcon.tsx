"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Ícone 3D experimental (Three.js) para o card "Teste de velocidade" —
   mostrador circular completo, ponteiro, marcações e linhas de
   velocidade, seguindo a referência do usuário. */
export default function SpeedGaugeIcon({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth || 56;
    const height = mount.clientHeight || 56;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20);
    camera.position.set(0, 0, 4.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.PointLight(0xff9a5c, 7, 20);
    key.position.set(1.8, 1.6, 3);
    scene.add(key);
    const rim = new THREE.PointLight(0xffe9d6, 3, 20);
    rim.position.set(-1.6, -1, 2.5);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => {
      disposables.push(o);
      return o;
    };

    // Mostrador — anel circular completo, vidro fosco quente
    const dialGeometry = track(new THREE.TorusGeometry(1, 0.1, 28, 64));
    const dialMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xff5a1e,
        emissive: 0xff5a1e,
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.3,
      })
    );
    group.add(new THREE.Mesh(dialGeometry, dialMaterial));

    // Sem preenchimento no centro — vazado, como um painel de velocímetro
    // real (só o anel, as marcações e o ponteiro flutuando por cima).

    // Marcações de graduação ao redor do mostrador
    const tickGeometry = track(new THREE.BoxGeometry(0.035, 0.16, 0.035));
    const tickMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xff7d43,
        emissive: 0xff5a1e,
        emissiveIntensity: 0.5,
        metalness: 0.2,
        roughness: 0.3,
      })
    );
    const tickCount = 12;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const tick = new THREE.Mesh(tickGeometry, tickMaterial);
      tick.position.set(Math.cos(angle) * 0.92, Math.sin(angle) * 0.92, 0.02);
      tick.rotation.z = angle - Math.PI / 2;
      group.add(tick);
    }

    // Ponteiro — gira em torno do pivô central, sentido horário. O cone
    // aponta para +Y por padrão, então o pivô (não o cone) é rotacionado.
    const needleLength = 0.82;
    const needleGeometry = track(new THREE.ConeGeometry(0.065, needleLength, 16));
    const needleMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xff5a1e,
        emissive: 0xff5a1e,
        emissiveIntensity: 0.9,
        metalness: 0.15,
        roughness: 0.25,
      })
    );
    const needle = new THREE.Mesh(needleGeometry, needleMaterial);
    needle.position.set(0, needleLength / 2, 0.05);

    const needlePivot = new THREE.Group();
    const needleStartRotation = Math.PI / 4; // começa apontando a ~135°
    needlePivot.rotation.z = needleStartRotation;
    needlePivot.add(needle);
    group.add(needlePivot);

    // Pivô central
    const pivotGeometry = track(new THREE.SphereGeometry(0.11, 24, 24));
    const pivotMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xff7d43,
        emissive: 0xff5a1e,
        emissiveIntensity: 0.8,
        metalness: 0.4,
        roughness: 0.2,
      })
    );
    const pivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
    pivot.position.z = 0.06;
    group.add(pivot);

    // Linhas de velocidade à esquerda do mostrador
    const speedLineMaterial = track(
      new THREE.MeshBasicMaterial({ color: 0xffb37a, transparent: true, opacity: 0.7 })
    );
    const speedLineLengths = [0.42, 0.3, 0.2];
    const speedLines: THREE.Mesh[] = [];
    speedLineLengths.forEach((len, i) => {
      const geo = track(new THREE.BoxGeometry(len, 0.045, 0.02));
      const line = new THREE.Mesh(geo, speedLineMaterial);
      line.position.set(-1.35 - len / 2, 0.32 - i * 0.28, 0);
      group.add(line);
      speedLines.push(line);
    });

    // Partículas espalhadas
    const particleCount = 20;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.05 + Math.random() * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    const particleGeometry = track(new THREE.BufferGeometry());
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = track(
      new THREE.PointsMaterial({
        color: 0xffcaa3,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      })
    );
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    group.scale.setScalar(0.92);

    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;

    const renderOnce = () => renderer.render(scene, camera);

    // Balanço sutil — mantém o mostrador de frente, sem girar a ponto de
    // perder a leitura do velocímetro.
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.5) * 0.12;
      group.rotation.x = Math.sin(t * 0.35) * 0.06;
      particles.rotation.z = t * 0.08;
      renderer.render(scene, camera);
      if (visible) frameId = requestAnimationFrame(animate);
    };

    if (reduce) {
      renderOnce();
    } else {
      frameId = requestAnimationFrame(animate);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting && !document.hidden;
          if (visible && !reduce && !frameId) frameId = requestAnimationFrame(animate);
        });
      },
      { threshold: 0.1 }
    );
    io.observe(mount);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduce && !frameId) frameId = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
