async function displayMenu(category) {
    let area = document.getElementById(category)
    let content = `<div class="menu-title">${category.toUpperCase()}</div>`
    await DB.collection("menu").where("category", "array-contains", category)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            content += `
                        <div class="menu-dishes">
                            <div class="menu-dishes-1 d-flex">
                                <div class="menu-dishes-name">${doc.data().name}</div>
                                <div class="menu-dishes-dot"></div>
                                <div class="menu-dishes-price">$${doc.data().price}</div>
                            </div>
                            <div class="menu-dishes-2">
                                <div class="menu-dishes-description">${doc.data().description}</div>
                            </div>
                        </div>`
        });
    })
    area.innerHTML = content
}
displayMenu("starters")
displayMenu("drinks")
displayMenu("main")
displayMenu("dessert")


async function displayLunch() {
    let content = `
                <div class="meal-content-1">
                    <div class="meal-card-group d-flex" id="lunch-left">
    `
    let count = 0
    await DB.collection("menu").where("category", "array-contains", "lunch").limit(6)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            content += `
                        <div class="meal-card d-flex">
                            <div class="meal-card-img flex-grow-1">
                                <img src="${doc.data().imageURL}" alt="">
                            </div>
                            <div class="meal-card-info flex-grow-2 d-flex align-items-center">
                                <div class="meal-card-info-1">
                                    <div class="meal-card-info-name">${doc.data().name}</div>
                                    <div class="meal-card-info-description">${doc.data().description}</div>
                                    <div class="meal-card-info-price">$${doc.data().price}</div>
                                </div>

                            </div>
                        </div>
            `
            count +=1
            if (count === 3) {
                console.log("3")
                content += `
                    </div>
                </div>
                <div class="meal-content-1">
                    <div class="meal-card-group d-flex" id="lunch-right">
                `
            }    
        });
    })
    content += `
        </div>
    </div>
    `
    document.getElementById("lunchMenu").innerHTML = content
}
displayLunch()


async function displayDinner() {
    let content = `
                <div class="meal-content-1">
                    <div class="meal-card-group d-flex" id="dinner-left">
    `
    let count = 0
    await DB.collection("menu").where("category", "array-contains", "dinner").limit(6)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            content += `
                        <div class="meal-card d-flex">
                            <div class="meal-card-img flex-grow-1">
                                <img src="${doc.data().imageURL}" alt="">
                            </div>
                            <div class="meal-card-info flex-grow-2 d-flex align-items-center">
                                <div class="meal-card-info-1">
                                    <div class="meal-card-info-name">${doc.data().name}</div>
                                    <div class="meal-card-info-description">${doc.data().description}</div>
                                    <div class="meal-card-info-price">$${doc.data().price}</div>
                                </div>

                            </div>
                        </div>
            `
            count +=1
            if (count === 3) {
                console.log("3")
                content += `
                    </div>
                </div>
                <div class="meal-content-1">
                    <div class="meal-card-group d-flex" id="dinner-right">
                `
            }    
        });
    })
    content += `
        </div>
    </div>
    `
    document.getElementById("dinnerMenu").innerHTML = content
}
displayDinner()