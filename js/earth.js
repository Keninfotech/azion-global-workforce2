(function () {
  const mount = document.getElementById("earth-canvas");
  if (!mount || typeof THREE === "undefined") return;
  try {
    const test = document.createElement("canvas");
    if (!test.getContext("webgl") && !test.getContext("experimental-webgl")) {
      mount.innerHTML = '<div style="color:#fff;padding:2rem;text-align:center;">WebGL not available</div>';
      return;
    }
  } catch (_) { return; }

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

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xd9ebff, 1.15); key.position.set(5, 3, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fd3ff, 1.0); rim.position.set(-5, -2, -3); scene.add(rim);
  const fill = new THREE.PointLight(0x1e6bff, 0.8, 10); fill.position.set(0, 1, 2.8); scene.add(fill);

  const EARTH_R = 1;
  const loader = new THREE.TextureLoader();
  loader.crossOrigin = "anonymous";
  const earthTex = loader.load("https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg");
  const bumpTex = loader.load("https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png");

  const earthMat = new THREE.MeshPhongMaterial({ map: earthTex, bumpMap: bumpTex, bumpScale: 0.035, shininess: 20, specular: new THREE.Color(0x9fd6ff) });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 64, 64), earthMat);
  earth.rotation.z = (23.5 * Math.PI) / 180;
  scene.add(earth);

  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: { c: { value: new THREE.Color(0x6fd3ff) } },
    vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vN; uniform vec3 c; void main(){ float i = pow(0.68 - dot(vN, vec3(0.,0.,1.)), 2.2); gl_FragColor = vec4(c, 1.0) * i; }`
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_R * 1.09, 64, 64), atmoMat));

  function latLngToVec3(lat, lng, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  }

  const A = latLngToVec3(12.9716, 77.5946, EARTH_R * 1.005);
  const B = latLngToVec3(32.0853, 34.7818, EARTH_R * 1.005);
  const mid = A.clone().add(B).multiplyScalar(0.5);
  const control = mid.clone().normalize().multiplyScalar(EARTH_R * (1 + A.distanceTo(B) * 0.55));
  const curve = new THREE.QuadraticBezierCurve3(A, control, B);

  earth.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.007, 12, false), new THREE.MeshBasicMaterial({ color: 0x6fd3ff, transparent: true, opacity: 0.96, blending: THREE.AdditiveBlending })));
  earth.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.02, 12, false), new THREE.MeshBasicMaterial({ color: 0x1e6bff, transparent: true, opacity: 0.38, blending: THREE.AdditiveBlending })));

  function marker(pos, color) {
    const g = new THREE.Group();
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 16), new THREE.MeshBasicMaterial({ color }));
    dot.position.copy(pos);
    const ringMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.025, 0.03, 32), ringMat);
    ring.position.copy(pos); ring.lookAt(0, 0, 0);
    g.add(dot, ring); g.userData = { ring, ringMat }; return g;
  }

  const mA = marker(A, 0x6fd3ff); const mB = marker(B, 0x1e6bff);
  earth.add(mA); earth.add(mB);
  const traveler = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  earth.add(traveler);
  earth.rotation.y = -((56 + 180) * Math.PI) / 180 + Math.PI;

  let paused = false;
  mount.addEventListener("mouseenter", () => (paused = true));
  mount.addEventListener("mouseleave", () => (paused = false));
  window.addEventListener("resize", () => { camera.aspect = width() / height(); camera.updateProjectionMatrix(); renderer.setSize(width(), height()); });

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const t = clock.getElapsedTime();
    if (!paused) earth.rotation.y += dt * 0.24;
    const pulse = (t % 2) / 2;
    [mA, mB].forEach((m) => { const s = 1 + pulse * 2.2; m.userData.ring.scale.set(s, s, s); m.userData.ringMat.opacity = 0.9 * (1 - pulse); });
    traveler.position.copy(curve.getPointAt((t % 3) / 3));
    renderer.render(scene, camera);
  })();
})();
