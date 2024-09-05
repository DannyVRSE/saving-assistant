const Login = () => {
    return (<>
        <div className="container">
            <div className="inner-div-2">
                <div className="outer-div">
                    <div className="card w-75 login-card">
                        <div className="card-body">
                            <form className="login-form" autoComplete="off" action="api/v1/users/login" method="POST" >
                                <legend><h1>Login</h1></legend>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="email" id="form2Example1" name="username" className="form-control" autoComplete="off" />
                                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="password" id="form2Example2" name="password" className="form-control" autoComplete="off" />
                                    <label className="form-label" htmlFor="form2Example2">Password</label>
                                </div>
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
};

export default Login;