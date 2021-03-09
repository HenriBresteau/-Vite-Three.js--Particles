import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import "./style.css";

const scene = new Scene();

scene.add(new AxesHelper());
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.z = 2;
scene.add(camera);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
