import { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaMoon, FaSun } from "react-icons/fa";
import TrackPage from "./TrackPage";

/* 🚗 CAR ICON */

/* LOGO */
const Logo = () => (
  <svg width="40" viewBox="0 0 512 300">
    <rect x="60" y="120" rx="20" width="300" height="80" fill="#0f172a" />
    <polygon points="100,120 180,80 300,80 340,120" fill="#0f172a" />
    <circle cx="130" cy="210" r="25" fill="#222" />
    <circle cx="300" cy="210" r="25" fill="#222" />
    <circle cx="380" cy="90" r="28" fill="#e11d48" />
  </svg>
);

function Ride({ onLogout, onTrack }) {
  const playSuccessSound = () => {
    const audio = new Audio("/success.mp3");
    if (audio) audio.play().catch(() => {});
  };
  const [dark, setDark] = useState(false);
 const bookRideAPI = async () => {

  if (!ride.pickup || !ride.drop) {
    alert("Select pickup & drop location");
    return;
  }

  console.log("🚀 Sending:", ride);

  try {
    const response = await fetch("http://localhost:8084/api/rides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pickupLocation: ride.pickup,
        dropLocation: ride.drop,
        distance: Number(distance),
        fare: Number(fare),
        userId: 1
      })
    });

    if (!response.ok) {
      throw new Error("Failed to save ride");
    }

    const data = await response.json(); // ✅ NOW INSIDE FUNCTION
    console.log("✅ Ride saved:", data);

  } catch (error) {
    console.error("❌ API error:", error);
  }
 };
  /* PAYMENT STATES */
const [paymentMethod, setPaymentMethod] = useState("");
const [paymentSuccess, setPaymentSuccess] = useState(false);
const [processing, setProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPayment, setShowPayment] = useState(false); // ✅ NEW
const [upiApp, setUpiApp] = useState(""); // "gpay" or "phonepe"
const [upiId, setUpiId] = useState("");
const getPaymentColor = () => {
  if (paymentMethod === "GPay") return "#22c55e";     // green
  if (paymentMethod === "PhonePe") return "#7c3aed";  // purple
  if (paymentMethod === "card") return "#facc15";     // yellow
  return "#0f172a"; // default
};

  const [people, setPeople] = useState(1);
// ONLY NEW STATES ADDED (rest unchanged)
const [screen, setScreen] = useState("ride"); 
// ride | success | receipt | finding | assigned | driver

