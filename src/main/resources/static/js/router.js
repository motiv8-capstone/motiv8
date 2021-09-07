import Home from "./views/Home.js";
import Workouts from "./views/Workouts.js";
import LoginEvent from "./auth.js";
import Error404 from "./views/Error404.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */


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
            title: 'Workouts',
            viewEvents: LoginEvent
        }
        ,
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },


    };

    return routes[URI];
}

