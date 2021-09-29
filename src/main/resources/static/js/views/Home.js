export default function Home(props) {
    return `
 <header class="py-5" id="header-background">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-5 fw-bolder text-white mb-2">Create workouts in a whole new way!</h1>
                            <p class="lead text-white mb-4">Quickly create and customize different workout playlists tailored to your specific exercise needs!</p>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                <a class="btn btn-primary btn-lg px-4 me-sm-3" href="/register" data-link>Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="py-5 border-bottom" id="features">
            <div class="container px-5 my-5">
                <div class="row gx-5"> 
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                        <h2 class="h4 fw-bolder">End Accountability Issues</h2>
                        <p>Having trouble remembering which workout to do next? Well, registered users can create playlist's of workouts and use them any time they need to!</p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                        <h2 class="h4 fw-bolder">Need Help Planning A Workout?</h2>
                        <p>Effortlessly use our workout page to view all workouts based off what body part you want to work out. We have a variety workouts to choose from!</p>                       
                        </a>
                    </div>
                    <div class="col-lg-4">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                        <h2 class="h4 fw-bolder">Track Your Calories</h2>                       
                        <p>You can enter your data into the calculator and it will recommend you how many calories you need to intake based on your data.</p>                       
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
}