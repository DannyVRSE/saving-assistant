import React from 'react'
import BackBtn from './BackBtn';

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

    return (
        <div className="card w-100 mt-3 border-primary">
            
            <div className="card-body">

                <div>
                    <h1># {props.index + 1}</h1>

                    <h2>Financial Goals</h2>

                    {props.goals.map((goal, index) => (
                        <ol key={index}>
                            <li>{goal}</li>
                        </ol>
                    ))}   
                </div>

                <div>
                    <h2>Target amount: ${props.targetAmount}</h2>
                </div>
                <div>
                    <h2>Duration</h2>
                    <p>Start Date: {props.startDate.split("T")[0]}</p>
                    <p>End Date: {props.endDate.split("T")[0]}</p>
                    <p>Duration: {days} days</p>
                </div>
                
                <div>
                    <h2>Saving Plan</h2>
                    <p>Daily: ${Math.floor(dailyAmount)} </p>
                    <p>Weekly: ${Math.floor(dailyAmount*7)}</p>
                    <p>Monthly: ${Math.floor(dailyAmount*30)} </p>
                    <p>Annual: ${Math.floor(dailyAmount*365)}</p>
                </div>
            </div>
        </div>
    )
}

export default Plan
