import React, { useEffect, useState } from 'react';
import { db } from '../Models/db';
import syncPlans from '../Models/sync';
import Plan from '../Components/Plan';
import { useAuth } from "../Hooks/AuthContext";
import { useLiveQuery } from 'dexie-react-hooks';

const Plans = () => {

  const { user } = useAuth();

  const syncedPlans = useLiveQuery(() => db.synced.toArray());
  const unSyncedPlans = useLiveQuery(() => db.unSynced.toArray());

  const handleSync = async () => {
    try {
      await syncPlans();
      alert("Data synced successfully! Tip: Go to the home page and click my plans to see the changes");
    } catch (err) {
      alert("Error syncing data! Please try again")
    }
  }

  useEffect(() => {
  }, [unSyncedPlans]);

  return (
    <div className="container">
      <div className="inner-div-2">
        <br />
        <h1>My plans</h1>
      </div>
      <br />
      <div>
        {
          user && <>
                  <button className="btn btn-info" onClick={handleSync} disabled={unSyncedPlans?.length == 0}>{unSyncedPlans?.length == 0 ? <>All plans synced!</> : <>Sync</>}</button>
          </>
        }
        {
          !user && <button className="btn btn-info" disabled>Login to sync</button>
        }
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
