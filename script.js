let signedInUser;
let current_user;
let user;
let listSrNo;
var listsindex = 0

var UserlistName;
var pages = {
    home: `<center><h4 class="text-justify">Welcome to to-do Lists. Sign up and get started today,<br>or Log in and pick up where you left!</h4></center>
    <div class="btn-group d-flex justify-content-center mt-3"  aria-label="Basic example"><center>
    <button type="button" class="btn btn-secondary" onclick="getPageContent('SignUp')">SignUp</button>
    <button type="button" class="btn btn-secondary" onclick="getPageContent('LogIn')">LogIn</button></center>
  </div>`,
    LogIn: `<form style='border:1px solid black; background-color:rgb(106,133,255); padding:10px;'>
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
    SignUp: `<div class="mb-4 mt-4">
    <h3>Create Your Account</h3>
</div>
     <form style='border:1px solid black; background-color:rgb(165, 178, 198); padding:10px;'>
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

    listPage: `
    <form>
    <div class="mb-3">
      <input type="text" class="form-control " id="task_name" placeholder="Enter List Name here" required>
    </div>
    <div class="mb-3">
      <table id="list-table-body">
      <tr>
        <th class="srNo text-center">Sr.#</th>
        <th class="thdescription text-center">Task Description</th>
        <th class="status text-center">Status</th>
     </tr>
     <tr id="inputFields">
        <td class="srNo">Task#1</td>
        <td><input type="text" class="form-control description task" id='taskno0' required></td>
        <td class="status"><input type="checkbox" class="status myCheck"  id="statusNo0" value='Done'></td>
     </tr>
      </table>
      <div class=" mt-2" role="group">
        <button type="button" class="btn btn-success btn-lg"  id="btnsave" onclick="saveListData()">save</button>
        <button type="button" class="btn btn-primary btn-lg " id="btnAdd" onclick="createNewTask();">Add New Task</button>
        <button type="button" class="btn btn-secondary btn-lg" onclick="dashBoard(user)">User Dashboard</button>
     </div>
    </div>
    
  </form>    
    `,

    AccountSettings: `
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
</form> `,
    emptyDashboard: //html 
        `<div class="border-blue" id="empty-dashboard">You currently don't have any lists. Create one now!</div>`,
    dashboardTable: //html
        `<table id="dashboard-table" class="">
            <tr>
                <th id="serial" class='text-center'>Sr. #</th>
                <th id="list-name">List Name</th>
                <th id="actions" class='text-center'>Actions</th>
            </tr>
            <tbody id="dashboard-table-body">
            </tbody>
        </table>`,
    viewList: //html
        `<h1 id='listName'></h1>
        <table id="list-table" class="">
            <tr>
                <th id="serial">Sr. #</th>
                <th id="description">Description</th>
                <th id="actions">Status</th>
            </tr>
            <tbody id="list-table-body">
            </tbody>
        </table>
        <div class=" mt-2" role="group">
        
        <button type="button" class="btn btn-secondary btn-lg mt-3" onclick="dashBoard(user)">Return to Dashboard</button>
        </div>
        `
};

function getPageContent(page) {
    var contentToReturn;
    contentToReturn = pages[page]
    document.getElementById('content').innerHTML = contentToReturn;
}

