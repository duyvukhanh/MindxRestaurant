let navbarContent = `
<a class="navbar-brand text-light" href="index.html" id="logo">
                Mindx
            </a>
            <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarNav1">
                <ul class="navbar-nav justify-content-between">
                    <li class="nav-item">
                        <a class="nav-link text-light" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="menu.html">Menu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="reservation.html">Reservation</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="order.html">Order</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="about.html">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav2">
                <ul class="navbar-nav">
                    <li class="nav-item not-loggedIn">
                        <a class="nav-link text-light" href="https://www.instagram.com/khanhduy2906/" target="_blank">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li class="nav-item not-loggedIn">
                        <a class="nav-link text-light" href="https://www.twitter.com/vukhanh.duy.921" target="_blank">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li class="nav-item not-loggedIn">
                        <a class="nav-link text-light" href="https://www.facebook.com/vukhanh.duy.921" target="_blank">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li class="nav-item loggedIn notification">
                        <a class="nav-link text-light" data-toggle="collapse" href="#notiCollapse" role="button" aria-expanded="false" aria-controls="notiCollapse" onclick="displayNotiCollapse()">
                            <i class="fas fa-bell"></i>
                            <span class="badge" id="notiBadge"></span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onclick="displayCollapseCart()">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" id="loginBtn" href="">Sign in</a>
                    </li>
                </ul>
            </div>





            <div class="collapse" id="collapseExample">
                
            </div>

            <div class="collapse" id="notiCollapse">
                
            </div>


        <div class="login-form-container w3-animate-opacity" id="loginFormContainer">
            <div class="login-form" id="loginForm">
                <div class="button-box">
                    <div id="btn-group"></div>
                    <button class="toggle-btn text-light" type="button" id="login-Btn" onclick="toLogin()">Login</button>
                    <button class="toggle-btn" type="button" id="register-Btn" onclick="toRegister()">Register</button>
                </div>
                <form id="loginFormInput" class="input-box d-flex flex-column justify-content-center">
                    <div class="alert alert-danger" role="alert" id="loginErrorAlert">
                        This is a danger alert—check it out!
                    </div>
                    <input type="text" class="input-field" placeholder="Email" required id="loginForm-email">
                    <input type="password" class="input-field" placeholder="Password" required id="loginForm-password">
                    <div class="d-flex justify-content-around">
                        <button type="button" class="button-submit" onclick="login()">Login</button>
                        <button type="button" class="button-submit" onclick="closeLoginForm()">Close</button>
                    </div>
                </form>
                <form id="registerFormInput" class="input-box">
                    <div class="alert alert-danger" role="alert"  id="registerErrorAlert">
                        This is a danger alert—check it out!
                    </div>
                    <div class="alert alert-success" role="alert" id="registerSuccessAlert">
                        Register successfully
                    </div>
                    <input type="text" class="input-field" placeholder="Email" required id="registerForm-email">
                    <input type="password" class="input-field" placeholder="Password" required id="registerForm-password">
                    <input type="text" class="input-field" placeholder="Display Name" required  id="registerForm-displayName">
                    <div class="d-flex justify-content-around">
                        <button type="button" class="button-submit" onclick="register()">Register</button>
                        <button type="button" class="button-submit" onclick="closeLoginForm()">Close</button>
                    </div>
                </form>
            </div>
        </div>



        <!-- Modal -->
        <div class="modal fade" id="notiModal" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
`




document.getElementById("navbar").innerHTML = navbarContent;

async function setLoginButton() {
    let loggedinId = JSON.parse(localStorage.getItem("userId"))
    if (loggedinId) {
        await DB.collection("users").doc(loggedinId).get().then(function(doc) {
            document.getElementById("loginBtn").innerHTML = "Sign out"     
        })
    } else {
        document.getElementById("loginBtn").innerHTML = "Sign in"
    }
}
setLoginButton()


document.getElementById("loginBtn").addEventListener("click", function (e) {
    e.preventDefault();
})

let navbarHeight = $('#navbar').height();
let logoFontSize = $("#logo").css('font-size');
logoFontSize = Number(logoFontSize.replace(/\D/g, ""));

window.addEventListener("scroll", function () {
    let navbar = this.document.getElementById('navbar');
    let navbarText = navbar.getElementsByTagName("a");
    if (this.window.pageYOffset > 0) {
        navbar.classList.add("bg-light")
        for (const text of navbarText) {
            text.classList.remove("text-light");
            text.classList.add("text-dark");
        }
        navbar.style.height = navbarHeight * 5 / 6 + "px";
    } else {
        navbar.classList.remove("bg-light")
        for (const text of navbarText) {
            text.classList.remove("text-dark");
            text.classList.add("text-light");
        }
        navbar.style.height = navbarHeight + "px";
    }
})



let navText = document.getElementsByClassName("nav-link")
for (const nav of navText) {
    nav.addEventListener("mouseover", function () {
        nav.className = "nav-link";
        nav.style.color = "crimson";
    })
    nav.addEventListener("mouseout", function () {
        nav.className = "nav-link";
        if (window.pageYOffset > 0) {
            nav.className = "nav-link text-dark";
        } else {
            nav.className = "nav-link text-light";
        }
    })
}






// Get the modal
var loginFormContainer = document.getElementById("loginFormContainer");
var loginForm = document.getElementById("loginForm");


let loginFormDisplay = window.getComputedStyle(document.querySelector('#loginFormContainer')).display


// Get the button that opens the modal
var btn = document.getElementById("loginBtn");


