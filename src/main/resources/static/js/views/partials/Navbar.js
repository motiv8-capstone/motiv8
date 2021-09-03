export default function Navbar(props) {
    return `
        <nav>
            <a href="/" data-link>Home</a>
            <a href="/workouts" data-link>Workouts</a>
            <a href="/calories" data-link>Calories</a>
            <a href="/login" data-link>Login</a>
        </nav>
    `;
}