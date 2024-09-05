import React, { useEffect, useState } from 'react';
import Plan from '../Components/Plan';
import BackBtn from '../Components/BackBtn';
import axios from 'axios';

const Plans = () => {
  const [plans, setPlans] = useState([])

  const fetchPlans = () => {
    axios.get("/api/v1/plans/")
      .then((response) => {
        setPlans(response.data.plans)
        console.log(plans)
      })
  }

  //fetch plans on render
  useEffect(() => {
    fetchPlans()
  }, [])

  return (
    <div className="container">
      <div className="inner-div-2">
      <BackBtn/>
      <br/>
        <h1>My plans</h1>
        <button className="btn btn-primary" onClick={fetchPlans}>Refresh</button>
      </div>
      <div>
        {
          plans.map((plan, index) => (
            <div key={plan.id}>
              <Plan
                index={index}
                goals={plan.goals}
                startDate={plan.startDate}
                endDate={plan.endDate}
                targetAmount={plan.targetAmount} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Plans
