import {
  Camera,
  Mesh,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  BoxGeometry,
  MeshPhongMaterial,
} from "three";

const mainProgram = () => {
  let renderer: WebGLRenderer;
  let scene: Scene;
  let camera: Camera;
  let mesh: Mesh;

  // setup
  const setup = () => {
    // renderer
    renderer = new WebGLRenderer();
    renderer.setSize(640, 1136);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new Scene();

    // camera
    camera = new PerspectiveCamera(45, 640 / 1136, 1, 10000);
    camera.position.set(0, 0, 1000);

    // light
    const light = new DirectionalLight(0xFFFFFF);
    light.position.set(1, 1, 1);
    scene.add(light);

    // mesh
    const geometry = new BoxGeometry(250, 250, 250);
    const material = new MeshPhongMaterial({color: 0xFF0000});
    mesh = new Mesh(geometry, material);
    mesh.position.z = -5;
    scene.add(mesh);
  };

  // main loop
  const mainLoop = () => {
    window.requestAnimationFrame(mainLoop);

    mesh!.rotation.x += 0.05;
    mesh!.rotation.y += 0.05;

    renderer.render(scene!, camera!);
  };

  setup();
  mainLoop();
};

window.addEventListener("DOMContentLoaded", mainProgram);
