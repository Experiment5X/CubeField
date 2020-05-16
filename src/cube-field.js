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
    }

    step(newPosition, removeFromScene) {
        // remove all cubes invisible to the camera
        let index = 0
        try {
            while (index < this.cubes.length && this.cubes[index].position.z > newPosition.z) {
                this._removeMesh(this.cubes[index].mesh)
                index++
            }
            this._cubes.splice(0, index)
        } catch (ex) {
            debugger
        }

        // add any cubes onto the end that will be "coming into view"
        const newEndZ = newPosition.z - this._depth
        if (this.cubes.length > 0 && newEndZ < this.cubes[this.cubes.length - 1].position.z) {
            const genStartZ = this.cubes[this.cubes.length - 1].position.z - Cube.size
            const genEndZ = Cube.size * Math.ceil(newEndZ / Cube.size)

            this._generateCubes(genStartZ, genEndZ)
        }

        // animate all of the cubes y positions
        this.cubes.forEach(c => {
            const zDiff = Math.abs(c.position.z - newPosition.z)
            const newYPosition = zDiff * zDiff / 10000 - 300
            c.position.y = newYPosition
            c.mesh.position.set(
                c.position.x,
                c.position.y,
                c.position.z
            )
        })

        this._position = newPosition
    }
}