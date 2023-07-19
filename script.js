const canvas1 = document.getElementById("canvas1")
const pov = canvas1.getContext("2d")

const canvas2 = document.getElementById("canvas2")
const ctx = canvas2.getContext("2d")

const stv1 = document.getElementById('stv1')
const stv2 = document.getElementById('stv2')
const stv3 = document.getElementById('stv3')

const pi = Math.PI

let currentX = -10

//r=2d tan(seta/2)

function getRadius(d, seta) {
    return 1 * d * Math.tan(seta / 2)
}

class Ball {
    constructor(posX, radius, color, rv) {
        this.position_X = posX
        this.radius = radius
        this.color = color
        this.rv=rv
    }
    draw() {
        var distance = this.position_X - currentX
        this.seta = Math.acos(1 - (4 * this.radius ** 2) / (2 * distance ** 2))
        this.distance=distance
        this.r = getRadius(this.position_X - currentX, this.seta)
        pov.beginPath()
        pov.fillStyle=this.color
        pov.arc(canvas1.width / 2, canvas1.height / 2, this.r, 0, 2 * pi)
        pov.fill()
        pov.closePath()

        ctx.beginPath()
        ctx.fillStyle=this.color
        ctx.arc(canvas1.width / 2 + (-this.rv + this.position_X) * 2, canvas1.height / 2, this.radius / 3, 0, 2 * pi)
        ctx.fill()
        ctx.closePath()
    }
}

const objects = [
    new Ball(100, 60, "rgb(205,105,15)", 30),
    new Ball(50, 30, "rgb(50,140,205)",20),
]
let delta = 0
document.addEventListener('keypress', (event) => {
    if (event.key == "w" && currentX + 30 < objects[0].position_X) {
        currentX += 0.1
    }
    else if (event.key == "s") {
        currentX -= 0.1
    }
})

function render() {
    pov.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx.clearRect(0, 0, canvas2.width, canvas2.height)


    var a = document.getElementById('stv1')
    if (a !== null) {
        a.innerText = `거리 : ${Math.abs((objects[1].distance-30)).toFixed(2)}km`
        document.getElementById('stv2').innerText = `물체와의 시야각 : ${(objects[1].seta * 180 / pi).toFixed(2)}도`
        document.getElementById('stv3').innerText = `겉보기 반지름 : ${(objects[1].r).toFixed(2)}km`
        if(objects[1].distance-30<1){
            document.getElementById('stv3').innerText = `겉보기 반지름 : ${(objects[1].r*1000).toFixed(2)}km`
        }
        document.getElementById('stv4').innerText= `거리 : ${Math.abs((objects[0].distance-60)).toFixed(2)}km`
        document.getElementById('stv5').innerText = `물체와의 시야각 : ${(objects[0].seta * 180 / pi).toFixed(2)}도`
        document.getElementById('stv6').innerText = `겉보기 반지름 : ${(objects[0].r).toFixed(2)}km`
        if(objects[0].distance-60<1){
            document.getElementById('stv6').innerText = `겉보기 반지름 : ${(objects[0].r*1000).toFixed(2)}km`
        }
    }

    for (var i = 0; i < objects.length; i++) {
        objects[i].draw()
    }

    ctx.beginPath()
    ctx.fillStyle="rgb(200,200,200)"
    ctx.arc(canvas1.width / 2 + currentX * 3, canvas1.height / 2, 5, 0, 2 * pi)
    ctx.fill()
    ctx.closePath()

    requestAnimationFrame(render)
}
render()