export class ShootsTable {
    selectors = {
        tableBody: "[data-js-shoot-list]"
    }

    storageKey = "shoots"

    traceShoots(shoots, lastSavedRadius) {
        for (const shoot of Object.values(shoots)) {            
            this.canvasGraphics.drawShoot(
                shoot.x,
                shoot.y,
                lastSavedRadius,
                shoot.isHit
            )
        }
    }

    update() {
        const shoots = JSON.parse(
            localStorage.getItem(this.storageKey)
        )
        let innerString = ""
        let counter = 0

        if (shoots) {
            
            this.traceShoots(shoots, shoots[Object.keys(shoots).at(-1)].r)

            for (const timestamp of Object.keys(shoots)) {
                const shootData = shoots[timestamp]
                const date = new Date(+timestamp)

                innerString += `
                    <tr class="shoot-tr">
                        <td>${date.toLocaleDateString("ru-RU")}</td>
                        <td>${date.toLocaleTimeString("ru-RU")}</td>
                        <td>${shootData.x}</td>
                        <td>${shootData.y}</td>
                        <td>${shootData.r}</td>
                        <td>${shootData.isHit 
                            ? '<p class="hit-true">Попадание</p>' 
                            : '<p class="hit-false">Промах</p>'}
                        </td>
                    </tr>
                `
                counter++
            }
        } else {
            this.canvasGraphics.render()
        }

        if (counter < 7) {
            innerString += `
            <tr class="shoot-tr">
                <td colspan="6" empty>0</td>
            </tr>
        `.repeat(7 - counter)
        }
            
        this.shootList.innerHTML = innerString
    }

    clear() {
        localStorage.removeItem(this.storageKey)
        this.update()
    }

    constructor(canvasObj) {
        this.canvasGraphics = canvasObj

        this.shootList = document.querySelector(this.selectors.tableBody)

        this.update()
    }
}