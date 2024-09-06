import { useState } from 'react';
import createPlan from '../Models/createPlan';


const Create = () => {

  //get auth context

  let defaultGoals = [
    'Retirement',
    'Emergency Fund',
    'Vacation',
    'Education',
    'Home Purchase'
  ];


  const [goals, setGoals] = useState(defaultGoals);

  const [plan, setPlan] = useState({
    goals: [],
    startDate: '',
    endDate: '',
    targetAmount: 0
  });

  const [addCustomPopup, setAddCustomPopup] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleSelectGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
      setPlan(prevdata => ({ ...prevdata, goals: [...selectedGoals, goal] }));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPlan(prevdata => ({ ...prevdata, [name]: value }));
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    console.log(customGoal, 'customGoal');
    setGoals((prevGoals) => [...prevGoals, customGoal]);
    setCustomGoal(''); // Clear the input after submission
    setAddCustomPopup(false); // Close the popup after submission
  };

  const handleCustomChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCustomGoal(value);
  };

  //submit the plan
  const handleSubmit = async () => {
    try{
    await createPlan(plan);
    alert('Plan created successfully');
    window.location.href = '/';
    }catch(err){
      alert('Error creating plan. Please try again');
    }
  }


  return (
    <>
      <div className="container">
        <div className="inner-div-2">
            <div className="card">
              <div className="card-header"><h2>Create Plan</h2></div>
              <div className="card-body">

                {addCustomPopup && <div className='popup-card-overlay'>
                  <div className='popup-card-content'>
                    <div className="card">
                      <div className="card-header text-bg-info d-flex justify-content-between align-items-center"><h2>Add Custom Goal</h2> <button onClick={() => setAddCustomPopup(false)} className="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg></button></div>
                      <div className="card-body">
                        <form onSubmit={handleCustomSubmit}>
                          <div className="form-group">
                            <label>Goal</label>
                            <input
                              type="text"
                              className="form-control"
                              name="customGoal"
                              value={customGoal}
                              onChange={handleCustomChange}
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="goal">Select Financial Goals</label>
                    <div className='mt-3'>
                      <button onClick={() => setAddCustomPopup(true)} className="btn btn-outline-info">Custom</button>
                      <button onClick={() => setGoals(defaultGoals)} className="btn btn-outline-warning ms-3">Reset</button>
                      <button onClick={() => setSelectedGoals([])} className="btn btn-outline-danger ms-3">Clear</button>
                    </div>

                    <ul className='mt-3'>
                      {goals.map((goal, index) => (
                        <li key={index}>
                          <label>
                            <input
                              type="checkbox"
                              value={goal}
                              checked={selectedGoals.includes(goal)}
                              onChange={() => handleSelectGoal(goal)}
                            />
                            {goal}
                          </label>
                        </li>
                      ))}

                    </ul>
                  </div>

                  <div>
                    <h4>Selected Goals:</h4>
                    <ul>
                      {selectedGoals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={plan.startDate} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" className="form-control" name="endDate" value={plan.endDate} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Target Amount</label>
                    <input type="number" className="form-control" name="targetAmount" value={plan.targetAmount} onChange={handleChange} required />
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">Submit</button>

                </form>
              </div>
            </div>
        </div>
      </div>

    </>
  )
}

export default Create
