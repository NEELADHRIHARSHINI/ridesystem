import { useEffect, useState } from "react";

function DriverSearch({ onComplete }) {

  const [status, setStatus] = useState("Finding nearby drivers 🚗");

  useEffect(() => {

    const steps = [
      "Finding nearby drivers 🚗",
      "Matching best driver 📡",
      "Driver assigned ✅"
    ];

    let i = 0;

    const interval = setInterval(() => {
      setStatus(steps[i]);
      i++;

      if (i === steps.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete(); // 🔥 triggers Ride.js
        }, 800);
      }
    }, 1500);

    return () => clearInterval(interval); // ✅ cleanup

  }, []);

  return (
    <div style={overlay}>
      <div style={card}>
        <h2>{status}</h2>

        <div style={loader}></div>
      </div>
    </div>
  );
}

export default DriverSearch;

/* STYLES */
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  width: "300px"
};

const loader = {
  marginTop: "20px",
  border: "6px solid #eee",
  borderTop: "6px solid orange",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite"
};