// When the user clicks on the button, open the modal
let loggedinId = JSON.parse(localStorage.getItem("userId"))
if (!loggedinId) {
    btn.onclick = function () {
        loginFormContainer.style.display = "block";
    }
} else {
    btn.onclick = function () {
        localStorage.removeItem("currentOrder");
        localStorage.removeItem("userId");
        window.location.href = "index.html"
    }
}


function closeLoginForm() {
    loginFormContainer.style.display = "none";
}



let mouse_is_inside = false;
$(document).ready(function () {
    $('.login-form').hover(function () {
        mouse_is_inside = true;
    }, function () {
        mouse_is_inside = false;
    });

    $("body").mouseup(function () {
        if (!mouse_is_inside) {
            $('.login-form-container').hide();
        }
    });
});







let x = document.getElementById("loginFormInput")
let y = document.getElementById("registerFormInput")
let z = document.getElementById("btn-group")
function toRegister() {
    x.style.left = "-450px"
    y.style.left = "45px"
    z.style.left = "125px"
    document.getElementById("login-Btn").className = "toggle-btn text-dark"
    document.getElementById("register-Btn").className = "toggle-btn text-light"
}
function toLogin() {
    x.style.left = "45px"
    y.style.left = "450px"
    z.style.left = "0"
    // document.getElementById("loginBtn").classList.remove("text-dard")
    document.getElementById("login-Btn").className = "toggle-btn text-light"
    document.getElementById("register-Btn").className = "toggle-btn text-dark"
}


function toCheckoutPage() {
    
    // let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    // if(currentOrder) {
    //     window.location.href = "checkout.html"
    // }
    window.location.href = "checkout.html"
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    if (password.length < 6 || password.length > 20) {
        return false
    }
    return true
}

function validateDisplayName(displayName) {
    if (displayName.length < 3 || displayName.length > 20) {
        return false
    }
    return true
}

async function register() {
    let email = document.getElementById("registerForm-email").value
    let password = document.getElementById("registerForm-password").value
    let displayName = document.getElementById("registerForm-displayName").value

    let error = {}
    if (!validateEmail(email)) {
        error.email = "Email not available"
    }

    await DB.collection("users").where("email", "==", email)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                error.email = "Email already exist"
            });
        })

    if (!validatePassword(password)) {
        error.password = "password phai tu 6-20 ky tu"
    }
    if (!validateDisplayName(displayName)) {
        error.displayName = "displayName phai tu 3-20 ky tu"
    }
    console.log(error)
    if (!jQuery.isEmptyObject(error)) {
        document.getElementById("registerErrorAlert").style.display = "block";
        for (let e in error) {
            document.getElementById("registerErrorAlert").innerHTML = error[e]
            break
        }
        console.log("not register")
    }
    if (jQuery.isEmptyObject(error)) {
        await DB.collection("users").add({
            email: email,
            password: password,
            displayName: displayName,
            isAdmin: false
        })
        document.getElementById("registerSuccessAlert").style.display = "block"
    }
}


async function login() {
    let email = document.getElementById("loginForm-email").value
    let password = document.getElementById("loginForm-password").value

    let error = {}

    if (!validateEmail(email)) {
        error.email = "Email not available"
    }

    if (!validatePassword(password)) {
        error.password = "password phai tu 6-20 ky tu"
    }
    console.log(error)
    if (!jQuery.isEmptyObject(error)) {
        document.getElementById("loginErrorAlert").style.display = "block";
        for (let e in error) {
            document.getElementById("loginErrorAlert").innerHTML = error[e]
            break
        }
        console.log("not login")
    }
    let isEmailExist
    if (jQuery.isEmptyObject(error)) {
        await DB.collection("users").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().email === email) {
                    isEmailExist = true
                    if ( doc.data().password === password ) {
                        let id = doc.id
                        localStorage.setItem("userId",JSON.stringify(id))
                        console.log("logged in")
                        $('.login-form-container').hide();
                        setLoginButton()
                    } else {
                        document.getElementById("loginErrorAlert").style.display = "block";
                        document.getElementById("loginErrorAlert").innerHTML = "Wrong password"
                    }
                    
                }
            });
        });
        if ( !isEmailExist ) {
            document.getElementById("loginErrorAlert").style.display = "block";
            document.getElementById("loginErrorAlert").innerHTML = "Email not registed yet"
        }
    }
    location.reload();

}


async function displayCollapseCart() {
    let content = `
            <div class="card card-body">
                <div class="cart-header d-flex justify-content-between">
                    <div><i class="fas fa-shopping-cart"></i></div>
                    <div class="d-flex justify-content-end">Total <span id="collapseCartTotalPrice"> </span> </div>
                </div>
    `
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    let totalPrice = 0
    for (let key in currentOrder) {
        await DB.collection("menu").doc(key).get().then(function(doc) {
            content += `
                <div class="cart-content">
                    <div class="cart-item d-flex">
                        <div class="cart-item-img">
                            <img src="${doc.data().imageURL}" alt="">
                        </div>
                        <div class="cart-item-info grow-1 d-flex flex-column justify-content-center">
                            <div class="cart-item-name">${doc.data().name}</div>
                            <div class="cart-item-quantity">Quantity : ${currentOrder[key]}</div>
                        </div>
                        <div class="cart-item-price d-flex justify-content-center align-items-center"> $${currentOrder[key] * doc.data().price} </div>
                    </div>
                </div>
            `
            totalPrice += doc.data().price * currentOrder[key]
        })
    }
    content += `
            <div class="cart-order-btn d-flex justify-content-center">
                        <button type="button" class="btn btn-dark" onclick="toCheckoutPage()">Check Out.</button>
                    </div>
                 </div>
            </div>
    `
    document.getElementById("collapseExample").innerHTML = content
    document.getElementById("collapseCartTotalPrice").innerHTML = "$" + totalPrice

}