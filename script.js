let toDoLists = null;
$(document).ready(function() {
    let container = document.getElementById('container');
    let headerLink = $('#to-do-lists-link');
    toDoLists = new ToDoLists(container, pages);
    $(headerLink).click((event) => {
        event.preventDefault();
        toDoLists.showHomePage();
    });
    toDoLists.getCurrentUser();
    toDoLists.nullifyCurrentUser();
    toDoLists.showHomePage();

});

class ToDoLists {
    constructor(container, pages) {
        this.container = container;
        this.pages = pages;
        this.currentUser = null;
        this.taskData = $("#sortable")
        this.flashNotice = document.querySelector('#flash-notice #notice-message');
        this.loaderDiv = document.getElementById('loader')
        this.flashNoticeTimeOut = null;
        this.userLists = {};
        this.currentTasksCount = null;
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    /* TODO: for debugging purspose. Please delete this method afterwards */
    nullifyCurrentUser() {
        this.currentUser = null;
    }


    showHomePage() {
        if (this.currentUser != undefined || this.currentUser != null) {
            this.getPage('/pages/homeLoggedIn.html', { userFirstName: this.currentUser.firstName });
            let dashBoardBtn = $('#home-dashboard')
            $(dashBoardBtn).click((e) => {
                e.preventDefault();
                this.showDashBoardPage();
            });
        } else {
            // this.container.innerHTML = this.pages.home;

            let data = this.getPage('/pages/home.html');
            let signupBtn = document.getElementById('home-signup');
            $(signupBtn).click((e) => {
                e.preventDefault();
                this.showSignupPage();
            });

            let loginBtn = $("#home-login");
            $(loginBtn).click((e) => {
                e.preventDefault();
                this.showLoginPage();
            });
        }
    }

    showSignupPage() {
        // this.container.innerHTML = this.pages.signup;
        let data = this.getPage('/pages/signup.html');
        let signupForm = $('#signup-form');
        $(signupForm).submit((e) => {
            e.preventDefault();
            this.signup();
        })
    }

    signup() {
        let formData = {
            firstName: document.getElementById("first-name"),
            lastName: document.getElementById("last-name"),
            email: document.getElementById("email"),
            password: document.getElementById("password"),
            confirmPassword: document.getElementById("confirm-password")
        };

        if (this.validateForm(formData)) {
            localStorage.setItem(formData.email.value, JSON.stringify({ firstName: formData.firstName.value, lastName: formData.lastName.value, email: formData.email.value, password: sha256(formData.password.value) }))
            localStorage.setItem(sha256(formData.email.value), JSON.stringify({}))
            this.showFlashNotice('success', 'User registration successful');
            this.showLoginPage();
        }
    }

    validateForm(data) {
        let firstNameStatus = this.validateName(data.firstName);
        let lastNameStatus = this.validateName(data.lastName);
        let emailStatus = this.validateEmail(data.email);
        let passwordStatus = this.validatePassword(data.password, data.confirmPassword);

        if (firstNameStatus && lastNameStatus && emailStatus && passwordStatus) {
            return true
        } else {
            return false
        }
    }

    validateName(name) {
        let value = name.value;
        if (value != undefined && value != '' && value != null && value.match(/\s+/) == null) {
            if (value.match(/[A-Za-z]{2,}/) != null) {
                $(`#${name.id}-errors`).text = '';
                return true
            } else {
                $(`#${name.id}-errors`).text = 'This field name cannot be empty';
            }
        } else {
            $(`#${name.id}-errors`).text = 'This field name cannot be empty and cannot contain spaces';
        }
        return false
    }

    validateEmail(email) {
        let value = email.value;
        if (value != undefined && value != '' && value != null && value.match(/\s+/) == null) {
            if (value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) != null) {
                if (localStorage.getItem(value) == null) {
                    document.getElementById(`${email.id}-errors`).innerText = '';
                    return true
                } else {
                    $(`#${email.id}-errors`).innerHTML = 'A user with this email already exists. Pleae try another email or login <a href="javascript:void(0)" onclick="toDoLists.showLoginPage();">here</a>';
                }
            } else {
                $(`#${email.id}-errors`).innerText = 'Email cannot be empty';
            }
        } else {
            $(`#${email.id}-errors`).innerText = 'Email name cannot be empty and cannot contain spaces';
        }
        return false
    }

