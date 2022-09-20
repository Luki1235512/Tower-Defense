class Building extends Sprite {
    constructor({position = {x: 0, y: 0}}) {
        super({position, imageSrc: '', frames: {max: 19}})
        this.width = 64
        this.height = 64
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        this.radius = 250
        this.target = null
    }

    draw() {
        super.draw()

        // REMOVE AFTER ADDING imageSrc
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        // REMOVE AFTER ADDING imageSrc

        context.beginPath()
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(0, 0, 255, 0.2)'
        context.fill()
    }

    update() {
        this.draw()
        if (this.target || (!this.target && this.frames.current !== 0)) {
            super.update()
        }
        if (this.target &&
            this.frames.current === 6 &&
            this.frames.elapsed % this.frames.hold === 0) {
                this.shoot()
        }
    }

    shoot() {
        this.projectiles.push(
            new Projectile({
                position: {
                    x: this.center.x,
                    y: this.center.y
                },
                enemy: this.target
            })
        )
    }
}
