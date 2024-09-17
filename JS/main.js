import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.onload = () => loadModel();

function loadModel() {
    const loader = new GLTFLoader();
    loader.load('/arjun.glb',
        (gltf) => {
            setupScene(gltf);
            document.getElementById('avatar-loading').style.display = 'none';
        },
        (xhr) => {
            const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
            const loadingIndicatorHolder = document.getElementById('avatar-loading');
            loadingIndicatorHolder.classList = 'text-4xl text-white bg-blue-950'
            loadingIndicatorHolder.innerText = `LOADING... ${percentCompletion}%`
            console.log(`Loading model... ${percentCompletion}%`);
        },
        (error) => {
            console.log(error);
        }
    );
}

function setupScene(gltf) {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const container = document.getElementById('avatar-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        45, container.clientWidth / container.clientHeight);
    camera.position.set(0.2, 0.5, 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 3;
    controls.minPolarAngle = 1.4;
    controls.maxPolarAngle = 1.4;
    controls.target = new THREE.Vector3(0, 0.75, 0);
    controls.update();

    // Scene setup
    const scene = new THREE.Scene();

    // Lighting setup
    scene.add(new THREE.AmbientLight());

    const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
    spotlight.penumbra = 1;
    spotlight.position.set(0, 4, 2);
    spotlight.castShadow = true;
    scene.add(spotlight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(0, 6, 8);
    keyLight.lookAt(new THREE.Vector3());
    scene.add(keyLight);

    const spotlight2 = new THREE.PointLight(0xffffff, 1, 8, 1);
    spotlight2.position.set(2, 4, 2);
    spotlight2.castShadow = true;
    scene.add(spotlight2);

    // Load avatar
    const avatar = gltf.scene;
    avatar.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(avatar);

    // Load animations
    const mixer = new THREE.AnimationMixer(avatar);
    const clips = gltf.animations;
    const idleClip = THREE.AnimationClip.findByName(clips, 'idle');
    const waveClip = THREE.AnimationClip.findByName(clips, 'waving');
    const idleAction = mixer.clipAction(idleClip);
    const waveAction = mixer.clipAction(waveClip);

    let isWaving = false;
    const raycaster = new THREE.Raycaster();
    container.addEventListener('pointermove', (ev) => {
        const coords = {
            x: (ev.offsetX / container.clientWidth) * 2 - 1,
            y: -(ev.offsetY / container.clientHeight) * 2 + 1
        };

        raycaster.setFromCamera(coords, camera);
        const intersections = raycaster.intersectObject(avatar);

        if (intersections.length > 0) {
            if (isWaving) return;
            playWaveAnimation();
        }
    });

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }

    function playWaveAnimation(){
        isWaving = true
        waveAction.reset();
        waveAction.play();
        idleAction.crossFadeTo(waveAction, 0.3);

        setTimeout(() => {
            idleAction.reset();
            idleAction.play();
            waveAction.crossFadeTo(idleAction, 1);
            setTimeout(() => isWaving = false, 1000);
        }, 4000)
    }

    animate();
    idleAction.play();
    playWaveAnimation();
}