    validatePassword(password, confirmPassword) {
        let value = password.value;
        let confirmValue = confirmPassword.value;
        if (value != undefined && value != '' && value != null && value.match(/\s+/) == null) {
            if (value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*\(\)_+=-\`<>?]).{8,}/) != null) {
                if (value == confirmValue) {
                    $(`#${password.id}-errors`).innerText = '';
                    return true
                } else {
                    $(`#${password.id}-errors`).innerText = 'Passwords do not match';
                }
            } else {
                $(`#${password.id}-errors`).innerText = 'Password must have at least one upperaes letter, one lowercase letter, a number and a special character';
            }
        } else {
            $(`#${password.id}-errors`).innerText = 'Password cannot be empty and cannot contain spaces';
        }
        return false
    }

    showLoginPage() {
        // this.container.innerHTML = this.pages.login;
        let data = this.getPage('/pages/login.html');
        let loginForm = $('#login-form');
        $(loginForm).submit((e) => {
            e.preventDefault();
            this.login();
        })
    }

    login() {
        let formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        if (localStorage.getItem(formData.email) != null) {
            let user = JSON.parse(localStorage.getItem(formData.email));
            if (sha256(formData.password) == user.password) {
                this.currentUser = user;
                this.userLists = JSON.parse(localStorage.getItem(sha256(this.currentUser.email)));
                this.showFlashNotice('success', 'You have logged in successfully');
                this.showDashBoardPage();
            } else {
                this.showFlashNotice('danger', 'Incorrect email/password combination');
            }
        } else {
            this.showFlashNotice('warning', 'This user does not exist');
        }
    }

    showDashBoardPage() {
        if (Object.keys(this.userLists).length > 0) {
            this.getPage('/pages/dashboardPopulated.html', { userFirstName: this.currentUser.firstName });
            // this.container.innerHTML = this.pages.dashboardPopulated.replace('{{ userFirstName }}', this.currentUser.firstName);
            this.createListsTable('table#dashboard-table tbody');
        } else if (localStorage.getItem(sha256(this.currentUser.email)) == {}) {
            this.getPage('/pages/dashboardEmpty.html', { userFirstName: this.currentUser.firstName })
                // this.container.innerHTML = this.pages.dashboardEmpty.replace('{{ userFirstName }}', this.currentUser.firstName);
        } else {
            this.getPage('/pages/dashboardEmpty.html', { userFirstName: this.currentUser.firstName });
        }

        // view list buttons
        $("#dashboard-create-new-list").click((event) => {

            event.preventDefault();
            this.showListPage();
        })
    }

    createListsTable(container) {
        let row = ''
        for (let list in this.userLists) {
            row += // html
                `<tr>
            <td class="text-center" >
              List ${list}
            </td>
            <td>
              ${this.userLists[list].name}
            </td>
            <td class="text-center">
              <a id="list-${list}-view" class="btn btn-success list-btn" href="javascript:void(0)" data-id="${list}" data-action="view">View</a>
              <a id="list-${list}-delete" class="btn btn-danger list-btn" href="javascript:void(0)" data-id="${list}" data-action="delete" data-confirm="Are you sure?">Delete</a>
            </td>
          </tr>`

        }
        document.querySelector(container).innerHTML = row
        let listBtns = document.getElementsByClassName('list-btn')
        for (let btn of listBtns) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.dataset.action == 'view') {
                    this.showListPage(btn.dataset.id)
                } else if (btn.dataset.action == 'delete') {
                    this.deleteList(btn.dataset.id)
                }
            });
        }
    }
    showListPage(listId = null) {
        if (listId == null) {
            this.getPage('/pages/listNew.html', { listId: Object.keys(this.userLists).length + 1 });
            // this.container.innerHTML = this.pages.listNew.replace('{{listId}}', Object.keys(this.userLists).length + 1);
            this.currentTasksCount = 0;
        } else {
            this.getPage('/pages/listPopulated.html', { listName: this.userLists[listId].name });
            // this.container.innerHTML = this.pages.listPopulated.replace('{{listName}}', this.userLists[listId].name);
            this.createTasksTable(listId, 'table#list-table tbody', this.userLists);

        }
        this.bindListPageEvents('table#list-table tbody', listId);
    }

    createTasksTable(listId, container, userLists) {

        let userTasks = this.userLists[listId].tasks;
        let userListName = this.userLists[listId].name;
        let currentUserEmail = this.currentUser.email
        this.currentTasksCount = this.userLists[listId].tasks.length;
        let row = ''
        if (this.currentTasksCount > 0) {
            for (const task in userTasks) {
                row += // html
                    `<tbody id='sortable'><tr id="task-field-${parseInt(task)}">
          <td class="text-center">
            <span class="task-number" id="task-No-${parseInt(task) + 1}"> Task ${parseInt(task) + 1}</span>
          </td>
          <td >
            <span class="task-description" id="task-description-${parseInt(task) + 1}">${userTasks[task][0]}</span>
          </td>
          <td class="text-center">
            <input type="checkbox" class="task-status" id="task-description-1" data-list="${listId}", data-task="${task}" ${userTasks[task][1] ? 'checked' : ''}/>
          </td>
        </tr></tbody>`
                document.querySelector(container).innerHTML = row;

                $("tbody").sortable({
                    update: function(e, ui, userLists) {


                        var total_tasks = document.getElementsByClassName('task-description')
                        var sorted_tasks = [];
                        for (let index = 0; index < total_tasks.length; index++) {
                            sorted_tasks.push([total_tasks[index].innerText, false]);
                        }
                        this.sortedUserList = {
                            name: userListName,
                            tasks: sorted_tasks
                        }
                        toDoLists.userLists[listId] = this.sortedUserList
                        localStorage.setItem(sha256(currentUserEmail), JSON.stringify(toDoLists.userLists[listId]));
                        console.log(listId)
                        toDoLists.showListPage(listId)
                    }

                });
                $("tbody").disableSelection();

            }

        } else {
            row = // html
                `<tr>
          <td class="text-center">
            <span class="task-number ">Task 1</span>
          </td>
          <td>
            <input type="text" class="task-description" id="task-description-1" placeholder="Enter task description here" />
          </td>
          <td class="text-center">
            <input type="checkbox" class="task-status" id="task-description-1" />
          </td>
        </tr>`
        }

    }

    bindListPageEvents(container, listId = null) {
        // Add New Task Button
        document.getElementById('listpage-add-new-task').addEventListener('click', (e) => {
            e.preventDefault();
            this.currentTasksCount++;

            let row = document.createElement('tr');

            // Task Serial Number Row
            let taskSr = document.createElement('td');
            let taskSrSpan = document.createElement('span');
            taskSr.classList = 'text-center';
            taskSrSpan.classList = 'task-number';
            taskSrSpan.innerText = 'Task ' + this.currentTasksCount;
            taskSr.appendChild(taskSrSpan);

            // Task Serial Description Row
            let taskDesc = document.createElement('td');
            let taskDescInput = document.createElement('input');
            taskDescInput.type = 'text';
            taskDescInput.classList = 'task-description';
            taskDescInput.placeholder = 'Enter task description here';
            taskDescInput.id = "task-description-" + this.currentTasksCount;
            taskDesc.appendChild(taskDescInput);

            // Task Serial Status Row
            let taskStatus = document.createElement('td');
            let taskStatusInput = document.createElement('input');
            taskStatus.classList = 'text-center';
            taskStatusInput.type = 'checkbox';
            taskStatusInput.classList = 'task-status'
            taskStatusInput.id = "task-status-" + this.currentTasksCount;
            taskStatus.appendChild(taskStatusInput);

            row.appendChild(taskSr);
            row.appendChild(taskDesc);
            row.appendChild(taskStatus);

            document.querySelector(container).appendChild(row)
        });

        // Save Button
        document.getElementById('listpage-save').addEventListener('click', (e) => {
            let taskDescriptions = document.querySelectorAll('tbody input.task-description');
            if (listId == null) {
                listId = Object.keys(this.userLists).length + 1;
                let listName = document.querySelector(`input#list-name-${listId}`).value;
                if (listName.trim() != '') {
                    this.userLists[listId] = {
                        name: listName,
                        tasks: []
                    }
                } else {
                    this.showFlashNotice('warning', 'List name cannot be empty');
                    return this.showListPage();
                }
            }


            for (const taskDesc of taskDescriptions) {
                if (taskDesc.value.trim() != '') {
                    this.userLists[listId].tasks.push([taskDesc.value, false])
                }
            }

            localStorage.setItem(sha256(this.currentUser.email), JSON.stringify(this.userLists));
            this.showFlashNotice('success', 'List saved successfully');
            return this.showListPage(listId);
        });

        // User Dashboard Button
        document.getElementById('listpage-user-dashboard').addEventListener('click', (e) => {
            e.preventDefault();
            this.showDashBoardPage();
        })

        // Task Status Events
        let taskStatusBtns = document.querySelectorAll('input[type=checkbox].task-status')
        for (const btn of taskStatusBtns) {
            btn.addEventListener('click', (e) => {
                this.userLists[btn.dataset.list].tasks[btn.dataset.task][1] = btn.checked
                localStorage.setItem(sha256(this.currentUser.email), JSON.stringify(this.userLists))
                this.showFlashNotice('success', 'Status updated successfully', 1000);
            });
        }
    }

    deleteList(listId) {
        this.userLists[listId] = this.userLists[listId + 1];
        delete this.userLists[listId + 1];
        localStorage.setItem(sha256(this.currentUser.email), JSON.stringify(this.userLists));
        this.showFlashNotice('warning', 'List deleted successfully');
        this.showDashBoardPage();
    }
    showLoader() {
        this.loaderDiv.classList.remove('hide');
        this.loaderDiv.classList.add('show');
        this.container.classList.add('hide')
    }
    hideLoader() {
        this.container.classList.remove('hide')
        this.loaderDiv.classList.remove('show');
        this.loaderDiv.classList.add('hide');
    }
    showFlashNotice(status, msg, timeout = 5000) {
        clearTimeout(this.flashNoticeTimeOut);
        this.flashNotice.classList = status;
        this.flashNotice.innerText = msg;
        let parentDiv = this.flashNotice.parentElement.parentElement.parentElement;
        parentDiv.classList.remove('hide');
        parentDiv.classList.add('show');
        this.flashNoticeTimeOut = setTimeout(() => {
            this.flashNotice.classList = '';
            this.flashNotice.innerText = '';
            parentDiv.classList.remove('show');
            parentDiv.classList.add('hide');
        }, timeout);
    }

    getPage(url, variables = {}) {
        this.showLoader();
        $.ajax({
            url: url,
            async: false,
            success: function(data) {
                for (const v in variables) {
                    data = data.replace(`{{ ${v} }}`, variables[v])
                }

                toDoLists.hideLoader();
                return toDoLists.container.innerHTML = data;

            },
            error: function(xhr, exception) {
                var msg = "";
                if (xhr.status === 0) {
                    msg = "Not connect.\n Verify Network.";
                } else if (xhr.status == 404) {
                    msg = "Requested page not found. [404]";
                } else if (xhr.status == 500) {
                    msg = "Internal Server Error [500].";
                } else if (exception === "parsererror") {
                    msg = "Requested JSON parse failed.";
                } else if (exception === "timeout") {
                    msg = "Time out error.";
                } else if (exception === "abort") {
                    msg = "Ajax request aborted.";
                } else {
                    msg = "Error:" + xhr.status + " ";
                }
                toDoLists.showFlashNotice('danger', msg, 10000);
                return false;

            }
        });

    }
}