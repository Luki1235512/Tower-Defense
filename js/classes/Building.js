class Building {
    constructor({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 64
        this.height = 64
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        this.radius = 250
        this.target = null
        this.frames = 0
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.beginPath()
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(0, 0, 255, 0.2)'
        context.fill()
    }

    update() {
        this.draw()
        if (this.frames % 100 === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                }))
        }
        this.frames++
    }
}
