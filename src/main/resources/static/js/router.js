import Home from "./views/Home.js";
import Workouts, {init} from "./views/Workouts.js";
import LoginEvent from "./auth.js";
import Error404 from "./views/Error404.js";

import Macros, {getCalories} from "./views/Macros.js";

import Register, {RegisterEvent} from "./views/Register.js";
import Login from "./views/Login.js";
import {playlistEvent} from "./views/Profile";



/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */


export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
        },
        '/workouts': {
            returnView: Workouts,
            state: {
                workouts: '/api/workouts'
            },
            uri: '/workouts',
            title: 'Workouts',
            viewEvent: init
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
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/login':{
            returnView: Login,
            state: {},
            uri: '/login',
            title: 'Login',
            viewEvent: LoginEvent
        },
        '/profile':{
            returnView: Profile,
            state: {},
            uri: '/profile',
            title: 'Profile',
            viewEvent: playlistEvent
        }


    };

    return routes[URI];
}