const [driverData, setDriverData] = useState(null);
const [rideStatus, setRideStatus] = useState("");
const [driver, setDriver] = useState(null);
const [showRating, setShowRating] = useState(false);
const [rating, setRating] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [fare, setFare] = useState(0);

  const [ride, setRide] = useState({
    pickup: "",
    drop: "",
    pickupCoords: null,
    dropCoords: null
  });

  const [routeCoords, setRouteCoords] = useState([]);
  const [carPosition, setCarPosition] = useState(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);

  const timerRef = useRef(null);

  const theme = dark ? darkStyles : lightStyles;

  /* SEARCH */
  const search = (q, type) => {
    clearTimeout(timerRef.current);

    setRide(prev => ({ ...prev, [type]: q }));

    timerRef.current = setTimeout(async () => {
      if (!q) return;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json`
      );

      const data = await res.json();

      if (type === "pickup") setPickupSuggestions(data.slice(0, 5));
      else setDropSuggestions(data.slice(0, 5));
    }, 400);
  };

  /* SELECT LOCATION */
  const selectLocation = (place, type) => {
    const coords = {
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon)
    };

    if (type === "pickup") {
      setRide(prev => ({ ...prev, pickup: place.display_name, pickupCoords: coords }));
      setPickupSuggestions([]);
    } else {
      setRide(prev => ({ ...prev, drop: place.display_name, dropCoords: coords }));
      setDropSuggestions([]);
    }
  };

  /* ROUTE */
  const calculateRoute = async (pickup, drop) => {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${pickup.lon},${pickup.lat};${drop.lon},${drop.lat}?overview=full&geometries=geojson`
    );

    const data = await res.json();
    if (!data.routes || data.routes.length === 0) return;
    const km = (data.routes[0].distance / 1000).toFixed(2);
    const mins = Math.ceil(data.routes[0].duration / 60);

    setDistance(km);
    setTime(mins);

    let pricePerKm = people > 1 ? 15 : 8;
    setFare(Math.round(km * pricePerKm));

    const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
    setRouteCoords(coords);
  };

  useEffect(() => {
    if (ride.pickupCoords && ride.dropCoords) {
      calculateRoute(ride.pickupCoords, ride.dropCoords);
    }
  }, [ride.pickupCoords, ride.dropCoords, people]);

  /* CAR MOVEMENT */
  useEffect(() => {
    if (routeCoords.length > 0) {
      let i = 0;

      const interval = setInterval(() => {
        if (i >= routeCoords.length) {
          clearInterval(interval);
          return;
        }

        setCarPosition(routeCoords[i]);
        i++;
      }, 200);

      return () => clearInterval(interval);
    }
  }, [routeCoords]);
  useEffect(() => {
  if (screen === "ratingSuccess") {
    const timer = setTimeout(() => {
      setScreen("thankyou");
    }, 5000); // ⏱ 2 sec

    return () => clearTimeout(timer);
  }
}, [screen]);

  const vehicleType = people > 1 ? "Car 🚗" : "Bike 🏍️";
  const startRideFlow = () => {
  setRideStatus("🔍 Searching driver...");

  setTimeout(() => {
    setDriver({
      name: "Ramesh",
      vehicle: vehicleType,
      number: "AP09 AB 1234",
      eta: "5 mins"
    });

    setRideStatus("🚗 Driver assigned");

    setTimeout(() => {
      setRideStatus("📍 Driver arriving");

      setTimeout(() => {
        setRideStatus("🟢 Trip started");

        setTimeout(() => {
          setRideStatus("✅ Trip completed");
        }, 5000);

      }, 4000);

    }, 3000);

  }, 2000);
};
if (screen === "liveTrip" && ride.pickupCoords && ride.dropCoords) {
  return (
    <TrackPage
      data={{ ride }}
      onBack={() => setScreen("completed")}
    />
  );
}


  return (
    <div style={theme.container}>

      {/* NAV */}
      <div style={theme.nav}>
        <div style={theme.logoBox}>
          <Logo />
          <h2>RideX</h2>
        </div>

        <div style={theme.rightNav}>
          <button onClick={() => setDark(!dark)} style={theme.iconBtn}>
            {dark ? <FaSun /> : <FaMoon />}
          </button>

          <button onClick={onLogout} style={theme.logout}>
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={theme.main}>
        <div style={theme.card}>

          {/* INPUTS */}
          <div style={theme.inputWrapper}>
            <input
              value={ride.pickup}
              placeholder="Pickup location"
              style={theme.input}
              onChange={(e) => search(e.target.value, "pickup")}
            />
            {pickupSuggestions.length > 0 && (
              <div style={theme.dropdown}>
                {pickupSuggestions.map((p, i) => (
                  <div key={i} style={theme.item} onClick={() => selectLocation(p, "pickup")}>
                    {p.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button style={theme.liveBtn}>
            <FaMapMarkerAlt /> Live
          </button>

          <div style={theme.inputWrapper}>
            <input
              value={ride.drop}
              placeholder="Drop location"
              style={theme.input}
              onChange={(e) => search(e.target.value, "drop")}
            />
            {dropSuggestions.length > 0 && (
              <div style={theme.dropdown}>
                {dropSuggestions.map((p, i) => (
                  <div key={i} style={theme.item} onClick={() => selectLocation(p, "drop")}>
                    {p.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
<select
  value={people}
  onChange={(e) => setPeople(Number(e.target.value))}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    height: "40px",   // 🔥 FIX
    background: "#fff",
    color: "#000"
  }}
>
  <option value={1}>1 Person</option>
  <option value={2}>2 People</option>
  <option value={3}>3 People</option>
  <option value={4}>4 People</option> {/* ✅ NEW */}
</select>

          <div style={theme.centerBox}>
            <p>{vehicleType}</p>
            <p>₹{fare} | {distance} km | {time} mins</p>
          </div>
             



          {/* BOOK */}
          <button style={theme.bookBtn} onClick={() => setShowPayment(true)}>
            Book Ride
          </button>

          
        </div>
      </div>

      {/* PAYMENT */}
  <style>
{`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes successPop {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes ripple {
  0% { transform: scale(0); opacity: 0.5; }
  100% { transform: scale(4); opacity: 0; }
}
`}
</style>    


{showPayment && (
  <div style={theme.overlay}>
    <div style={paymentCard}>

      <h3 style={{ color: "#fff" }}>Select Payment Method</h3>
<p style={{ color: "#9ca3af" }}>Amount: ₹{fare}</p>

      

      {/* PAYMENT OPTIONS */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "22px" }}>

        {/* GPay */}
        <div
         onClick={() => {
  setPaymentMethod("GPay");   // ✅ IMPORTANT
  setUpiApp("gpay");
}}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "14px",
            border:
              paymentMethod === "GPay"
                ? "2px solid #34a853"
                : "1px solid #e5e7eb",
            background:
              paymentMethod === "GPay"
    ? "#22c55e"
    : "#1f2937",   // dark background
color: "#fff",
            textAlign: "center",
            cursor: "pointer",
            minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
gap: "6px",
          }}
        >
          <img 
  src="/gpay.png" 
  alt="GPay" 
  style={{ width: "28px" }}
/>
          <p>GPay</p>
        </div>

        {/* PhonePe */}
        <div
          onClick={() => {
  setPaymentMethod("PhonePe");  // ✅ IMPORTANT
  setUpiApp("phonepe");
}}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "14px",
            border:
              paymentMethod === "PhonePe"
                ? "2px solid #7c3aed"
                : "1px solid #e5e7eb",
            background:
  paymentMethod === "PhonePe"
    ? "#7c3aed"
    : "#1f2937",
color: "#fff",
            textAlign: "center",
            cursor: "pointer",
            minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
gap: "6px",
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" width="38" />
          <p>PhonePe</p>
        </div>

        {/* CARD */}
       <div
  onClick={() => setPaymentMethod("card")}
  style={{
    flex: 1,
    padding: "14px",
    borderRadius: "16px",
    border: paymentMethod === "card"
      ? "2px solid #facc15"
      : "1px solid #e5e7eb",
    background: paymentMethod === "card"
      ? "#facc15"
      : "#1f2937",
    color: paymentMethod === "card" ? "#000" : "#fff",
    textAlign: "center",
    cursor: "pointer",
    minHeight: "90px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
gap: "6px",
  }}
>
  <img
      src="https://cdn-icons-png.flaticon.com/512/633/633611.png"
      alt="Card"
      style={{ width: "28px", height: "28px", marginBottom: "6px" }}
    />

  <h4>Card</h4>
</div>
</div>

      {/* UPI */}
      {(paymentMethod === "GPay" || paymentMethod === "PhonePe") && (
        <div style={{
  marginTop: "20px",
  padding: "20px",
  borderRadius: "16px",
  background: getPaymentColor(),
  display: "flex",
  flexDirection: "column",
  gap: "12px"   // 🔥 spacing fix
}}>

          <h4>
            {upiApp === "gpay" ? "Google Pay" : "PhonePe"}
          </h4>
<input
  placeholder="Enter UPI ID"
  value={upiId}
  onChange={(e) => setUpiId(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",

    marginTop: "6px",

    boxSizing: "border-box",   // 🔥 IMPORTANT FIX
    background: "#fff",
    color: "#000"
  }}
/>
          

          <button
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#e11d48",
    color: "#fff",
    fontWeight: "600",
    marginTop: "10px",
    cursor: "pointer"
  }}
  onClick={async () => {

  if (!upiId) {
    alert("Enter UPI ID");
    return;
  }

  setProcessing(true);

  setTimeout(async () => {

    setProcessing(false);

    // ✅ API CALL (ONLY ONCE)
    await bookRideAPI();

    setShowPayment(false);
    setScreen("success");
    playSuccessSound();

    setTimeout(() => setScreen("receipt"), 2000);
    setTimeout(() => setScreen("finding"), 4000);
    setTimeout(() => setScreen("assigned"), 6000);

    setTimeout(() => {
      setDriverData({
        name: "Ramesh",
        number: "AP09 AB 1234",
        vehicle: "Swift Dzire (White)",
        eta: "5 mins"
      });
      setScreen("driver");
    }, 8000);

    setUpiId("");
    setUpiApp("");

  }, 1500);
}}

>
  {processing
    ? "Processing..."
    : `Pay via ${paymentMethod}`}
</button>

          {processing && (
            <p style={{ marginTop: "10px" }}>
              ⏳ Processing payment...
            </p>
          )}
        </div>
      )}

      {/* CARD */}
      {paymentMethod === "card" && (
        <div style={{
  marginTop: "15px",
  padding: "15px",
  borderRadius: "12px",
  background: getPaymentColor(), // 🟡 yellow
}}> 
    <p>Card</p>

          <input
  placeholder="Card Number"
  style={{
  width: "100%",
    maxWidth: "290px",     // ✅ prevents overflow
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",

    boxSizing: "border-box",  // 🔥 KEY FIX

    background: "#fff",
    color: "#000"
}}
/>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
    placeholder="MM/YY"
    style={{
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  background: "#fff",
  color: "#000",
  marginTop: "5px"
}}
  />
  <input
    placeholder="CVV"
    style={{
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  background: "#fff",
  color: "#000",
  marginTop: "5px"
}}
  />

            
          </div>

          <button
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#e11d48",
    color: "#fff",
    fontWeight: "600",
    marginTop: "10px",
    cursor: "pointer"
  }}
  onClick={async () => {

  setProcessing(true);

  setTimeout(async () => {

    setProcessing(false);

    await bookRideAPI(); // ✅ ADD THIS

    setShowPayment(false);
    setScreen("success");

setTimeout(() => {
  setScreen("receipt");
}, 2000);
setTimeout(() => {
  setScreen("finding");
}, 4000);

setTimeout(() => {
  setScreen("assigned");
}, 6000);

setTimeout(() => {
  setDriverData({
    name: "Ramesh",
    number: "AP09 AB 1234",
    vehicle: "Swift Dzire (White)",
    eta: "5 mins"
  });
  setScreen("driver");
}, 8000);
}, 1500);
}}
          >
            {processing ? "Processing..." : `Pay ₹${fare}`}
          </button>

          {processing && (
            <p style={{ marginTop: "10px" }}>
              ⏳ Processing payment...
            </p>
          )}
        </div>
      )}

      {/* SUCCESS */}
     
      <button
  onClick={() => setShowPayment(false)}
  style={{
    marginTop: "14px",
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #374151",
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
    fontWeight: "500"
  }}
>
  Cancel
</button>

    </div>
  </div>
)}
{/* RECEIPT */}
      
  {screen === "success" && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <div style={{
        width: "80px",
        height: "80px",
        background: "#22c55e",
        borderRadius: "50%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* SVG CHECK */}
        <svg width="40" height="40" fill="#fff" viewBox="0 0 24 24">
          <path d="M20.285 6.709l-11.4 11.4-5.171-5.171 1.414-1.414 3.757 3.757 
          9.986-9.986z"/>
        </svg>
      </div>

      <h3 style={{ marginTop: "15px" }}>Payment Successful</h3>
      <p style={{ color: "#6b7280" }}>Your payment was processed</p>

      <h2>₹{fare}</h2>
<p style={{ fontSize: "12px", color: "#6b7280" }}>
  Paid via {paymentMethod}
</p>
      

    </div>
  </div>
)}    
{screen === "receipt" && (
  <div style={fullScreen}>
    <div style={card}>
      <h3>Ride Receipt</h3>

      <p>📍 {ride.pickup}</p>
      <p>📍 {ride.drop}</p>

      <hr />

      <p>Vehicle: {vehicleType}</p>
      <p>Distance: {distance} km</p>
      <p>Time: {time} mins</p>
      <p>Fare: ₹{fare}</p>
      <button 
  style={theme.bookBtn}
  onClick={() => setScreen("finding")}
>
  Continue
</button>
      
    </div>
  </div>
)}
{screen === "finding" && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <div style={iconCircleGreen}>
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    
    {/* CAR */}
    <path
      d="M3 13L5 7H19L21 13V17H19V15H5V17H3V13Z"
      stroke="#16a34a"
      strokeWidth="1.5"
      fill="none"
    />
    
    {/* WHEELS */}
    <circle cx="7" cy="16" r="1.5" fill="#16a34a" />
    <circle cx="17" cy="16" r="1.5" fill="#16a34a" />

    {/* MAGNIFYING GLASS */}
    <circle cx="16.5" cy="7.5" r="3" stroke="#16a34a" strokeWidth="1.5"/>
    <line x1="19" y1="10" x2="22" y2="13" stroke="#16a34a" strokeWidth="1.5"/>

  </svg>
</div>

      <h3>Finding Driver...</h3>
      <p style={{ color: "#6b7280" }}>
        Please wait while we find best driver
      </p>

      <div>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

    </div>
  </div>
)}
{screen === "assigned" && (
  <div style={popupOverlay}>
    <div style={popupCard}>
    <div style={iconCircleBlue}>
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">

    {/* CAR */}
    <path
      d="M3 13L5 7H19L21 13V17H19V15H5V17H3V13Z"
      stroke="#6d28d9"
      strokeWidth="1.5"
      fill="none"
    />

    {/* WHEELS */}
    <circle cx="7" cy="16" r="1.5" fill="#6d28d9" />
    <circle cx="17" cy="16" r="1.5" fill="#6d28d9" />

    {/* TICK MARK */}
    <circle cx="19" cy="6" r="3" fill="#22c55e" />
    <path
      d="M18 6L19 7L21 5"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

  </svg>
</div>
      

      <h3>Driver Assigned!</h3>
      <p style={{ color: "#6b7280" }}>
        Your driver is on the way
      </p>

      <div>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

    </div>
  </div>
)}
{screen === "driver" && driverData && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          marginBottom: "10px"
        }}
      />

      <h3>Your Driver is Arriving</h3>
      <p style={{ color: "#6b7280" }}>
        You will start your trip soon
      </p>

      <hr />

      <p>👤 {driverData.name}</p>
      <p>🚗 {driverData.number}</p>
      <p>🚘 {driverData.vehicle}</p>
      <p>⏱ {driverData.eta}</p>

      <button
  style={startBtn}
  onClick={() => {
  setScreen("liveTrip");   // go to map
}}
>
  Start Trip
</button>
</div>
  </div>
)}
{screen === "tripStarted" && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <div style={{
        width: "80px",
        height: "80px",
        background: "#dbeafe",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto"
      }}>
        🚗
      </div>

      <h3>Trip Started</h3>
      <p style={{ color: "#6b7280" }}>
        Enjoy your ride 🚘
      </p>

      <button
        style={startBtn}
        onClick={() => setScreen("liveTrip")}
      >
        Track Ride
      </button>

    </div>
  </div>
)}
{screen === "completed" && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <div style={{
        width: "80px",
        height: "80px",
        background: "#22c55e",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto"
      }}>
        ✓
      </div>

      <h3>Trip Completed</h3>
      <p style={{ color: "#6b7280" }}>
        Hope you had a safe ride
      </p>

      <h2>₹{fare}</h2>
      <button
  style={startBtn}
  onClick={() => setShowRating(true)}
>
  Rate Driver ⭐
</button>
      

    </div>
  </div>
)}
{showRating && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <h3>Rate Your Driver</h3>
      <p style={{ color: "#6b7280" }}>
        How was your ride?
      </p>

      {/* ⭐ STARS */}
      <div style={{ fontSize: "28px", margin: "15px 0" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "#facc15" : "#d1d5db"
            }}
          >
            ★
          </span>
        ))}
      </div>

      <button
        style={startBtn}
        onClick={() => {
          setShowRating(false);
          setRating(0);
          setScreen("ratingSuccess");
        }}
      >
        Submit
      </button>

    </div>
  </div>
)}
{screen === "ratingSuccess" && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <div style={{
        width: "80px",
        height: "80px",
        background: "#22c55e",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto"
      }}>
        ✓
      </div>

      <h3 style={{ marginTop: "15px" }}>
        Thanks for your rating ⭐
      </h3>

      <p style={{ color: "#6b7280" }}>
        Your feedback helps us improve
      </p>

    </div>
  </div>
)}

