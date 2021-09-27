export default function Register(props) {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Register</title>
    <link rel="stylesheet" href="/style/style.css">
</head>
<body>
<section class="vh-100">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6 text-black">

                <div class="px-5 ms-xl-4">
                    <i class="fas fa-crow fa-2x pt-5 mt-xl-4" style="color: #709085;"></i>
                    <span class="h1 fw-bold mb-0"><img src="https://i.pinimg.com/564x/32/ee/9d/32ee9dbc5df08a254e90bbefe2a9d194.jpg" alt="Logo" width="100" height="100"> </span>
                </div>

                <div class="d-flex align-items-start h-custom-2 pt-3 px-5 ms-xl-4 pt-xl-0 mt-xl-n5">

                    <form style="width: 23rem;">

                        <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register</h3>
                        
                         <div class="form-outline mb-4">
                            <input type="username" id="username" class="form-control form-control-lg" />
                            <label class="form-label" for="username">Username</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="email" id="email" class="form-control form-control-lg" />
                            <label class="form-label" for="username">Email address</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="password" class="form-control form-control-lg" />
                            <label class="form-label" for="password">Password</label>
                        </div>

                        <div class="pt-1 mb-4">
                            <button id="login-btn" class="btn btn-info btn-lg btn-block" type="button">Submit</button>
                        </div>

                

                    </form>

                </div>

            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
                <img src="https://images.unsplash.com/photo-1544033527-b192daee1f5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtYmVsbHN8ZW58MHx8MHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
            </div>
        </div>
    </div>

</form>
</body>
</html>`;

}

export function RegisterEvent() {
	registerUser()
}

function registerUser() {
	$("#register-btn")
		.click(function () {

			let userObj = {
				username: $("#username")
					.val(),
				password: $("#password")
					.val(),
				email: $("#email")
					.val(),
			}

			console.log(userObj)

			let request = {
				method: "POST",
				headers: {
					"Content-Type": 'application/json'
				},
				body: JSON.stringify(userObj)
			};

			fetch("http://localhost:8080/api/users", request)
				.then((response) => {
					console.log(response.status)
				})
				.catch(error => {
					console.log(error)
				})


		})


}