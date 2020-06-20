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
scene.add(new THREE.AmbientLight( 0xffffff ) );
let pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 0, 100, 0 );
scene.add( pointLight );

// set background
const loader = new THREE.TextureLoader();
const bgTexture = loader.load('assets/space.jpg');
scene.background = bgTexture;

THREE.controls = new THREE.OrbitControls(camera, renderer.domElement);

// create star
let starGeo = new THREE.Geometry();
let star;
for (let i = 0; i < 4000; i++) {
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
    size: 0.5,
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

//sun
let sun = new THREE.MTLLoader();
sun.setPath('assets/sun-v3-obj/');
sun.load('sun-v3.mtl', function (materials) {
    materials.preload();

    let rockObj = new THREE.OBJLoader();
    rockObj.setMaterials(materials);
    rockObj.setPath('assets/sun-v3-obj/');
    rockObj.load('sun-v3.obj', function (object) {
        scene.add(object);
    });
});


// rock
let materiallod = new THREE.MTLLoader();
materiallod.setPath('assets/rock-obj/');
materiallod.load('rock.mtl', function (materials) {
    materials.preload();

    let rockObj = new THREE.OBJLoader();
    rockObj.setMaterials(materials);
    rockObj.setPath('assets/rock-obj/');
    rockObj.load('rock.obj', function (object) {
        scene.add(object);
        object.position.y -= 30; //positioning the model in the scene
        object.position.x += 50;
        object.translateZ(5);
    });
});


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
