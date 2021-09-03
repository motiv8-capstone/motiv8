/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
import Home from "./views/Home";
import Workouts from "./views/Workouts";

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
            state: {},
            uri: '/workouts',
            title: 'Workouts', viewEvent: WorkoutEvent
        }

    };

    return routes[URI];
}

