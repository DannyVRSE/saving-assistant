import { useNavigate } from "react-router-dom";
const Failure = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="failure">
                <div className="inner-div-1">
                    <div className="card w-50">
                        <div className="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                            </svg>
                            <p className="card-text">Failed to log in! Please try again</p>
                            <a className="btn btn-primary" onClick={()=>navigate("/login")} role="button">Login</a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Failure;