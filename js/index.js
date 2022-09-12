const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i+= 20) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}

const placementTiles = []

placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            // ADD BUILDING PLACEMENT TILE
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * 64,
                    y: y * 64
                }
            }))
        }
    })
})

const image = new Image()
image.onload = () => {
    animate()
}
image.src = 'img/map.png'

const enemies = []
for (let i = 0; i < 10; i++) {
    const xOffset = i * 150
    enemies.push(new Enemy({
        position: {x: waypoints[0].x - xOffset, y: waypoints[0].y}
    }))
}

const buildings = []
let activeTile = undefined

function animate() {
    requestAnimationFrame(animate)

    context.drawImage(image, 0, 0)
    enemies.forEach(enemy => {
        enemy.update()
    })

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    buildings.forEach(building => {
        building.draw()
        building.projectiles.forEach(projectile => {
            projectile.update()
        })
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', () => {
    if (activeTile && !activeTile.isOccupied) {
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }))
        activeTile.isOccupied = true
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size) {
            activeTile = tile
            break
        }
    }
})


