import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';

type AvatarSceneCallbacks = {
  onProgress?: (percent: number) => void;
  onReady?: () => void;
  onError?: (error: unknown) => void;
};

const MODEL_TARGET = new THREE.Vector3(0, 1, 0);
const CROSS_FADE_DURATION = 0.3;

const ZOOM = {
  enabled: true,
  minDistance: 4.0,
  maxDistance: 4.5,
  speed: 0.8,
} as const;

export class AvatarScene {
  private readonly container: HTMLElement;
  private readonly callbacks: AvatarSceneCallbacks;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly clock: THREE.Clock;
  private readonly raycaster: THREE.Raycaster;
  private readonly pointer: THREE.Vector2;
  private readonly resizeObserver: ResizeObserver;

  private avatar: THREE.Object3D | null = null;
  private mixer: THREE.AnimationMixer | null = null;
  private idleAction: THREE.AnimationAction | null = null;
  private wavingAction: THREE.AnimationAction | null = null;
  private stumbleAction: THREE.AnimationAction | null = null;
  private wavingDuration = 0;
  private stumbleDuration = 0;
  private frameId = 0;
  private timerId = 0;
  private busy = false;
  private disposed = false;

  constructor(container: HTMLElement, modelUrl: string, callbacks: AvatarSceneCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.className = 'block h-full w-full touch-none';
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, this.getAspect(), 0.1, 100);
    this.camera.position.set(0.15, 1.55, 3.35);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.enableZoom = ZOOM.enabled;
    this.controls.minDistance = ZOOM.minDistance;
    this.controls.maxDistance = ZOOM.maxDistance;
    this.controls.zoomSpeed = ZOOM.speed;
    this.controls.minPolarAngle = 1.4;
    this.controls.maxPolarAngle = 1.4;
    this.controls.target.copy(MODEL_TARGET);
    this.controls.update();

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.addLighting();
    this.addPedestal();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.container.addEventListener('dblclick', this.handleDoubleClick);
    this.container.addEventListener('pointerenter', this.handlePointerEnter);

    this.resize();
    this.animate();
    this.load(modelUrl);
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    window.clearTimeout(this.timerId);
    this.resizeObserver.disconnect();
    this.container.removeEventListener('dblclick', this.handleDoubleClick);
    this.container.removeEventListener('pointerenter', this.handlePointerEnter);
    this.controls.dispose();
    this.disposeTree(this.scene);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private load(modelUrl: string): void {
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        if (this.disposed) {
          this.disposeTree(gltf.scene);
          return;
        }

        this.setupAvatar(gltf);
        this.callbacks.onReady?.();
      },
      (event) => {
        if (this.disposed || event.total <= 0) {
          return;
        }

        this.callbacks.onProgress?.(Math.round((event.loaded / event.total) * 100));
      },
      (error: unknown) => {
        if (!this.disposed) {
          this.callbacks.onError?.(error);
        }
      },
    );
  }

  private setupAvatar(gltf: GLTF): void {
    const idleClip = THREE.AnimationClip.findByName(gltf.animations, 'Idle');
    const wavingClip = THREE.AnimationClip.findByName(gltf.animations, 'Waving');
    const stumbleClip = THREE.AnimationClip.findByName(gltf.animations, 'Stumble');

    if (!idleClip || !wavingClip || !stumbleClip) {
      this.callbacks.onError?.(new Error('Avatar animations are missing'));
      return;
    }

    this.avatar = gltf.scene;
    this.avatar.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    this.scene.add(this.avatar);

    this.mixer = new THREE.AnimationMixer(this.avatar);
    this.idleAction = this.mixer.clipAction(idleClip);
    this.wavingAction = this.mixer.clipAction(wavingClip);
    this.stumbleAction = this.mixer.clipAction(stumbleClip);
    this.wavingAction.setLoop(THREE.LoopOnce, 1);
    this.stumbleAction.setLoop(THREE.LoopOnce, 1);
    this.wavingAction.clampWhenFinished = true;
    this.stumbleAction.clampWhenFinished = true;
    this.wavingDuration = wavingClip.duration;
    this.stumbleDuration = stumbleClip.duration;
    this.idleAction.play();
  }

  private addLighting(): void {
    this.scene.add(new THREE.AmbientLight());

    const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
    spotlight.penumbra = 0.5;
    spotlight.position.set(0, 4, 2);
    spotlight.castShadow = true;
    spotlight.target.position.set(0, 1, 0);
    this.scene.add(spotlight, spotlight.target);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(1, 1, 2);
    keyLight.lookAt(MODEL_TARGET);
    this.scene.add(keyLight);
  }

  private addPedestal(): void {
    const geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
    const material = new THREE.MeshStandardMaterial();
    const pedestal = new THREE.Mesh(geometry, material);
    pedestal.receiveShadow = true;
    pedestal.position.y = -0.05;
    this.scene.add(pedestal);
  }

  private readonly handleDoubleClick = (event: MouseEvent): void => {
    if (!this.avatar || this.busy) {
      return;
    }

    const rect = this.container.getBoundingClientRect();
    this.pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);

    if (this.raycaster.intersectObject(this.avatar, true).length === 0) {
      return;
    }

    const idleAction = this.idleAction;
    const stumbleAction = this.stumbleAction;

    if (!idleAction || !stumbleAction) {
      return;
    }

    window.clearTimeout(this.timerId);
    this.busy = true;
    stumbleAction.reset();
    stumbleAction.play();
    idleAction.crossFadeTo(stumbleAction, CROSS_FADE_DURATION, false);
    this.timerId = window.setTimeout(() => this.returnToIdle(), this.stumbleDuration * 1000);
  };

  private readonly handlePointerEnter = (): void => {
    if (!this.avatar || this.busy) {
      return;
    }

    const idleAction = this.idleAction;
    const wavingAction = this.wavingAction;

    if (!idleAction || !wavingAction) {
      return;
    }

    window.clearTimeout(this.timerId);
    this.busy = true;
    wavingAction.reset();
    wavingAction.play();
    idleAction.crossFadeTo(wavingAction, CROSS_FADE_DURATION, false);
    this.timerId = window.setTimeout(() => this.returnToIdle(), this.wavingDuration * 1000);
  };

  private returnToIdle(): void {
    if (this.disposed) {
      return;
    }

    this.timerId = 0;

    const idleAction = this.idleAction;

    if (!idleAction) {
      this.busy = false;
      return;
    }

    idleAction.reset();
    idleAction.play();
    this.wavingAction?.crossFadeTo(idleAction, CROSS_FADE_DURATION, false);
    this.stumbleAction?.crossFadeTo(idleAction, CROSS_FADE_DURATION, false);
    this.busy = false;
  }

  private getAspect(): number {
    return Math.max(this.container.clientWidth, 1) / Math.max(this.container.clientHeight, 1);
  }

  private resize(): void {
    if (this.disposed) {
      return;
    }

    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private readonly animate = (): void => {
    if (this.disposed) {
      return;
    }

    this.frameId = requestAnimationFrame(this.animate);
    this.mixer?.update(this.clock.getDelta());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private disposeTree(root: THREE.Object3D): void {
    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        material.dispose();
      }
    });
  }
}
