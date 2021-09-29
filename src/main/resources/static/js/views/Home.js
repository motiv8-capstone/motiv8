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
                    <div class="col-lg-4 mb-5 mb-lg-0 border border-dark rounded">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                        <h2 class="h4 fw-bolder">Create Playlists on the fly</h2>
                        <p>Create different playlists designed for your workout needs! Select from a wide range of different exercises.</p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0 border border-dark rounded">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                        <h2 class="h4 fw-bolder">Edit Playlists</h2>
                        <p>Does a certain workout no longer suit your needs? Go ahead and remove that workout from your playlist from your profile page!</p>                       
                        </a>
                    </div>
                    <div class="col-lg-4 border border-dark rounded">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                        <h2 class="h4 fw-bolder">Detailed Gif's</h2>
                        <p>Not sure how to do a workout? Not to worry! Each workout comes with a detailed gif showcasing how the workout is done, as well as which muscles it targets!</p>                       
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
}