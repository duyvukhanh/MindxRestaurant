let count = 1
let bookingTable = document.getElementById("booking-table-body");

DB.collection("booking").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let tr = `
                <tr>
                    <th scope="row">${count}</th>
                    <td>${doc.data().customerName}</td>
                    <td>${doc.data().customerPhoneNumber}</td>
                    <td>${doc.data().numberOfPeople}</td>
                    <td>${doc.data().timeBook}</td>
                    <td>${doc.data().status}</td>
                    <td>
                        <button type="button" class="btn btn-light" id="${"toPending-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Pending')">Pending</button>
                        <button type="button" class="btn btn-light" id="${"toConfirmed-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Confirmed')">Confirmed</button>
                        <button type="button" class="btn btn-light" id="${"toDone-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Done')">Done</button>
                        <button type="button" class="btn btn-light" id="${"toCancel-"+doc.id}" onclick="changeBookingStatus('${doc.id}','Cancel')">Cancel</button>
                    </td>
                </tr>
        `
        bookingTable.innerHTML += tr;
        count += 1;
        idToDeactive = "to" + doc.data().status + "-" + doc.id
        document.getElementById(idToDeactive).style.display = "none";
    });
});

async function changeBookingStatus(id, status) {
    let booking = DB.collection("booking").doc(id);
    let userEmail
    let userId
    let notiList = []
    await DB.collection("booking").doc(id).get().then(function(doc) {
        userEmail = doc.data().customerEmail
    })
    await booking.update({
        status : status
    })
    await DB.collection("users").where("email", "==", userEmail)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            userId = doc.id
            notiList = doc.data().notifications
            notiList.unshift({
                isRead : false,
                content : "Your booking status is now " + status,
                time : convertTime(new Date())
            })
            
        });
    })
    await DB.collection("users").doc(userId).update({
        notifications : notiList
    })
    window.location.href = "booking.html"
}

function convertTime(time) {
    let date = time.getDate()
    let month = Number(time.getMonth()) + 1
    let year = time.getFullYear()
    let hour = time.getHours()
    let min = time.getMinutes()
    return hour + ":" + min + " " + date + "/" + month + "/" + year
}

