/* AZION — Spinning Earth with India → Israel arc
 * Requires THREE (loaded via CDN in index.html)
 */
(function () {
  const mount = document.getElementById("earth-canvas");
  if (!mount || typeof THREE === "undefined") return;

  // ---- Fallback if WebGL unsupported ----
  try {
    const test = document.createElement("canvas");
    if (!test.getContext("webgl") && !test.getContext("experimental-webgl")) {
      mount.innerHTML = '<div style="color:#fff;padding:2rem;text-align:center;">WebGL not available</div>';
      return;
    }
  } catch (e) { return; }

  const width = () => mount.clientWidth;
  const height = () => mount.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width() / height(), 0.1, 1000);
  camera.position.set(0, 0, 3.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width(), height());
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  // ---- Lights ----
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(5, 3, 5);
  scene.add(dir);
  const rim = new THREE.DirectionalLight(0x2d7ff9, 0.6);
  rim.position.set(-5, -2, -3);
  scene.add(rim);

  // ---- Earth ----
  const EARTH_R = 1;
  const loader = new THREE.TextureLoader();
  loader.crossOrigin = "anonymous";
  const earthTex = loader.load(
    "https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg"
  );
  const bumpTex = loader.load(
    "https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png"
  );

  const earthMat = new THREE.MeshPhongMaterial({
    map: earthTex,
    bumpMap: bumpTex,
    bumpScale: 0.03,
    shininess: 12,
    specular: new THREE.Color(0x223355),
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 64, 64), earthMat);
  earth.rotation.z = (23.5 * Math.PI) / 180;
  scene.add(earth);

  // ---- Atmosphere glow ----
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: { c: { value: new THREE.Color(0x2d7ff9) } },
    vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vN; uniform vec3 c; void main(){ float i = pow(0.65 - dot(vN, vec3(0.,0.,1.)), 2.0); gl_FragColor = vec4(c, 1.0) * i; }`,
  });
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R * 1.09, 64, 64), atmoMat);
  scene.add(atmo);

  // ---- Convert lat/lng to 3D on the sphere ----
  function latLngToVec3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Cities
  const BANGALORE = { lat: 12.9716, lng: 77.5946, name: "Bangalore" };
  const TELAVIV = { lat: 32.0853, lng: 34.7818, name: "Tel Aviv" };

  const pA = latLngToVec3(BANGALORE.lat, BANGALORE.lng, EARTH_R * 1.005);
  const pB = latLngToVec3(TELAVIV.lat, TELAVIV.lng, EARTH_R * 1.005);

  // Curved arc via quadratic bezier lifted along the midpoint normal
  const mid = pA.clone().add(pB).multiplyScalar(0.5);
  const distance = pA.distanceTo(pB);
  const lift = 1 + distance * 0.55; // arc height
  const control = mid.clone().normalize().multiplyScalar(EARTH_R * lift);
  const curve = new THREE.QuadraticBezierCurve3(pA, control, pB);

  // Tube geometry for the arc (glowing)
  const tubeGeom = new THREE.TubeGeometry(curve, 80, 0.006, 12, false);
  const tubeMat = new THREE.MeshBasicMaterial({
    color: 0xf7941d,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
  });
  const arc = new THREE.Mesh(tubeGeom, tubeMat);
  earth.add(arc);

  // Softer outer glow tube
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x2d7ff9,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
  });
  const arcGlow = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.018, 12, false), glowMat);
  earth.add(arcGlow);

  // ---- City markers ----
  function marker(pos, color) {
    const g = new THREE.Group();
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 16, 16),
      new THREE.MeshBasicMaterial({ color })
    );
    dot.position.copy(pos);
    g.add(dot);

    const ringGeom = new THREE.RingGeometry(0.025, 0.03, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color, side: THREE.DoubleSide, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.copy(pos);
    ring.lookAt(0, 0, 0);
    g.add(ring);
    g.userData.ring = ring;
    g.userData.ringMat = ringMat;
    return g;
  }
  const mA = marker(pA, 0x2d7ff9); earth.add(mA);
  const mB = marker(pB, 0xf7941d); earth.add(mB);

  // Travelling dot along the curve
  const traveler = new THREE.Mesh(
    new THREE.SphereGeometry(0.022, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  earth.add(traveler);

  // ---- Rotate earth so the arc region faces the camera at start ----
  // Point roughly at the midpoint longitude between Bangalore (77.6) and Tel Aviv (34.8) => ~56°E
  earth.rotation.y = -((56 + 180) * Math.PI) / 180 + Math.PI;

  // ---- Interaction ----
  let paused = false;
  mount.addEventListener("mouseenter", () => (paused = true));
  mount.addEventListener("mouseleave", () => (paused = false));

  window.addEventListener("resize", () => {
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
    renderer.setSize(width(), height());
  });

  // ---- Animate ----
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const t = clock.getElapsedTime();

    if (!paused) earth.rotation.y += dt * 0.25;

    // pulse rings
    const pulse = (t % 2) / 2; // 0..1
    [mA, mB].forEach((m) => {
      const s = 1 + pulse * 2.2;
      m.userData.ring.scale.set(s, s, s);
      m.userData.ringMat.opacity = 0.9 * (1 - pulse);
    });

    // traveler moves along curve
    const tt = (t % 3) / 3;
    const p = curve.getPointAt(tt);
    traveler.position.copy(p);

    renderer.render(scene, camera);
  }
  animate();
})();
