export default function Navbar(props) {
	let accessToken = localStorage.getItem("access_token")
	if(accessToken){
	return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        <ul class="navbar-nav">
            <li class="nav-item active">
            <a class="nav-link" href="/" data-link>Home</a>
            </li>
            <li class="nav-item active">
            <a class="nav-link" href="/workouts" data-link>Workouts</a>
            </li>
            <li class="nav-item active">
            <a class="nav-link" href="/macros" data-link>Calories</a>
            </li>
            </ul>
            <ul class="navbar-nav me-0">
            <li class="nav-item active">
            <a class="nav-link" id="nav-profile" href="/profile" data-link>Profile</a>
            </li>
            <li class="nav-item active">
            <a class="nav-link" id="nav-profile" href="/logout" data-link>Sign Out</a>
            </li>
            </ul>
            </div>
        </nav>
    `;
}else{
		return `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        <ul class="navbar-nav">
            <li class="nav-item active">
            <a class="nav-link" href="/" data-link>Home</a>
            </li>
            <li class="nav-item active">
            <a class="nav-link" href="/workouts" data-link>Workouts</a>
            </li>
            <li class="nav-item active">
            <a class="nav-link" href="/macros" data-link>Calories</a>
            </li>
            </ul>
            <ul class="navbar-nav me-0">
			<li class="nav-item active">
            <a class="nav-link" id="nav-login" href="/login" data-link>Login</a>
            </li>
            <li class="nav-item active">
            <a class="nav-link" id="nav-reg" href="/register" data-link>Register</a>
            </li>
            </ul>
            </div>
        </nav>
    `;
	}
}

