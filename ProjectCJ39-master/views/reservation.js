
document.getElementById("reservationForm").addEventListener("submit", async function (event) {
    event.preventDefault()
    let reservationForm = document.getElementById("reservationForm");
    let timeBook = reservationForm.date.value + " " + reservationForm.time.value;
    let numberOfPeople = reservationForm.numberOfPeople.value;
    let customerName = reservationForm.customerName.value;
    let customerPhoneNumber = reservationForm.customerPhoneNumber.value;
    let customerEmail = reservationForm.customerEmail.value;
    let createTime = new Date()
    let status = "Pending"
    let error = []
    let bookingDate = new Date(reservationForm.date.value)
    let currentDate = new Date()

    if (bookingDate.getDate() < currentDate.getDate() || bookingDate.getMonth() < currentDate.getMonth() || bookingDate.getFullYear() < currentDate.getFullYear()) {
        error.push("Booking date not available")
    }
    if (error.length !== 0) {
        $('#errorModal').modal('show');
        document.getElementById("errorContent").innerHTML = error
    } else {
        await DB.collection("booking").add({
            timeBook: timeBook,
            numberOfPeople: Number(numberOfPeople),
            customerName: customerName,
            customerPhoneNumber: customerPhoneNumber,
            customerEmail: customerEmail,
            createTime: createTime,
            status: status
        })
        $('#successModal').modal('show');
    }





})

let date = new Date();
let currentDate = date.getDate()
let currentMonth = date.getMonth() + 1
if (currentMonth < 10) {
    currentMonth = "0" + currentMonth
}
let currentYear = date.getFullYear()
let dateMerged = currentYear + "-" + currentMonth + "-" + currentDate
console.log(currentDate)
document.getElementById("date").value = dateMerged

let availableBookingTime = [540, 570, 600, 630, 660, 690, 730, 750, 780, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260]
function convertTime(timeInMinute) {
    let hour = Math.floor(timeInMinute / 60)
    let minute = timeInMinute % 60
    if (minute !== 30) {
        minute = "00"
    }
    let output = hour + ":" + minute
    return output
}

let currentTimeInMinute = Number(date.getHours()) * 60 + Number(date.getMinutes())
let bookingDate = document.getElementById("date").value
let content = ``
if (bookingDate === dateMerged) {
    for (let time of availableBookingTime) {
        if (time > currentTimeInMinute) {
            content += `
                <option value="">${convertTime(time)}</option>
                `
        }
    }
    document.getElementById("time").innerHTML = content
} else {
    for (let time of availableBookingTime) {
        content += `
                <option value="">${convertTime(time)}</option>
                `
    }
    document.getElementById("time").innerHTML = content
}
document.getElementById("date").onchange = function () {
    bookingDate = document.getElementById("date").value
    let content = ``
    if (bookingDate === dateMerged) {
        for (let time of availableBookingTime) {
            if (time > currentTimeInMinute) {
                content += `
                <option value="">${convertTime(time)}</option>
                `
            }
        }
        document.getElementById("time").innerHTML = content
    } else {
        for (let time of availableBookingTime) {
            content += `
                <option value="">${convertTime(time)}</option>
                `
        }
        document.getElementById("time").innerHTML = content
    }
}
