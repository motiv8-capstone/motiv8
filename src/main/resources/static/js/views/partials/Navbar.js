export default function Navbar(props) {
	return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
            <li class="nav-item active">
            <a class="nav-link" href="/login" data-link>Login</a>
            </li>
            </ul>
        </nav>
    `;
}
