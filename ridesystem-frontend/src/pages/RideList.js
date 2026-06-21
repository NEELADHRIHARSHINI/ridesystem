import { useEffect, useState } from "react";

function RideList() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8084/api/rides")
      .then(res => res.json())
      .then(data => setRides(data))
      .catch(err => console.error(err));
  }, []);

  const refreshRides = async () => {
    const updated = await fetch("http://localhost:8084/api/rides")
      .then(res => res.json());
    setRides(updated);
  };

  const autoAssign = async (id) => {
    try {
      await fetch(`http://localhost:8084/api/rides/${id}/auto-assign`, {
        method: "PUT",
      });

      alert("Driver Assigned ✅");
      refreshRides();
    } catch {
      alert("Error assigning driver ❌");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:8084/api/rides/${id}/status?status=${status}`,
        { method: "PUT" }
      );

      alert("Status Updated ✅");
      refreshRides();
    } catch {
      alert("Error updating status ❌");
    }
  };

  return (
    <div>
      <h2>All Rides</h2>

      {rides.map((ride) => (
        <div key={ride.id}>
          <p>🚕 {ride.pickupLocation} → {ride.dropLocation}</p>
          <p>Status: {ride.status}</p>

          <p>
            Driver: {ride.driver ? ride.driver.name : "Not Assigned"}
          </p>

          {/* AUTO ASSIGN */}
{/* AUTO ASSIGN */}
<button
  onClick={() => autoAssign(ride.id)}
  disabled={ride.driver !== null || ride.status !== "BOOKED"}
>
  {ride.driver ? "Assigned ✅" : "Auto Assign 🚕"}
</button>

{/* START RIDE */}
<button
  onClick={() => updateStatus(ride.id, "STARTED")}
  disabled={!ride.driver || ride.status !== "BOOKED"}
>
  {ride.status === "STARTED" ? "Started ✅" : "Start Ride ▶️"}
</button>

{/* COMPLETE RIDE */}
<button
  onClick={() => updateStatus(ride.id, "COMPLETED")}
  disabled={ride.status !== "STARTED"}
>
  {ride.status === "COMPLETED" ? "Completed ✅" : "Complete Ride 🏁"}
</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default RideList;