function home() {
    document.getElementById('mininav').style.display = 'none';
    getPageContent('home');
}
// Function For SignUp
function SignUp() {
    document.getElementById('mininav').style.display = 'none';
    let formData = {
        Name: document.getElementById('FirstName').value,
        LastName: document.getElementById('LastName').value,
        Email: document.getElementById('Email').value,
        Password: document.getElementById('Password').value
    }

    if (username_validation(formData) && password_validation(formData) && email_validation(formData)) {
        localStorage.setItem(`${formData.Email}`, JSON.stringify(formData));
        getPageContent('LogIn')
    }

}
// Function For login
function LogIn() {

    document.getElementById('mininav').style.display = 'none';
    var email = document.getElementById("email").value;
    var userData = JSON.parse(localStorage.getItem(email));
    var password = document.getElementById("password").value;
    if (email == userData.Email && password == userData.Password) {
        signedInUser = document.getElementById("email").value;
        sessionStorage.setItem(signedInUser, JSON.stringify(userData))
        user = userData;
        dashBoard(userData);

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
function dashBoard(currentUser) {
    var current_userinfo = JSON.parse(localStorage.getItem(signedInUser));
    let user = document.getElementById("loggedInUser");
    user.textContent = `Signed in as ${current_userinfo.Name} `;
    document.getElementById('mininav').style.display = '';
    let content = document.getElementById('content');
    content.innerHTML = '   '

    let header = document.createElement('h1')
    header.classList = 'text-center mb-4'
    header.innerText = `${currentUser.Name} ${currentUser.LastName}'s Lists`;

    content.appendChild(header)

    let createNewListButton = document.createElement('button');
    createNewListButton.id = 'create-new-list-button';
    createNewListButton.classList = 'btn btn-primary mt-2';
    createNewListButton.innerText = 'Create New List';
    createNewListButton.addEventListener('click', (e) => {
        e.preventDefault();
        listsPage(currentUser.Email);
        createNewList(currentUser.Email);
    })
    listsData = JSON.parse(localStorage.getItem(stringToHash(currentUser.Email)));
    if (listsData == null || Object.keys(listsData).length == 0) {
        content.innerHTML += (pages.emptyDashboard)
    } else {
        content.innerHTML += pages.dashboardTable;
        let tabelBody = document.getElementById('dashboard-table-body');
        let listRow = null;
        for (const list in listsData) {
            listRow = // html
                `<div >
                    <tr>
                        <td class="text-center serial-number">List ${list}</td>
                        <td>${listsData[list].name}</td>
                        <td class='actions-div'>
                            <div id="actions-div">
                                <button class="btn btn-success" id="list-view-${list}" onclick='view_list(this.id)'>View</button>
                                <button class="btn btn-danger" id="list-delete-${list}" onclick='delete_list(this.id)'>Delete</button>
                            </div>
                        </td>
                    </tr>
                </div>`;
            tabelBody.innerHTML += listRow

        }
    }
    content.appendChild(createNewListButton)
}


function delete_list(btn_id) {

    var key = stringToHash(signedInUser)
    var list_id = btn_id.match(/(\d+)/);
    btn_id = (list_id[0])

    var listData = JSON.parse(localStorage.getItem(key));
    delete listData[btn_id]
    console.log(listData)

    localStorage.removeItem(key);


    localStorage.setItem(key, JSON.stringify(listData))

    dashBoard(user);
}

function view_list(btn_id) {
    getPageContent('viewList');
    var key = stringToHash(signedInUser)
    var list_id = btn_id.match(/(\d+)/);
    btn_id = (list_id[0])
    var listData = JSON.parse(localStorage.getItem(key));
    let listName = document.getElementById('listName');
    let tabelBody = document.getElementById('list-table-body');
    var selected_list = listData[btn_id]
    listNameField = // html
        `<h1>${selected_list.name}</h1>`
    listName.innerHTML += listNameField
    for (const list in selected_list.name) {
        var taskCount = document.getElementsByClassName("task");
        total_tasks = taskCount.length + 1;
        taskRow = // html
            `
                        <tr>
                            <td class="text-center status" >Task#${total_tasks}</td>
                            <td class="task">${selected_list.tasks[list][0]}</td>
                            <td class="text-center status">${selected_list.tasks[list][1]}</td>
                        </tr>
                    `;

        tabelBody.innerHTML += taskRow
    }


}

function AccountSettings() {
    document.getElementById('mininav').style.display = '';
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
    var current_userinfo = JSON.parse(localStorage.getItem(signedInUser));
    let user = document.getElementById("loggedInUser");
    user.textContent = `Signed in as ${current_userinfo.Name} `;
    document.getElementById('mininav').style.display = '';
    getPageContent('listPage');


}

function saveListData() {

    var current_userinfo = JSON.parse(localStorage.getItem(signedInUser));
    let user = document.getElementById("loggedInUser");
    user.textContent = `Signed in as ${current_userinfo.Name} `;
    var taskCount = document.getElementsByClassName("task");
    var listName = document.getElementById('task_name').value;
    var tasksArray = []
    var id = 0;
    for (var i = 0; i < taskCount.length; i++) {
        var taskId = "taskno" + id
        var checkId = "statusNo" + id
        var taskDescription = document.getElementById(taskId).value;
        var taskStatus = document.getElementById(checkId).checked;
        var tasks = [taskDescription, taskStatus]
        tasksArray.push(tasks)
        id++
    }
    lists[listsindex += 1] = {
        name: listName,
        tasks: tasksArray
    };
    localStorage.setItem(stringToHash(signedInUser), lists);
    localStorage.setItem(stringToHash(signedInUser), JSON.stringify(lists));


    view_list(`list-view-${listsindex}`)
}

function createNewTask() {

    var current_userinfo = JSON.parse(localStorage.getItem(signedInUser));
    let user = document.getElementById("loggedInUser");
    user.textContent = `Signed in as ${current_userinfo.Name} `;
    document.getElementById('mininav').style.display = '';


    let table = document.getElementById('list-table-body');

    var taskCount = document.getElementsByClassName("task");
    var taskStatusCount = document.getElementsByClassName("myCheck");
    total_tasks = taskCount.length + 1;
    let template = `
   
    <tr>
    <td class="text-center status">Task#${total_tasks}</td>
    <td class="description"><input type="text" class="form-control task" id=""></td>
    <td class="text-center status"><input type="checkbox" class="myCheck"></td>
    </tr>`;
    table.innerHTML += template;
    for (var i = 0; i < taskCount.length; i++) {
        taskCount[i].setAttribute("id", "taskno" + i);
        taskStatusCount[i].setAttribute("id", "statusNo" + i);
    }
    total_tasks++

}

function listsPage(listId = null) {
    table = document.createElement('table')
    table.classList = 'list'
    table.id = listId != null ? `list-${listId}` : 'new-list'
    document.getElementById('content');

}
let lists = {}

function stringToHash(string) {

    var hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}
// let lists = {
//     1: {
//         name: "My List 1",
//         tasks: [
//             ['Task 21', false],
//             ['Task 22', false],
//             ['Task 23', false],
//             ['Task 24', false],
//             ['Task 25', false],
//             ['Task 26', false]
//         ]
//     },
//     2: {
//         name: "My List 2",
//         tasks: [
//             ['Task 21', false],
//             ['Task 22', false],
//             ['Task 23', false],
//             ['Task 24', false],
//             ['Task 25', false],
//             ['Task 26', false]
//         ]
//     }
// }