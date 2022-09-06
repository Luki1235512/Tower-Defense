const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.onload = () => {
    animate()
}
image.src = 'img/map.png'

class Enemy {
    constructor({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 50
        this.height = 50
        this.waypointIndex = 0
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.position.y
        const xDistance = waypoint.x - this.position.x
        const angle = Math.atan2(yDistance, xDistance)
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)

        if (Math.round(this.position.x) === Math.round(waypoint.x) &&
            Math.round(this.position.y) === Math.round(waypoint.y) &&
            this.waypointIndex < waypoints.length - 1) {
            this.waypointIndex++
        }
    }
}

const enemy = new Enemy({position: {x: waypoints[0].x, y: waypoints[0].y}})
const enemy2 = new Enemy({position: {x: waypoints[0].x - 150, y: waypoints[0].y}})

function animate() {
    requestAnimationFrame(animate)

    context.drawImage(image, 0, 0)
    enemy.update()
    enemy2.update()
}


