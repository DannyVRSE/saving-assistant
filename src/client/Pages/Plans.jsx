import React, { useEffect, useState } from 'react';
import { db } from '../Models/db';
import syncPlans from '../Models/sync';
import Plan from '../Components/Plan';
import BackBtn from '../Components/BackBtn';
import { useLiveQuery } from 'dexie-react-hooks';

const Plans = () => {

  const [syncedPlans, setSyncedPlans] = useState([]);
  const [unSyncedPlans, setUnSyncedPlans] = useState([]);

  const fetchedFromRemote = useLiveQuery(() => db.synced.toArray());
  const fetchedFromLocal = useLiveQuery(() => db.unSynced.toArray());

  useEffect(() => {
    setSyncedPlans(fetchedFromRemote)
    setUnSyncedPlans(fetchedFromLocal)
  }, [fetchedFromLocal])

  const handleSync = async () => {
    alert(await syncPlans())
  }

  return (
    <div className="container">
      <div className="inner-div-2">
        <BackBtn />
        <br />
        <h1>My plans</h1>
      </div>
      <br />
      <div>
        <button className={unSyncedPlans == undefined || unSyncedPlans == [] ? "btn btn-primary" : "btn btn-success"} onClick={handleSync}>{unSyncedPlans == undefined || unSyncedPlans == [] ? <>Sync <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
          <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
        </svg></> : <>Synced <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-check-fill" viewBox="0 0 16 16">
          <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 4.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
        </svg></>}</button>
        <div>
          {
            unSyncedPlans?.map((plan, index) => (
              <div key={index}>
                <Plan
                  synced={false}
                  index={index}
                  goals={plan.goals}
                  startDate={plan.startDate}
                  endDate={plan.endDate}
                  targetAmount={plan.targetAmount} />
              </div>
            ))}
        </div>
      </div>
      <br />
      <div>
        {
          syncedPlans?.map((plan, index) => (
            <div key={plan.id}>
              <Plan
                synced={true}
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
