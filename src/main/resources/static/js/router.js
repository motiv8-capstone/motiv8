/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
import Home from "./views/Home.js";
import Workouts from "./views/Workouts.js";

export default function router(URI) {
    const routes = {
        '/home': {
            returnView: Home,
            state: {},
            uri: '/home',
            title: 'Home',
        },
        '/workouts': {
        returnView: Workouts,
            state: {},
            uri: '/workouts',
            title: 'Workouts'
        }

    };

    return routes[URI];
}

