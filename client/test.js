async function getData(url) {
	const promise = await fetch(url)
	
    return promise
}

setTimeout(() => {
    // const data = getData("./forTest")
    const data1 = getData("/package.json").then((response) => response.json())
    console.log(data1)
}, 2000)

// * CSC Java курс - Тагир Валеев

