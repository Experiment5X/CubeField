import * as THREE from 'three';

class Cube {
    constructor(height, position, color = 0x219ced) {
        this._height = height;
        this._position = position;

        const geometry = new THREE.BoxBufferGeometry( Cube.size, height, Cube.size );
        const phongMat = new THREE.MeshPhongMaterial( { color: new THREE.Color(color) } );
    
        this._mesh = new THREE.Mesh( geometry, phongMat );
        this._mesh.position.set(position.x, position.y, position.z)
    }

    get mesh() {
        return this._mesh
    }

    get position() {
        return this._position
    }
}

Cube.size = 100
Cube.baseHeight = 200

export default Cube