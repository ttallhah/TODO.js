var pages = {
    'home': `<center><p class="text-justify">Welcome to to-do Lists. Sign up and get started today,<br>or Log in and pick up where you left!</p></center>
    <div class="btn-group d-flex justify-content-center"  aria-label="Basic example"><center>
    <button type="button" class="btn btn-secondary" onclick="getPageContent('SignUp')">SignUp</button>
    <button type="button" class="btn btn-secondary" onclick="getPageContent('LogIn')">LogIn</button></center>
  </div>`,
    'LogIn': `<form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="Email">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="Password">
    </div>
    <button type="submit" class="btn btn-primary" onclick="event.preventDefault();LogIn()">Submit</button>
  </form>`,
    'SignUp': ` <form>
    <div class="mb-3">
        <label for="Name" class="form-label">First Name</label>
        <input type="text" class="form-control" id="FirstName" required>
    </div>
    <div class="mb-3">
        <label for="LastName" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="LastName" required>
    </div>
    <div class="mb-3">
        <label for="Email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="Email" required>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
        <label for="Password" class="form-label" >Password</label>
        <input type="password" class="form-control" id="Password" minlength="8"  required>
    </div>
    <div class="mb-3">
        <label for="ConfirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="ConfirmPassword" minlength="8" required><br>
        <p id="message"></p>
    </div>
    
    <button type="button" class="btn btn-primary" onclick="SignUp()">Sign Up</button>
</form>`,
    'DashBoard': `
    <div class="mininav position-absolute top-0 ">
        <label id="loggedInUser"></label>|
        <a href="#" class="text-decoration-none">
                Account Settings
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                </svg>
        </a>|
        <a href="#" class="text-decoration-none onclick="LogOut()">
              LogOut
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                 <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
        </a>
    </div>`,
    'TodoApp': ``
};

function getPageContent(page) {
    var contentToReturn;
    contentToReturn = pages[page]
    document.getElementById('content').innerHTML = contentToReturn;
}
// Function For SignUp
function SignUp() {
    let formData = {
        Name: document.getElementById('FirstName').value,
        LastName: document.getElementById('LastName').value,
        Email: document.getElementById('Email').value,
        Password: document.getElementById('Password').value
    }

    if (username_validation(formData) && password_validation(formData)) {
        localStorage.setItem(`${formData.Email}`, JSON.stringify(formData));
        getPageContent('LogIn')
    } else {
        alert('enter right info')
    }

}
// Function For login
function LogIn() {
    var Email = document.getElementById("Email").value;
    var userData = JSON.parse(localStorage.getItem(Email));
    console.log(userData.Email);
    var Password = document.getElementById("Password").value;
    console.log(Password)
    if (Email == userData.Email && Password == userData.Password) {
        DashBoard()
    } else {
        alert("Enter right info");
    }

}

function username_validation(data) {
    var validate_name = /^[A-Za-z]+$/;
    if (data.Name.match(validate_name) && data.LastName.match(validate_name)) {
        document.querySelector('#FirstName').classList.add("success");
        document.querySelector('#LastName').classList.add("success");
        return true;
    } else {
        document.querySelector('#FirstName').classList.add("failed");
        document.querySelector('#LastName').classList.add("failed");
        return false;
    }
}

function password_validation(data) {
    var validate_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;
    let message = document.getElementById("message");
    if (data.Password.match(validate_pass)) {
        document.querySelector('#Password').classList.add("success");
        if (data.Password == ConfirmPassword) {
            message.textContent = "Passwords match";
            message.style.backgroundColor = "#1dcd59";
            return true;
        } else {
            message.textContent = "Password don't match";
            message.style.backgroundColor = "#ff4d4d";
            return false;
        }
    } else {
        message.textContent = "Password Patern incorrect";
        message.style.backgroundColor = "#ff4d4d";

    }
}

function DashBoard(data) {
    getPageContent('DashBoard');
    let user = document.getElementById("loggedInUser");
    user.textContent = "Loged In";




}

function LogOut() {
    getPageContent('logIn');
}