import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-iwi-world',
  templateUrl: './iwi-world.component.html',
  styleUrls: ['./iwi-world.component.scss'],
})
export class IwiWorldComponent implements OnInit {
  canvas: any;
  scene: any;
  renderer: any;
  camera: any;
  stats: any;
  model: any;
  skeleton: any;
  mixer: any;
  clock: any;

  constructor() {}

  ngOnInit(): void {
    this.createIWIWorld();
  }

  createIWIWorld(): void {
    this.canvas = document.getElementById('iwi-world-canvas');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    if (!this.canvas) {
      return;
    }

    this.addSkyBox();
    this.addGroundToScene();
    this.addCameraToScene();
    this.addOrbitControls();
    this.addLightingToScene();

    this.setRenderer(canvasSizes);
    this.onWindowResize(canvasSizes);

    this.clock = new THREE.Clock();

    const animateGeometry = () => {
      const elapsedTime = this.clock.getElapsedTime();

      // Update animaiton objects
      const delta = this.clock.getDelta();

      if (this.mixer) this.mixer.update(delta);

      // Render
      this.renderer.render(this.scene, this.camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(animateGeometry);
    };

    animateGeometry();
  }

  setRenderer(canvasSizes: any) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.setClearColor(0xe232222, 1);
    this.renderer.setSize(canvasSizes.width, canvasSizes.height);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
  }

  addCameraToScene() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(-100, 200, 300);
  }

  addOrbitControls() {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.set(0, 100, 0);
    controls.update();
  }

  addLightingToScene() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    this.scene.add(pointLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    this.scene.add(dirLight);
  }

  addGroundToScene() {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    const grid = new THREE.GridHelper(1000, 10, 0x000000, 0x000000);
    this.scene.add(grid);
  }

  addSkySphare() {
    const skyGeometry = new THREE.SphereGeometry(500, 25, 25);
    const loader = new THREE.TextureLoader();
    const texture = loader.load('assets/textures/skybox/skybox_sunflower.jpg');
    const material = new THREE.MeshPhongMaterial({
      map: texture,
    });
    console.log('texture', texture);
    const sky = new THREE.Mesh(skyGeometry, material);
    sky.material.side = THREE.BackSide;
    this.scene.add(sky);
  }

  addSkyBox() {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      'assets/textures/skybox/Skybox_1/Left_Tex.png',
      'assets/textures/skybox/Skybox_1/Right_Tex.png',
      'assets/textures/skybox/Skybox_1/Up_Tex.png',
      'assets/textures/skybox/Skybox_1/Down_Tex.png',
      'assets/textures/skybox/Skybox_1/Front_Tex.png',
      'assets/textures/skybox/Skybox_1/Back_Tex.png',
    ]);
    this.scene.background = texture;
  }

  onWindowResize(canvasSizes: any) {
    window.addEventListener('resize', (event) => {
      console.log('event', event);
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      this.camera.aspect = canvasSizes.width / canvasSizes.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(canvasSizes.width, canvasSizes.height);
      this.renderer.render(this.scene, this.camera);
    });
  }
}
