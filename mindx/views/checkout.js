async function displayOrder() {
    let content = `
                    <div class="title">Your order</div>                    
    `
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    let totalPrice = 0
    for (let key in currentOrder) {
        await DB.collection("menu").doc(key).get().then(function (doc) {
            content += `
                <div class="item d-flex">
                    <div class="item-img">
                        <img src="${doc.data().imageURL}" alt="">
                    </div>
                    <div class="item-info d-flex flex-column justify-content-center">
                        <div class="item-name">${doc.data().name}</div>
                        <div class="item-description">${doc.data().description}</div>
                    </div>
                    <div class="item-quantity d-flex justify-content-center align-items-center">Quantity : ${currentOrder[key]}</div>
                    <div class="item-price d-flex justify-content-center align-items-center">$${doc.data().price * currentOrder[key]}</div>
                </div>
            `
            totalPrice += doc.data().price * currentOrder[key]
        })
    }
    content += `
                    <div class="total-price d-flex align-items-center justify-content-end">
                        Total :
                        <span>$${totalPrice}</span>
                    </div>    
     `
    document.getElementById("orderArea").innerHTML = content
    
}
displayOrder()


async function displayPayment() {
    let userId = JSON.parse(localStorage.getItem("userId"))
    if (userId) {
        await DB.collection("users").doc(userId).get().then(function(doc) {
            console.log(doc.data().displayName)
            document.getElementById("payment-name").value = doc.data().displayName
        })
    }
}
displayPayment()


async function getOrder() {
    document.getElementById("submitOrderForm").addEventListener("submit", async function (e) {
        e.preventDefault()
        let name = document.getElementById("payment-name").value
        let phoneNumber = document.getElementById("payment-phoneNumber").value
        let address = document.getElementById("payment-address").value
        let orderList = []
        let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
        let totalPrice = 0
        for (let key in currentOrder) {
            orderList.push(key)
            await DB.collection("menu").doc(key).get().then(function (doc) {
                totalPrice += doc.data().price * currentOrder[key]
            })
        }
        let status = "Pending"
        let timeCreate = new Date()
        let userId = JSON.parse(localStorage.getItem("userId"))
        if (!userId) {
            userId = "Anonymous"
        }
        
        await DB.collection("orders").add({
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            orderList: orderList,
            totalPrice: totalPrice,
            status: status,
            timeCreate: timeCreate,
            userId: userId
        })
        localStorage.removeItem("currentOrder");
        $('#orderComplete').modal('show');
    })

}

function toIndex() {
    window.location.href = "index.html"
}