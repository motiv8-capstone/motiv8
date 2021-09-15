export default function Register(props) {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Register</title>
</head>
<body>

<h1>Register</h1>

<form id="register-form">
    <label for="username">Username</label>
    <input id="username" name="username" type="text"/>
    <label for="email">Email</label>
    <input id="email" name="email" type="email"/>
    <label for="password">Password</label>
    <input id="password" name="password" type="password"/>
    <button type="button" id="register-btn">Submit</button>
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