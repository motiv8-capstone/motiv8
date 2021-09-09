import Home from "./views/Home.js";
import Workouts, {getBodyPart} from "./views/Workouts.js";
import LoginEvent from "./auth.js";
import Error404 from "./views/Error404.js";

import Macros, {getCalories} from "./views/Macros.js";

import Register, {RegisterEvent} from "./views/Register.js";



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
            viewEvent: getBodyPart
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/macros':{
            returnView: Macros,
            state: {},
            uri: '/macros',
            title: 'Macros',
            viewEvent: getCalories
        },
        '/register': {
            returnView: Register,
            state: {
                users: "/users"
            },
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        }


    };

    return routes[URI];
}

