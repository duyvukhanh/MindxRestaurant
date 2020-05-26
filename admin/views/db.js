users = [
    {
        id : "",
        password : "",
        email : "",
        displayName : "",
        isAdmin : true
    }
]

menu = [
    {
        id:"",
        name : "",
        desctription : "",
        price : "",
        imageURL : "",
        category : ["lunch","drink"]  // lunch/ dinner/ drinks/ starters/ main/ dessert
    }
]

booking = [
    {
        id:"",
        timeCreate : "",
        timeBook : "",
        numberOfPeople : "",
        customerName : "",
        customerPhoneNumber : "",
        customerEmail : "",
        status : ""   // Pending/Confirmed/Done/Cancel
    }
]

orders = [
    {
        id:"",
        timeCreate : "",
        userID : "",
        orderList : [id1,id2],
        paymentMethod : "", // Cash/Banking/
        name : "", // anonymous = get Input, else get displayName of user logined
        phoneNumber : "", //anonymous = get Input, else get phone Number of user logined
        address : "", //anonymous = get Input, else get address of user logined
        status : "", // Pending/ delivering/ done
        totalPrice : ""
    }
]

