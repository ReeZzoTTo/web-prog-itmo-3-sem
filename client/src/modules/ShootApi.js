export class ShootApi {
    actions = {
        shoot: "/fcgi-bin/shoot",
    }

    async sendShoot({x, y, r}) {
        const urlParams = new URLSearchParams({
            x: String(x),
            y: String(y),
            r: String(r)
        })

        const response = await fetch(`${this.actions.shoot}?${urlParams.toString()}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const jsonData = await response.json()

        if (!response.ok) {
            throw new Error(
                jsonData.error || `HTTP Error: ${response.status}`
            )
        }

        return jsonData
    }

    async getHistory() {
        const response = await fetch(`${this.actions.shoot}?action=history`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const jsonData = await response.json()

        if (!response.ok) {
            throw new Error(
                jsonData.error || `HTTP Error: ${response.status}`
            )
        }

        return jsonData
    }

    async clearHistory() {
        const response = await fetch(`${this.actions.shoot}?action=clear`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const jsonData = await response.json()

        if (!response.ok) {
            throw new Error(
                jsonData.error || `HTTP Error: ${response.status}`
            )
        }

        return jsonData
    }
}
