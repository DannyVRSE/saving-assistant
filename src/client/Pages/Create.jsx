import { useState } from 'react';
import BackBtn from '../Components/BackBtn';
import axios from 'axios';

const Create = () => {

  const [loading, setLoading] = useState(false);

  const [goals, setGoals] = useState([
    'Retirement',
    'Emergency Fund',
    'Vacation',
    'Education',
    'Home Purchase'
  ]);

  const [plan, setPlan] = useState({
    goals: [],
    startDate: '',
    endDate: '',
    targetAmount: 0
  });

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

  const handleSubmit = (e) => {
    console.log(plan);
    e.preventDefault();
    setLoading(true);
    axios.post('/api/v1/plans', plan)
      .then((response) => {
        console.log(response.data);
        alert('Plan created successfully');
      })
      .catch((error) => {
        alert(`Error creating plan! Details: ${error.response.data.message}`);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }


  return (
    <>
      <div className="container">
        <div className="inner-div-2">
          <BackBtn />
          <div className="card">
            <div className="card-header"><h2>Create Plan</h2></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="goal">Select Financial Goals</label>
                  <ul>
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
                    <button className="btn btn-primary mt-3" disabled>Add Custom</button>
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
