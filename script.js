class CanvasGraphics {
    selectors = {
        canvasGraphics: "#canvas-graphics"
    }

    drawMainAxis = () => {
        this.ctx.fillStyle = "#000000"
        this.ctx.moveTo(this.canvasWidth / 2, this.canvasHeight)
        this.ctx.lineTo(this.canvasWidth / 2, 0)

        this.ctx.moveTo(0, this.canvasHeight / 2)
        this.ctx.lineTo(this.canvasWidth, this.canvasHeight / 2)

        this.ctx.stroke()
    }

    drawAxisPointX = (x, y) => {
        this.ctx.moveTo(x, y - 5)
        this.ctx.lineTo(x, y + 5)
    }

    drawAxisPointY = (x, y) => {
        this.ctx.moveTo(x - 5, y)
        this.ctx.lineTo(x + 5, y)
    }

    drawRect = () => {
        this.ctx.fillStyle = "#4eacfa"
        this.ctx.fillRect(200, 20, 180, 180)

        this.drawAxisPointX(380, 200)
        this.drawAxisPointX(290, 200)
        this.drawAxisPointX(20, 200)
        this.drawAxisPointX(110, 200)
        this.ctx.stroke()

        this.drawAxisPointY(200, 380)
        this.drawAxisPointY(200, 290)
        this.drawAxisPointY(200, 20)
        this.drawAxisPointY(200, 110)
        this.ctx.stroke()
    }

    drawArea = () => {
        this.drawRect()
        // this.drawCircle()
        // this.drawTriangle()
    }

    constructor() {
        this.canvasGraphics = document.querySelector(this.selectors.canvasGraphics)
        this.ctx = this.canvasGraphics.getContext("2d")

        this.canvasWidth = this.canvasGraphics.clientWidth
        this.canvasHeight = this.canvasGraphics.clientHeight

        this.ctx.fillStyle = "#dadada"
        this.ctx.fillRect(0, 0, 400, 400)

        this.drawMainAxis()
        this.drawArea()
    }
}

new CanvasGraphics()