{screen === "thankyou" && (
  <div style={popupOverlay}>
    <div style={popupCard}>

      <div style={{
        width: "80px",
        height: "80px",
        background: "#22c55e",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto"
      }}>
        ✓
      </div>

      <h3 style={{ marginTop: "15px" }}>
        Thanks for choosing RideX 🙏
      </h3>

      <p style={{ color: "#6b7280" }}>
        We hope you had a great ride!
      </p>

      <button
        style={startBtn}
        onClick={() => setScreen("home")} // or reset flow
      >
        Book Another Ride
      </button>

    </div>
  </div>
)}

    
    </div>
  );
}
export default Ride;

/* ===== STYLES (UNCHANGED) ===== */

const lightStyles = {
  container: { minHeight: "100vh", background: "#f3f4f6" },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb"
  },

  logoBox: { display: "flex", gap: "8px", alignItems: "center" },
  rightNav: { display: "flex", gap: "10px" },

  iconBtn: {
    padding: "10px",
    borderRadius: "50%",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer"
  },

  logout: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer"
  },

  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px"
  },

  card: {
    width: "380px",
    padding: "25px",
    background: "#fff",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
  },

  inputWrapper: { position: "relative" },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box"
  },

  dropdown: {
    position: "absolute",
    width: "100%",
    background: "#fff",
    zIndex: 10,
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  },

  item: { padding: "10px", cursor: "pointer" },

  liveBtn: {
    width: "100%",
    padding: "14px",
    background: "#e11d48",
    color: "#fff",
    border: "none",
    borderRadius: "10px"
  },

  bookBtn: {
    width: "100%",
    padding: "14px",
    background: "#e11d48",
    color: "#fff",
    border: "none",
    borderRadius: "10px"
  },

  trackBtn: {
    width: "100%",
    padding: "14px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px"
  },

  centerBox: { textAlign: "center", margin: "10px 0" },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
  background: "#0f172a", // 🔥 BLACK THEME
  color: "#fff",
  padding: "25px",
  borderRadius: "14px",
  width: "300px",
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.5)"
},

  closeBtn: {
    marginTop: "12px",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    background: "#e11d48",
    color: "#fff"
  }
};

