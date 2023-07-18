const canvas1 = document.getElementById("canvas1")
const pov = canvas1.getContext("2d")

const canvas2 = document.getElementById("canvas2")
const ctx = canvas2.getContext("2d")

const stv1 = document.getElementById('stv1')
const stv2 = document.getElementById('stv2')
const stv3 = document.getElementById('stv3')

const pi = Math.PI

let currentX = 0
let seta = pi / 4

//r=2d tan(seta/2)

function getRadius(d) {
    return 2 * d * Math.tan(seta / 2)
}

class Ball {
    constructor(posX, radius) {
        this.position_X = posX
        this.radius = radius
    }
    draw() {
        var r = getRadius(this.position_X - currentX)
        pov.beginPath()
        pov.arc(canvas1.width / 2, canvas1.height / 2, r, 0, 2 * pi)
        pov.fill()
        pov.closePath()

        ctx.beginPath()
        ctx.arc(canvas1.width / 2 + this.position_X * 2, canvas1.height / 2, this.radius, 0, 2 * pi)
        ctx.fill()
        ctx.closePath()
    }
}

const objects = [
    new Ball(50, 15),
]

document.addEventListener('keypress', (event) => {
    if (event.key == "w" && currentX < objects[0].position_X) {
        currentX += 0.2
    }
    else if (event.key == "s") {
        currentX -= 0.2
    }
})

function render() {
    pov.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx.clearRect(0, 0, canvas2.width, canvas2.height)
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw()
    }


    var a = document.getElementById('stv1')
    if (a !== null) {
        a.innerText = `${(objects[0].position_X-currentX).toFixed(2)}`
        var distance = objects[0].position_X - currentX
        seta=Math.acos(1-(4*objects[0].radius**2)/(2*distance**2))
        document.getElementById('stv2').innerText = `${seta}`
    }

    ctx.beginPath()
    ctx.arc(canvas1.width / 2 + currentX * 2, canvas1.height / 2, 5, 0, 2 * pi)
    ctx.fill()
    ctx.closePath()

    requestAnimationFrame(render)
}
render()