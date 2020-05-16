import Cube from './cube';

export default class CubeField {
    constructor(position, breadth, depth) {
        this._position = position
        this._breadth = breadth
        this._depth = depth
        this._cubes = []

        this._generateInitial()
    }

    get cubes() {
        return this._cubes
    }

    _generateInitial() {
        const y = -1.5 * Cube.size

        const startingX = this._position.x - this._breadth
        const endingX = this._position.x + this._breadth
        const startingZ = this._position.z
        const endingZ = this._position.z - 500

        const heightRange = Cube.size

        for (let z = startingZ; z > endingZ; z -= Cube.size) {
            for (let x = startingX; x < endingX; x += Cube.size) {
                const height = Cube.size + Math.round(Math.random() * heightRange)
                const cube = new Cube(height, { x, y, z })

                this._cubes.push(cube)
            }
        } 
    }
}