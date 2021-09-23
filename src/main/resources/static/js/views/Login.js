export default function Login(props) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
    <link rel="stylesheet" href="/style/style.css">
</head>
<body>
<section class="vh-100">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6 text-black">

                <div class="px-5 ms-xl-4">
                    <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
                    <span class="h1 fw-bold mb-0"><img src="https://i.pinimg.com/564x/32/ee/9d/32ee9dbc5df08a254e90bbefe2a9d194.jpg" alt="Logo" width="100" height="100"> </span>
                </div>

                <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                    <form style="width: 23rem;">

                        <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>

                        <div class="form-outline mb-4">
                            <input type="email" id="username" class="form-control form-control-lg" />
                            <label class="form-label" for="username">Email address</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="password" class="form-control form-control-lg" />
                            <label class="form-label" for="password">Password</label>
                        </div>

                        <div class="pt-1 mb-4">
                            <button id="login-btn" class="btn btn-info btn-lg btn-block" type="button">Login</button>
                        </div>

                        <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                        <p>Don't have an account? <a href="/register" class="link-info">Register here</a></p>

                    </form>

                </div>

            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
                <img src="https://images.unsplash.com/photo-1544033527-b192daee1f5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VpZ2h0JTIwcmFja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
            </div>
        </div>
    </div>
</section>
</body>
</html>`;

}