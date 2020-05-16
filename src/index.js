import * as THREE from 'three';
import './style.css'

import Cube from './cube';
import CubeField from './cube-field';

let camera, scene, renderer;
let mesh;
let cubeField;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    scene = new THREE.Scene();

    /*const cube = new Cube(200, { x: 0, y: 0, z: 0 });
    mesh = cube.mesh
    scene.add( mesh );*/
    cubeField = new CubeField({ x: 0, y: 0, z: 0 }, 1000, 1000)
    cubeField.cubes.forEach(c => scene.add(c.mesh))

    console.log(cubeField.cubes)

    const light = new THREE.PointLight( 0xFFFFFF, 1.5, 1000 );
    light.position.set( 0, 300, 300 );
    scene.add( light );

    const ambientLight = new THREE.AmbientLight( 0xaaaaaa ); 
    scene.add(ambientLight)

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

let lastAnimateTime = undefined
function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

    
}