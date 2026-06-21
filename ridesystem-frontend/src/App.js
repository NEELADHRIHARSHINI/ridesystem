import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ride from "./pages/Ride";
import TrackPage from "./pages/TrackPage"; // ✅ NEW

function App() {
  const [screen, setScreen] = useState("home");

  const [trackData, setTrackData] = useState(null); // ✅ NEW

  return (
    <>
      {screen === "home" && (
        <Home onStart={() => setScreen("login")} />
      )}

      {screen === "login" && (
        <Login
          onLogin={() => setScreen("ride")}
          onRegister={() => setScreen("register")}
        />
      )}

      {screen === "register" && (
        <Register onLogin={() => setScreen("ride")} />
      )}

      {screen === "ride" && (
        <Ride
          onLogout={() => setScreen("login")}
          onTrack={(data) => {
            setTrackData(data);
            setScreen("track"); // ✅ GO TO NEW PAGE
          }}
        />
      )}

      {screen === "track" && (
        <TrackPage
          data={trackData}
          onBack={() => setScreen("ride")}
        />
      )}
    </>
  );
}

export default App;