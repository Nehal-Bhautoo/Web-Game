let scene = new THREE.Scene();
// scene.background = new THREE.Color("#343434");
let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
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
let starGeo = new THREE.Geometry();
let star;
for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    starGeo.vertices.push(star);
}

let sprite = new THREE.TextureLoader().load("assets/star.png");
let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
});

let stars = new THREE.Points(starGeo, starMaterial);
scene.add(stars);

//load model

let objectLoader = new THREE.OBJLoader();
objectLoader.setPath('assets/model/Gargoyle/');
objectLoader.load('Gargoyle_1.obj', function (object) {
    scene.add(object);
    object.position.y -= 70; //positioning the model in the scene
    object.position.x += 20;
    object.translateZ(5);
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
