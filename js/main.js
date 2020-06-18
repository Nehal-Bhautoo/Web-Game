let scene = new THREE.Scene();
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
let materialLoader = new THREE.MTLLoader();
let loaders = new THREE.ObjectLoader();

// using the loader in a call back to load the model which is json here
loaders.load('assets/model/male.json', function (object) {
    scene.add(object);

    let light = new THREE.PointLight(0xFF0040, 1, 100);
    light.position.set( 50, 50, 50 );
    scene.add(light);
});

// load a resource

materialLoader.setPath('assets/model/Gargoyle/');
materialLoader.load('Gargoyle_1.mtl', function (materials) {
    materials.preload();

    let objectLoader = new THREE.OBJLoader();
    objectLoader.setMaterials(materials);
    objectLoader.setPath('assets/model/Gargoyle/');
    objectLoader.load('Gargoyle_1.obj', function (object) {
        scene.add(object);
        object.position.y -= 70; //positioning the model in the scene
        object.position.x += 10;
        object.translateZ(10);
    });
});

camera.position.z = 3;

// logic
let update = function () {

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
