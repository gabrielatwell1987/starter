import * as THREE from "three";
import "./style.css";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Mouse
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / window.innerWidth - 0.5);
  cursor.y = event.clientY / window.innerHeight - 0.5;
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// // GSAP
// const tl = gsap.timeline();
// tl.to(mesh.rotation, { duration: 1, y: Math.PI / 2 });
// tl.to(mesh.rotation, { duration: 1, x: Math.PI / 2 });
// tl.to(mesh.rotation, { duration: 1, y: -(Math.PI / 2) });
// tl.to(mesh.rotation, { duration: 1, x: -(Math.PI / 2) });

// Animate
const tick = () => {
  // Update controls
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();
