import { Outlet, Link } from 'react-router-dom';
import logo from "../Assets/logo.jpg";
const Layout = () => {
  return (
    <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://edu.ieee.org/ke-uonbi/" target="_blank"><img src={logo} height="30"/> NestEgg</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                                <li className="nav-item"><Link to="/create" className="nav-link active">Create</Link></li>
                                <li className="nav-item"><Link to="/plans" className="nav-link active">My Plans</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet /></>
  )
}
export default Layout
