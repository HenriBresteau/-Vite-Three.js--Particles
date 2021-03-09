import {
  AxesHelper,
  BoxBufferGeometry,
  BufferGeometry,
  Clock,
  Float32BufferAttribute,
  Group,
  MathUtils,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  VertexColors,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

const textureLoader = new TextureLoader();
const circletTexture = textureLoader.load("./disc.png");
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
const colors = new Float32Array(count * 3);
for (let index = 0; index < points.length; index++) {
  points[index] = MathUtils.randFloatSpread(distance * 2);
  colors[index] = Math.random() * 0.5 + 0.5;
}
const geometry = new BufferGeometry();
geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
const pointMaterail = new PointsMaterial({
  vertexColors: VertexColors,
  size: 0.1,
  map: circletTexture,
  alphaTest: 0.01,
  transparent: true,
});
const pointsObject = new Points(geometry, pointMaterail);
scene.add(pointsObject);

const group = new Group();
group.add(pointsObject);
scene.add(group);

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.clearColor(0x00000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new Clock();
let mouseX = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});

function tick() {
  const time = clock.getElapsedTime();
  // group.rotation.y = time * 0.1;
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
  const ratio = (mouseX / window.innerWidth - 0.5) * 2;
  group.rotation.y = ratio + Math.PI * 0.01;
}
tick();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
