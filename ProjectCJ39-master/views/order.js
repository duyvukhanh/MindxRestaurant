async function displayMenu(category) {
    let area = document.getElementById(category)
    let content = `<div class="menu-title">${category.toUpperCase()}</div>`
    await DB.collection("menu").where("category", "array-contains", category)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            content += `
                <div class="menu-dishes d-flex">
                    <div class="menu-dishes-img">
                        <img src="${doc.data().imageURL}" alt="">
                    </div>
                    <div class="menu-dishes-info d-flex justify-content-center flex-column">
                        <div class="menu-dishes-1 d-flex">
                            <div class="menu-dishes-name">${doc.data().name}</div>
                            <div class="menu-dishes-dot"></div>
                            <div class="menu-dishes-price">$${doc.data().price}</div>
                        </div>
                        <div class="menu-dishes-2">
                            <div class="menu-dishes-description">${doc.data().description}</div>
                        </div>
                    </div>
                    <div class="menu-dishes-add d-flex justify-content-center align-items-center">
                        <i class="fas fa-plus-square" onclick="addDishToCurrentOrder('${doc.id}')"></i>
                    </div>
                </div>
                        `
        });
    })
    area.innerHTML = content
}
displayMenu("starters")
displayMenu("main")
displayMenu("drinks")
displayMenu("dessert")

async function displayOrder() {
    let content = `
    <div class="create-by d-flex px-4 bg-white">Created by <p id="createdName"></p></div>                  
    `
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    let totalPrice = 0
    if (currentOrder) {
        for (let dish in currentOrder) {
            await DB.collection("menu").doc(dish).get().then(function(doc) {
                content += `
                    <div class="cart d-flex justify-content-between px-4 bg-white">
                        <div class="cart-dish d-flex">
                            <div class="cart-quantity">
                                <i class="fas fa-plus-square" onclick="addDishToCurrentOrder('${doc.id}')"></i>
                                ${currentOrder[dish]}
                                <i class="fas fa-minus-square" onclick="decreaseDichFromCurrentOrder('${doc.id}')"></i>
                            </div>
                            <div class="cart-dish-name px-2">${doc.data().name}</div>
                        </div>
                        <div class="cart-price">$${doc.data().price * currentOrder[dish]}</div>
                    </div>
                `
                totalPrice += doc.data().price * currentOrder[dish]
            })
        }
        content += `
                        <div class="sum-price d-flex justify-content-between px-4 bg-white">
                            <div class="text">Total</div>
                            <div class="price">$${totalPrice}</div>
                        </div>
                        <div class="confirm-button bg-white">
                            <button type="button" class="btn btn-dark" onclick="toCheckoutPage()"> <i class="fas fa-check-circle"></i>Place your
                                order.</button>
                        </div>
        `
        document.getElementById("order").innerHTML = content
    } else {
        totalPrice = 0
        content = `
        <div class="create-by d-flex px-4 bg-white">Created by <p id="createdName"></p></div>
        <div class="sum-price d-flex justify-content-between px-4 bg-white">
            <div class="text">Total</div>
            <div class="price">$${totalPrice}</div>
        </div>
        <div class="confirm-button bg-white">
            <button type="button" class="btn btn-dark" onclick="toCheckoutPage()"> <i class="fas fa-check-circle"></i>Place your
                order.</button>
        </div>
        `
        document.getElementById("order").innerHTML = content
    }
    setCreatedName()
}
displayOrder()


async function setCreatedName() {
    let loggedinId = JSON.parse(localStorage.getItem("userId"))
    if (loggedinId) {
        await DB.collection("users").doc(loggedinId).get().then(function(doc) {
            document.getElementById("createdName").innerHTML = doc.data().displayName     
        })
    } else {
        document.getElementById("createdName").innerHTML = "Anonymous"
    }
}

let orderDivY = document.getElementById("order").getBoundingClientRect().top;
let orderDivX = document.getElementsByClassName("menu-content-2")[0].getBoundingClientRect().left;

window.addEventListener("scroll",function(){
    let navbarHeight = $('#navbar').height();
    let fixedElement = document.getElementById("order")
    if (this.window.pageYOffset > orderDivY - navbarHeight) {
        fixedElement.classList.add("fixed");
    } else {
        fixedElement.classList.remove("fixed");
    }
})

function addDishToCurrentOrder(id) {
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    if (!currentOrder) {
        currentOrder = {}
        currentOrder[id] = 1
        localStorage.setItem("currentOrder",JSON.stringify(currentOrder))
        displayOrder()
    } else {
        if (id in currentOrder) {
            currentOrder[id] += 1
            localStorage.setItem("currentOrder",JSON.stringify(currentOrder))
            displayOrder()
        } else {
            currentOrder[id] = 1
            localStorage.setItem("currentOrder",JSON.stringify(currentOrder))
            displayOrder()
        }
    }
}


function decreaseDichFromCurrentOrder(id) {
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    if (!currentOrder) {
        return
    } else {
        if (id in currentOrder) {
            currentOrder[id] -= 1
            if (currentOrder[id] === 0) {
                delete currentOrder[id]
                localStorage.setItem("currentOrder",JSON.stringify(currentOrder))
                displayOrder()
            } else {
                localStorage.setItem("currentOrder",JSON.stringify(currentOrder))
                displayOrder()
            } 
        } else {
            return
        }
    }
}