const darkStyles = {
  ...lightStyles,
  container: { background: "#0f172a" },
  nav: { ...lightStyles.nav, background: "#1e293b", color: "#fff" },
  card: { ...lightStyles.card, background: "#1e293b", color: "#fff" },
  modal: { ...lightStyles.modal, background: "#1e293b", color: "#fff" }
};
const fullScreen = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  background: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};
const tickCircle = {
  width: "80px",
  height: "80px",
  background: "green",
  borderRadius: "50%",
  color: "#fff",
  fontSize: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto"
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "300px"
};
const iconCircleGreen = {
  width: "80px",
  height: "80px",
  background: "#dcfce7",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto"
};

const iconCircleBlue = {
  width: "80px",
  height: "80px",
  background: "#ede9fe",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto"
};



const avatarCircle = {
  width: "70px",
  height: "70px",
  background: "#dcfce7",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  margin: "auto",
  marginBottom: "10px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "8px 0"
};

const dotGreen = {
  height: "8px",
  width: "8px",
  background: "green",
  borderRadius: "50%",
  display: "inline-block",
  margin: "0 3px"
};

const dotBlue = {
  height: "8px",
  width: "8px",
  background: "#2563eb",
  borderRadius: "50%",
  display: "inline-block",
  margin: "0 3px"
};

const startBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#16a34a",
  color: "#fff",
  fontWeight: "600"
};
const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(12px)", // 🔥 GLASS EFFECT
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};
const popupCard = {
  background: "#fff", // 🔥 dark black-blue
  color: "#000",
  borderRadius: "20px",
  padding: "20px",
  width: "320px",
  textAlign: "center"
};
const formInput = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  height: "40px",
  background: "#fff",
  color: "#000"
};
const paymentCard = {
  background: "#0f172a",
  color: "#fff",
  borderRadius: "20px",
  padding: "20px",
  width: "320px",
  textAlign: "center"
};