let signedInUser;
let current_user;
let listSrNo;
var pages = {
    'home': `<center><h4 class="text-justify">Welcome to to-do Lists. Sign up and get started today,<br>or Log in and pick up where you left!</h4></center>
    <div class="btn-group d-flex justify-content-center mt-3"  aria-label="Basic example"><center>
    <button type="button" class="btn btn-secondary" onclick="getPageContent('SignUp')">SignUp</button>
    <button type="button" class="btn btn-secondary" onclick="getPageContent('LogIn')">LogIn</button></center>
  </div>`,
    'LogIn': `<form style='border:1px solid black; background-color:rgb(106,133,255); padding:10px;'>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="password">
    </div>
    <button type="submit" class="btn btn-primary" onclick="event.preventDefault();LogIn()">Submit</button>
  </form>`,
    'SignUp': `<div class="mb-4 mt-4">
    <h3>Create Your Account</h3>
</div>
     <form style='border:1px solid black; background-color:rgb(137,165,255); padding:10px;'>
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
        <a href="#" class="text-decoration-none" onclick="AccountSettings()">
                Account Settings
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                </svg>
        </a>|
        <a href="#" class="text-decoration-none" onclick="LogOut()">
              LogOut
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                 <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
        </a>
    </div>
    <div class="mt-2">
   <h2 id="user_name"></h2>
    </div>
    <div class="mt-2" >
   <div id="listinfo"></div>
    </div>
    <button type="button" class="btn btn-secondary btn-lg" onclick="createNewList()">Create New List</button>
    `,
    'TodoApp': `
    <form>
    <div class="mb-3">
      
      <input type="text" class="form-control" id="task_name" placeholder="Enter List Name here">
      
    </div>
    <div class="mb-3">
      <table id="newListTable">
      <tr>
        <th class="srNo">Sr.#</th>
        <th class="description">Task Description</th>
        <th id="status">Status</th>
     </tr>
     <tr id="inputFields">
        <td class="srNo"><input type="number" class="form-control" id="srNo" minlength="1" min="1"></td>
        <td class="description"><input type="text" class="form-control" id="description"></td>
     </tr>
      </table>
      <div class=" mt-2" role="group">
        <button type="button" class="btn btn-primary btn-lg" id="btnAdd" onclick="createNewList()">Add New Task</button>
        <button type="button" class="btn btn-success btn-lg"  id="btnsave" onclick="saveListData()">save</button>
        <button type="button" class="btn btn-secondary btn-lg" onclick="DashBoard()">User Dashboard</button>
     </div>
    </div>
    
  </form>
    
    
    `,
    'AccountSettings': `<div class="mininav position-absolute top-0 " style="margin-left: 480px;">
    <label id="loggedInUser"></label>|
    <a href="#" class="text-decoration-none" onclick="AccountSettings()">
            Account Settings
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
            </svg>
    </a>|
    <a href="#" class="text-decoration-none" onclick="LogOut()">
          LogOut
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
             <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
    </a>
</div>
    <div class="mb-2">
        <h2 id='Edit_Info'></h2>
    </div>
    <div class="mb-2">
        <h6 style="color:blue;">Update Your Account Settings Here!</h6>
    </div>
    <form style="border:1px solid black; padding:8px; background-color:rgb(162,217,255);">
    <div class="mb-2">
        <label for="Name" class="form-label">First Name</label>
        <input type="text" class="form-control" id="updateFirstName" required>
    </div>
    <div class="mb-2">
        <label for="LastName" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="updateLastName" required>
    </div>
    <div class="mb-2">
        <label for="Email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="updateEmail" required>
    </div>
    <div class="mb-2">
        <label for="NewPassword" class="form-label" >New Password</label>
        <input type="text" class="form-control" id="NewPassword" minlength="8"  required>
    </div>
    <div class="mb-2">
        <label for="currentPassword" class="form-label">current Password</label>
        <input type="text" class="form-control" id="currentPassword" minlength="8" required>
    </div>
    <button type="button" class="btn btn-primary" onclick=" updateInfo()">Update Info</button>
</form> `
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

    if (username_validation(formData) && password_validation(formData) && email_validation(formData)) {
        localStorage.setItem(`${formData.Email}`, JSON.stringify(formData));
        getPageContent('LogIn')
    } else {
        alert('enter right info')
    }

}
// Function For login
function LogIn() {
    var email = document.getElementById("email").value;
    var userData = JSON.parse(localStorage.getItem(email));
    var password = document.getElementById("password").value;
    if (email == userData.Email && password == userData.Password) {
        signedInUser = document.getElementById("email").value;
        sessionStorage.setItem(signedInUser, JSON.stringify(userData))
        var user = JSON.parse(sessionStorage.getItem(signedInUser));
        console.log(user.Password);
        DashBoard();

    } else {
        alert("Enter right info");
    }

}
// Function For validations applied on Name
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
// Function For validations applied on password
function password_validation(data) {
    var validate_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;
    let message = document.getElementById("message");
    if (data.Password.match(validate_pass)) {
        document.querySelector('#Password').classList.add("success");
        if (data.Password == ConfirmPassword) {
            document.getElementById("ConfirmPassword").classList.add("success");
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
// Function For validations applied on password
function email_validation(data) {
    let validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.Email.match(validateEmail)) {
        document.getElementById("Email").classList.add("success");
        return true;
    } else {
        document.querySelector('#Email').classList.add("failed");
        return false;
    }
}

// Function For All the operations on dashboard
function DashBoard() {
    getPageContent('DashBoard');
    var current_userData = JSON.parse(localStorage.getItem(signedInUser));
    let user = document.getElementById("loggedInUser");
    user.textContent = ` ${current_userData.Name} `;
    let dashboard_name = document.getElementById("user_name");
    dashboard_name.textContent = `${current_userData.Name}'s Dashboard `;
    let listInfo = document.getElementById("listinfo");
    if (localStorage.getItem(listSrNo) == null) {
        listInfo.textContent = " You currently dont have any list. create one now!";
    } else {
        let table = document.getElementById("listinfo");
        let list_Name = JSON.parse(localStorage.getItem(listSrNo.list_Name));
        let srNo = JSON.parse(localStorage.getItem(listSrNo.srNo));
        let description = JSON.parse(localStorage.getItem(listSrNo.description));
        let template = `
        <h2>${list_Name}</h2>
        <tr>
            <td style="border: 1px solid black; width: 70px; padding: 4px;">${srNo}</td>
            <td style="border: 1px solid black;
            width: 750px;padding: 10px;">${description}</td>
            <td><span><a href=#" class="status" id="statusbtn">&#63; </a></span></td>
        </tr>`;

        table.innerHTML += template;

    }
}

function AccountSettings() {
    getPageContent('AccountSettings')
    var current_userinfo = JSON.parse(localStorage.getItem(signedInUser));
    let user = document.getElementById("loggedInUser");
    user.textContent = `Signed in as ${current_userinfo.Name} `;
    let message = document.getElementById("Edit_Info");
    message.textContent = `${current_userinfo.Name}'s Account Settings`;
}

function updateInfo() {
    //functionality to update User's info
    let updatedData = {
        Name: document.getElementById('updateFirstName').value,
        LastName: document.getElementById('updateLastName').value,
        Email: document.getElementById('updateEmail').value,
        Password: document.getElementById('NewPassword').value
    }
    if (updated_username_validation(updatedData) && updated_password_validation(updatedData) && updated_email_validation(updatedData)) {
        //functionality to delete User's previous info
        sessionStorage.removeItem(signedInUser);
        sessionStorage.setItem(`${updatedData.Email}`, JSON.stringify(updatedData));
        signedInUser = document.getElementById("updateEmail").value;
    } else {
        alert('enter right info')
    }
}

function updated_username_validation(data) {
    var validate_name = /^[A-Za-z]+$/;
    console.log(data.Name);
    if (data.Name.match(validate_name) && data.LastName.match(validate_name)) {
        document.querySelector('#updateFirstName').classList.add("success");
        document.querySelector('#updateLastName').classList.add("success");
        return true;
    } else {
        document.querySelector('#updateFirstName').classList.add("failed");
        document.querySelector('#updateLastName').classList.add("failed");
        return false;
    }
}

function updated_password_validation(data) {
    var validate_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    if (data.Password.match(validate_pass)) {
        document.querySelector('#NewPassword').classList.add("success");
        return true;
    } else {
        message.textContent = "Password Patern incorrect";
        message.style.backgroundColor = "#ff4d4d";
        return false;
    }
}

function updated_email_validation(data) {
    let validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (data.Email.match(validateEmail)) {
        document.getElementById("updateEmail").classList.add("success");
        return true;
    } else {
        document.querySelector('#updateEmail').classList.add("failed");
        return false;
    }
}
// Function For logOut
function LogOut() {
    sessionStorage.removeItem(signedInUser);
    getPageContent('home');

}

function createNewList() {
    getPageContent('TodoApp');

    let table = document.querySelector('#newListTable');
    let srNoInput = document.querySelector('#srNo');
    let descriptionInput = document.querySelector('#description');

    document.getElementById('task_name').style.display = "";
    document.getElementById('inputFields').style.display = "";
    let srNo = srNoInput.value;
    let description = descriptionInput.value;
    let template = `
                <tr>
                    <td>${srNo}</td>
                    <td>${description}</td>
                    <td><span><a href=#" class="status" id="statusbtn">&#63; </a></span></td>
                </tr>`;

    table.innerHTML += template;


}

function saveListData() {

    document.getElementById('task_name').innerText = document.getElementById('task_name').value;
    document.getElementById('inputFields').style.display = "none";
    let newListData = {
        list_Name: document.getElementById('task_name').value,
        description: document.getElementById('description').value,
        srNo: document.getElementById('srNo').value
    }
    localStorage.setItem(newListData.srNo, JSON.stringify(newListData));
    listSrNo = document.getElementById('srNo').value;
    let table = document.querySelector('#newListTable');
    let srNoInput = document.querySelector('#srNo');
    let listNameInput = document.querySelector('#task_name');
    let descriptionInput = document.querySelector('#description');
    let srNo = srNoInput.value;
    let description = descriptionInput.value;
    let template = `
       
                <tr>
                    <td>${srNo}</td>
                    <td>${description}</td>
                    <td><span><a href=#" class="status" id="statusbtn">&#63; </a></span></td>
                </tr>`;

    table.innerHTML += template;


}