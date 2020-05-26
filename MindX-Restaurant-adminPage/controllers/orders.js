let count = 1
let ordersTable = document.getElementById("orders-table-body");

DB.collection("orders").get().then((querySnapshot) => {
    querySnapshot.forEach(async(doc) => {
        let totalPrice = doc.data().totalPrice
        let tr = `
                <tr>
                    <th scope="row">${count}</th>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().phoneNumber}</td>
                    <td>${doc.data().address}</td>
                    <td>${doc.data().status}</td>
                    <td>
                        <button type="button" class="btn btn-light" id="showOrder-${doc.id}" onclick="show1Order('${doc.id}')">Clickme</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-light" id="${"toPending-" + doc.id}" onclick="changeOrderStatus('${doc.id}','Pending')">Pending</button>
                        <button type="button" class="btn btn-light" id="${"toDelivering-" + doc.id}" onclick="changeOrderStatus('${doc.id}','Delivering')">Delivering</button>
                        <button type="button" class="btn btn-light" id="${"toDone-" + doc.id}" onclick="changeOrderStatus('${doc.id}','Done')">Done</button>
                    </td>
                </tr>

        `
        ordersTable.innerHTML += tr;
        count += 1;

        let idToDeactive = "to" + doc.data().status + "-" + doc.id
        document.getElementById(idToDeactive).style.display = "none";

        
    });
});

async function changeOrderStatus(id, status) {
    let order = DB.collection("orders").doc(id);
    await order.update({
        status: status
    })
    window.location.href = "orders.html"
}

async function show1Order(id) {
    $('#showOrdersList').modal('show');
    let orderList = document.getElementById("showOrderHere")
    let totalPrice
    let idToShowOrder 
    await DB.collection("orders").doc(id).get().then(async function(doc) {
        let orders = doc.data().orderList
        for (let dish of orders) {
            await DB.collection("menu").doc(dish).get().then(function (doc) {
                let dishName = doc.data().name
                let dishPrice = doc.data().price
                orderList.innerHTML += `<p>${dishName} - ${dishPrice}$</p>`
            })
        }
        totalPrice = doc.data().totalPrice
        idToShowOrder = "showOrder-" + doc.id
    })
    orderList.innerHTML += `
        <hr>
        <p> Total : ${totalPrice} </p>
    `

}


$("#showOrdersList").on("hidden.bs.modal", function () {
    let orderList = document.getElementById("showOrderHere")
    orderList.innerHTML = ""
});