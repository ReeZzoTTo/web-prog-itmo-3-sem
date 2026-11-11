export class ShootsTable {
    selectors = {
        tableBody: "[data-js-shoot-list]"
    }

    update(shoots = []) {
        let innerString = ""

        for (const shootData of shoots) {
            const date = new Date(shootData.timestamp)
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
        }

        if (shoots.length < 7) {
            innerString += `
                <tr class="shoot-tr">
                    <td colspan="6" empty>0</td>
                </tr>
            `.repeat(7 - shoots.length)
        }

        this.shootList.innerHTML = innerString    
    }

    constructor() {
        this.shootList = document.querySelector(this.selectors.tableBody)

        this.update([])
    }
}