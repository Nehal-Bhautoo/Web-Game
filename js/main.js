let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;
    camera.updateProjectionMatrix();
});

// Create lights
let light = new THREE.PointLight(0xEEEEEE);
scene.add(light);

// set background
const loader = new THREE.TextureLoader();
const bgTexture = loader.load('assets/space.jpg');
scene.background = bgTexture;

THREE.controls = new THREE.OrbitControls(camera, renderer.domElement);

// create star
let starGeo = new THREE.Geometry();
let star;
for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
}

// star material
let sprite = new THREE.TextureLoader().load("assets/star.png");
let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
});

// add star to scene
let stars = new THREE.Points(starGeo, starMaterial);
scene.add(stars);

//load model
let mtlLoader = new THREE.MTLLoader(); // mtl loader
mtlLoader.setPath('assets/star-wars-vader-tie-fighter-obj/');
mtlLoader.load('star-wars-vader-tie-fighter.mtl', function (materials) {
    materials.preload();

    let objectLoader = new THREE.OBJLoader();
    objectLoader.setMaterials(materials);
    objectLoader.setPath('assets/star-wars-vader-tie-fighter-obj/');
    objectLoader.load('star-wars-vader-tie-fighter.obj', function (object) {
        scene.add(object);
        object.position.y -= 30; //positioning the model in the scene
        object.position.x += 60;
        object.translateZ(30);
    });
});

let planet = new THREE.SphereGeometry(50, 40, 40);
let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
let sphere = new THREE.Mesh( planet, material );
scene.add(sphere);


let starMovement = function() {
    starGeo.vertices.forEach(p=>{
        p.velocity += p.acceleration;
        p.y -= p.velocity;
        if(p.y <-200) {
            p.y = 200;
            p.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.002;
};

camera.position.z = 3;

// logic
let update = function () {
    light.position.set(20, 0, 20);
    //starMovement();
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
