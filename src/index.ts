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
import {
  disableTouchEvent,
  disableOuterCanvasTouchEvent,
} from "disableTouchEvent";
import { getWindowSizeAsync } from "getWindowSizeAsync";

async function mainProgram() {
  let renderer: WebGLRenderer;
  let scene: Scene;
  let camera: Camera;
  let mesh: Mesh;

  // setup
  const setupThree = (size: { width: number; height: number }) => {
    // renderer
    renderer = new WebGLRenderer();
    renderer.setSize(size.width, size.height);
    disableTouchEvent(renderer.domElement);
    document.body.appendChild(renderer.domElement);

    // touch event activate
    renderer.domElement.addEventListener("touchstart", () =>
      material.color.set("#00FF00")
    );
    renderer.domElement.addEventListener("touchmove", () =>
      material.color.set("#00FF00")
    );
    renderer.domElement.addEventListener("touchend", () =>
      material.color.set("#FF0000")
    );
    renderer.domElement.addEventListener("touchcancel", () =>
      material.color.set("#FF0000")
    );

    // scene
    scene = new Scene();

    // camera
    camera = new PerspectiveCamera(45, size.width / size.height, 1, 10000);
    camera.position.set(0, 0, 1000);

    // light
    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    // mesh
    const geometry = new BoxGeometry(250, 250, 250);
    const material = new MeshPhongMaterial({ color: 0xff0000 });
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

  disableOuterCanvasTouchEvent();
  setupThree(await getWindowSizeAsync());
  mainLoop();
}

window.addEventListener("DOMContentLoaded", mainProgram);
