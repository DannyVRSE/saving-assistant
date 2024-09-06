import PWABadge from "../Components/PWABadge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";
import { useEffect, useState } from "react";
import populateLocalDB from "../Models/populateLocalDB";

const Home = () => {
  const navigate = useNavigate();
  const [loginPopup, setLoginPopup] = useState(false);

  const { user, loading, getUser } = useAuth();

  //sync data with local


  useEffect(() => {
    getUser();
    if (user) {
      //populate local DB
      populateLocalDB();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="inner-div-1">
          <h1>Welcome to NestEgg</h1>
          <h5>Save your money, save your future</h5>
          <br />
          <div>
            {user && <div>{loading && <div className="loader"></div>}<p>{user.fname} {user.lname}</p></div>}
          </div>
          <div>
            <button onClick={() => setLoginPopup(true)} style={user ? { pointerEvents: "none" } : {}} className={user ? "btn btn-success disabled ms-3" : "btn btn-primary home-btn"}>{user ? "Logged In" : "Log In"}</button>

            {loginPopup && <>
              <div className="popup-card-overlay">
                <div className="popup-card-content">
                  <div className="card login-card">
                    <div className="card-header text-bg-info d-flex justify-content-between align-items-center"><h2>Login</h2><button onClick={() => setLoginPopup(false)} className="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg></button></div>

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
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Log in</button>
                    </form>
                    </div>
                  </div>
                </div>
              </div></>}


            <button onClick={() => { navigate("/sign-up") }} role="button" disabled={user} className="btn btn-info ms-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
            </svg> {user ? "Joined" : "Join"}</button>

          </div>

          <div className="mt-4">
            <div className="row">

              <div className="col-6 col-lg-3 mb-3 d-flex align-items-stetch ">
                <div className="card border-primary">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">New Plan</h5>
                    <p className="card-text">Creat a new financial plan!</p>
                    <button className="btn btn-info" onClick={() => navigate("create")}>Create</button>
                  </div>
                </div>
              </div>

              <div className="col-6 col-lg-3 mb-3 d-flex align-items-stetch ">
                <div className="card border-primary">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">My Plans</h5>
                    <p className="card-text">A summary of my financial goals and details</p>
                    <button className="btn btn-info" onClick={() => navigate("/plans")} >Go <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16" >
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <PWABadge />
        </div>
      </div >
    </>
  )
}

export default Home
