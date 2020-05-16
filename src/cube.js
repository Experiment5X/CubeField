import * as THREE from 'three';

class Cube {
    constructor(height, position, color = 0x219ced) {
        const geometry = new THREE.BoxBufferGeometry( Cube.size, height, Cube.size );
        const phongMat = new THREE.MeshPhongMaterial( { color: new THREE.Color(color) } );
    
        this._height = height;
        this._position = position;
        this._mesh = new THREE.Mesh( geometry, phongMat );
        this._mesh.position.set(position.x, position.y, position.z)
    }

    get mesh() {
        return this._mesh
    }
}

Cube.size = 100
Cube.baseHeight = 200

export default Cube