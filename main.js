import {
  AxesHelper,
  BoxBufferGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

const textureLoader = new TextureLoader();
const circletTexture = textureLoader.load("./circle.png");
const scene = new Scene();
const count = 100;
const distance = 2;

scene.add(new AxesHelper());
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const points = new Float32Array(count * 3);
for (let index = 0; index < points.length; index++) {
  points[index] = MathUtils.randFloatSpread(distance * 2);
}
const geometry = new BufferGeometry();
geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
const pointMaterail = new PointsMaterial({
  color: 0xff0000,
  size: 0.5,
  map: circletTexture,
  alphaTest: 0.01,
  transparent:true,
});
const pointsObject = new Points(geometry, pointMaterail);
scene.add(pointsObject);

const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function tick() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
}
tick();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
