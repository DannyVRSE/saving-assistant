import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

const Plan = (props) => {

    //find the duration of the plan
    const duration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.abs(end - start);
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days;
    }

    //calculate the daily amount to save
    const days = duration(props.startDate, props.endDate);
    const dailyAmount = props.targetAmount / days;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={props.synced ? "card w-100 mt-3 border-success" : "card w-100 mt-3 border-warning"}>
            <div className="card-header">
                <p>{props.synced ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg> Synced Plan</> : <>Unsynced Plan!</>}</p>
            </div>

            <div className="card-body">

                <div>
                    <h1>{props.synced?<># {props.index + 1}</>:null}</h1>

                    <h2>Goals</h2>

                    {props.goals.map((goal, index) => (
                        <ul key={index}>
                            <li>{goal}</li>
                        </ul>
                    ))}
                </div>

                <div>
                    <h2>Target: ${props.targetAmount}</h2>
                </div>
                <div className="mt-3">
                    <h2>Duration</h2>
                    <p>Start Date: {props.startDate.split("T")[0]}</p>
                    <p>End Date: {props.endDate.split("T")[0]}</p>
                    <p>Duration: {days} days</p>
                </div>
                <div className="mt-3">
                    <div ref={componentRef}>
                        <h2>Savings Plan</h2>
                        <div className="table-responsive">
                            <table className="table table-striped table-bodered">
                                <thead>
                                    <tr>
                                        <th scope="col">Period</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Daily</td>
                                        <td>${Math.floor(dailyAmount)}</td>
                                    </tr>
                                    <tr>
                                        <td>Weekly</td>
                                        <td>${Math.floor(dailyAmount * 7)}</td>
                                    </tr>
                                    <tr>
                                        <td>Monthly</td>
                                        <td>${Math.floor(dailyAmount * 30)}</td>
                                    </tr>
                                    <tr>
                                        <td>Annual</td>
                                        <td>${Math.floor(dailyAmount * 365)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handlePrint}>Pdf <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                    <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                </svg></button>
            </div>
        </div>
    )
}

export default Plan
