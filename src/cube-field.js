import Cube from './cube';

export default class CubeField {
    constructor(position, breadth, depth, addMesh, removeMesh) {
        this._position = position
        this._breadth = breadth
        this._depth = depth
        this._addMesh = addMesh
        this._removeMesh = removeMesh
        this._cubes = []

        this._generateInitial()
    }

    get cubes() {
        return this._cubes
    }

    _generateInitial() {
        const startingZ = this._position.z
        const endingZ = this._position.z - this._depth

        this._generateCubes(startingZ, endingZ)
    }

    _generateCubes(startingZ, endingZ) {
        const colors = [ 0xF2626B, 0xFEBA4F, 0xFFEA7F, 0x89E077, 0x83C3FF, 0xC381FD ]
        const heightRange = Cube.baseHeight

        const y = -1.5 * Cube.baseHeight
        const startingX = this._position.x - this._breadth
        const endingX = this._position.x + this._breadth

        let cubesAdded = 0
        for (let z = startingZ; z > endingZ; z -= Cube.size) {
            for (let x = startingX; x < endingX; x += Cube.size) {
                const height = Cube.size + Math.round(Math.random() * heightRange)
                const color = colors[Math.round(Math.random() * colors.length)]

                const cube = new Cube(height, { x, y, z }, color)

                this._cubes.push(cube)
                this._addMesh(cube.mesh)
                cubesAdded++
            }
        } 

        if (cubesAdded > 0) {
            console.log('added cubes ' + cubesAdded)
        }
    }

    step(newPosition, removeFromScene) {
        // remove all cubes invisible to the camera
        let index = 0
        try {
            while (index < this.cubes.length && this.cubes[index].position.z > newPosition.z) {
                this._removeMesh(this.cubes[index].mesh)
                index++
            }
            if (index > 0) {
                console.log('removing ' + index)
                this._cubes.splice(0, index)
            }
        } catch (ex) {
            debugger
        }
        console.log('stepping, now this many cubes: ' + this.cubes.length)
        // console.log('first cube z: ' + this.cubes[0].position.z + ' newPosition.z: ' + newPosition.z)

        const newEndZ = newPosition.z - this._depth
        if (this.cubes.length > 0 && newEndZ < this.cubes[this.cubes.length - 1].position.z) {
            const genStartZ = this.cubes[this.cubes.length - 1].position.z - Cube.size
            const genEndZ = Cube.size * Math.ceil(newEndZ / Cube.size)

            this._generateCubes(genStartZ, genEndZ)
        }

        this._position = newPosition
    }
}