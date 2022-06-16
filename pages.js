pages = {
    // home: //html
    //     `<div class="bg-light p-5 rounded">
    //   <div class="col-sm-8 py-5 mx-auto">
    //     <h1 class="display-5 fw-normal">Welcome to to-do Lists. Sign up and get started today,<br>or Log in and pick up where you left!</h1>
    //     <p>
    //       <a class="btn btn-primary" href="javascript:void(0)" id="home-signup" role="button">Sign Up</a>
    //       <a class="btn btn-success" href="javascript:void(0)" id="home-login" role="button">Login</a>
    //     </p>
    // </div>`,
    // homeLoggedIn: // html
    //     `<div class="bg-light p-5 rounded">
    //   <div class="col-sm-8 py-5 mx-auto">
    //     <h1 class="display-5 fw-normal">Welcome back {{ userFirstName }}! Start getting productive right away!</h1>
    //     <p>
    //       <a class="btn btn-success" href="javascript:void(0)" id="home-dashboard" role="button">Go to Dashboard</a>
    //     </p>
    // </div>`,
    // signup: // html
    //     `<div class="mb-4 mt-4">
    //   <h3>Create Your Account</h3>
    // </div>

    // <form style='border:1px solid black; background-color:rgb(165, 178, 198); padding:10px;' autocomplete="on" id="signup-form">
    //   <div class="mb-3">
    //     <label for="first-name" class="form-label">First Name</label>
    //     <input type="text" class="form-control" id="first-name" pattern="[A-Za-z]{2,}" required>
    //     <small class="form-errors text-danger" id='first-name-errors'></small>
    //   </div>
    //   <div class="mb-3">
    //     <label for="last-name" class="form-label">Last Name</label>
    //     <input type="text" class="form-control" id="last-name" pattern="[A-Za-z]{2,}" required>
    //     <small class="form-errors text-danger" id='last-name-errors'></small>
    //   </div>
    //   <div class="mb-3">
    //     <label for="email" class="form-label">Email address</label>
    //     <input type="email" class="form-control" id="email" required>
    //     <small class="form-errors text-danger" id='email-errors'></small>
    //   </div>
    //   <div class="mb-3">
    //     <label for="password" class="form-label" >Password</label>
    //     <input type="password" class="form-control" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*\(\)_+=-\`<>?]).{8,}" required>
    //     <small class="form-errors text-danger" id='password-errors'></small>
    //   </div>
    //   <div class="mb-3">
    //     <label for="confirm-password" class="form-label">Confirm Password</label>
    //     <input type="password" class="form-control" id="confirm-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required><br>
    //     <small class="form-errors text-danger" id='confirm-password-errors'></small>
    //   </div>
    //   <input type="submit" class="btn btn-primary" value="Sign Up">
    // </form>`,
    // login: //html
    //     `<form style='border:1px solid black; background-color:rgb(106,133,255); padding:10px;' autocomplete="on" id="login-form">
    //   <div class="mb-3">
    //     <label for="email" class="form-label">Email address</label>
    //     <input type="email" class="form-control" id="email">
    //     <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    //   </div>
    //   <div class="mb-3">
    //     <label for="password" class="form-label">Password</label>
    //     <input type="password" class="form-control" id="password">
    //   </div>
    //   <input type="submit" class="btn btn-primary">
    // </form>`,
    // dashboardEmpty: // html
    //     `<h1 class="display-4 text-center">{{ userFirstName }}'s dashboard</h1>
    // <div class="border-blue" id="empty-dashboard">You currently don't have any lists. Create one now!</div>
    // <button class="btn btn-primary mt-3" id="dashboard-create-new-list">Create New List</button>`,
    // dashboardPopulated: // html
    //     `<h1 class="display-4 text-center">{{ userFirstName }}'s dashboard</h1>
    // <table class="table table-hover" id="dashboard-table">
    //   <thead>
    //     <tr>
    //       <th class="text-center" style="width: 15%"> Sr. #</th>
    //       <th  style="width: 60%"> List Name</th>
    //       <th class="text-center"  style="width: 25%"> Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody></tbody>
    // </table>
    // <button class="btn btn-primary mt-3" id="dashboard-create-new-list">Create New List</button>`,
    // listNew: // html
    //     `<h1 class="display-4 text-center"><input type="text" class="list-name" id="list-name-{{ listId }}" placeholder="Enter list name here" /></h1>
    // <table class="table table-hover" id="list-table">
    //   <thead>
    //     <tr>
    //       <th class="text-center" style="width: 15%"> #</th>
    //       <th  style="width: 60%"> Task Description</th>
    //       <th class="text-center"  style="width: 25%"> Status</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td class="text-center">
    //         <span class="task-number">Task 1</span>
    //       </td>
    //       <td>
    //         <input type="text" class="task-description" id="task-description-1" placeholder="Enter task description here" />
    //       </td>
    //       <td class="text-center">
    //         <input type="checkbox" class="task-status" id="task-description-1" />
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
    // <a class="btn btn-primary mt-3" id="listpage-add-new-task">Add New Task</a>
    // <a class="btn btn-success mt-3" id="listpage-save">Save</a>
    // <a class="btn btn-info mt-3" id="listpage-user-dashboard">User Dashboard</a>`,
    // listPopulated: // html
    //     `<h1 class="display-4 text-center" class="list-name-heading">{{ listName }}</h1>
    // <table class="table table-hover" id="list-table">
    //   <thead>
    //     <tr>
    //       <th class="text-center" style="width: 15%"> #</th>
    //       <th  style="width: 60%"> Task Description</th>
    //       <th class="text-center"  style="width: 25%"> Status</th>
    //     </tr>
    //   </thead>
    //   <tbody></tbody>
    // </table>
    // <a class="btn btn-primary mt-3" id="listpage-add-new-task">Add New Task</a>
    // <a class="btn btn-success mt-3" id="listpage-save">Save</a>
    // <a class="btn btn-info mt-3" id="listpage-user-dashboard">User Dashboard</a>`
}