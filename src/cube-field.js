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
        const y = -1.5 * Cube.baseHeight

        const startingX = this._position.x - this._breadth
        const endingX = this._position.x + this._breadth
        const startingZ = this._position.z
        const endingZ = this._position.z - 2000

        const colors = [ 0xF2626B, 0xFEBA4F, 0xFFEA7F, 0x89E077, 0x83C3FF, 0xC381FD ]

        const heightRange = Cube.baseHeight

        for (let z = startingZ; z > endingZ; z -= Cube.size) {
            for (let x = startingX; x < endingX; x += Cube.size) {
                const height = Cube.size + Math.round(Math.random() * heightRange)
                const color = colors[Math.round(Math.random() * colors.length)]

                const cube = new Cube(height, { x, y, z }, color)

                this._cubes.push(cube)
            }
        } 
    }
}