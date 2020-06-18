let scene = new THREE.Scene();
scene.background = new THREE.Color("#6d6d6d");
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

THREE.controls = new THREE.OrbitControls(camera, renderer.domElement);

//load model

let objectLoader = new THREE.OBJLoader();
objectLoader.setPath('assets/model/Gargoyle/');
objectLoader.load('Gargoyle_1.obj', function (object) {
    scene.add(object);
    object.position.y -= 70; //positioning the model in the scene
    object.position.x += 10;
    object.translateZ(10);
});

camera.position.z = 3;

let light1 = new THREE.PointLight(0xFF0040, 4, 50);
scene.add(light1);

let light2 = new THREE.PointLight(0xFF040FF, 3, 50);
scene.add(light2);

let light3 = new THREE.PointLight(0x80FF80, 3, 50);
scene.add(light3);

// logic
let update = function () {
    let time = Date.now() * 0.0005;

    light1.position.x = Math.sin(time * 0.7) * 30;
    light1.position.y = Math.cos(time * 0.7) * 30;
    light1.position.z = Math.cos(time * 0.7) * 30;

    light2.position.x = Math.cos(time * 0.5) * 40;
    light2.position.y = Math.sin(time * 0.5) * 40;
    light2.position.z = Math.sin(time * 0.5) * 40;

    light3.position.x = Math.sin(time * 0.5) * 30;
    light3.position.y = Math.cos(time * 0.5) * 30;
    light3.position.z = Math.cos(time * 0.5) * 30;
};

// draw scene
let render = function () {
    renderer.render(scene, camera);
};

// run loop
let GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
};

GameLoop();
