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

async function mainProgram() {
  let renderer: WebGLRenderer;
  let scene: Scene;
  let camera: Camera;
  let mesh: Mesh;

  // setup
  const setup = (width: number, height: number) => {
    // renderer
    renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    setDisableTouchEvent(renderer.domElement);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new Scene();

    // camera
    camera = new PerspectiveCamera(45, width / height, 1, 10000);
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

  disableEventForOuterCanvas();

  const size = await getWindowSizeAsync();
  setup(size.width, size.height);
  mainLoop();
};

async function getWindowSizeAsync(): Promise<{width: number, height: number}> {
  return new Promise(resolve => {
    const timer_id = window.setInterval(() => {
      if (!!window.innerWidth && !!window.innerHeight) {
        window.clearInterval(timer_id);

        resolve({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 100);
  });
}

function setDisableTouchEvent(dom: HTMLElement) {
  const disableEventFunc = (e?: Event) => {
    if (!e) {
      return false;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    return false;
  };

  dom.addEventListener("touchstart", disableEventFunc);
  dom.addEventListener("touchmove", disableEventFunc);
  dom.addEventListener("touchend", disableEventFunc);
  dom.addEventListener("pointerdown", disableEventFunc);
  dom.addEventListener("pointerup", disableEventFunc);
  dom.addEventListener("wheel", disableEventFunc);
}

function disableEventForOuterCanvas() {
  const div = window.document.createElement("div");
  div.style.left = "0px";
  div.style.top = "0px";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.position = "fixed";
  div.style.zIndex = "-1000";
  setDisableTouchEvent(div);
  window.document.body.appendChild(div);
}

window.addEventListener("DOMContentLoaded", mainProgram);
