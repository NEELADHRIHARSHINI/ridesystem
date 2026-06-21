import { useState } from "react";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [screen, setScreen] = useState("login"); // login | home | about
  const [showContact, setShowContact] = useState(false);
 const [activeHelp, setActiveHelp] = useState(null);
// add "help" also
  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }
    onLogin();
  };

  return (
    <div> {/* ✅ FIX: single parent */}

      {/* 🔥 NAVBAR */}
      <div style={navBar}>
        <button onClick={() => setScreen("home")} style={navBtn}>Home</button>
        <button onClick={() => setScreen("about")} style={navBtn}>About Us</button>
        <button onClick={() => setShowContact(true)} style={navBtn}>Contact Us</button>
      </div>

      {/* 🔥 HOME */}
      {screen === "home" && (
  <div style={homeContainer}>

    <div style={homeContent}>
      
      {/* 🚗 ICON */}
      <div style={{ fontSize: "60px" }}>🚗</div>

      {/* LOGO */}
      <h1 style={homeTitle}>RideX</h1>

      <p style={homeTag}>YOUR RIDE. YOUR WAY.</p>

      {/* BUTTON */}
      <button
        style={homeBtn}
        onClick={() => setScreen("login")}
      >
        →
      </button>

    </div>

  </div>
)}

      {/* 🔥 ABOUT */}
      {screen === "about" && (
  <div style={aboutContainer}>

    <div style={aboutCard}>

      <h2 style={aboutTitle}>About RideX</h2>

      <p style={aboutDesc}>
        RideX is redefining urban mobility with a seamless blend of technology,
        reliability, and user-centric design. Our platform connects riders with
        trusted drivers while ensuring speed, safety, and transparency in every journey.
      </p>

      {/* FEATURES */}
      <div style={featuresGrid}>

        <div style={featureBox}>
          <span style={icon}>🚀</span>
          <h4>Smart Rides</h4>
          <p>Optimized routes for faster and efficient travel.</p>
        </div>

        <div style={featureBox}>
          <span style={icon}>📍</span>
          <h4>Live Tracking</h4>
          <p>Track your ride in real-time with precision.</p>
        </div>

        <div style={featureBox}>
          <span style={icon}>💳</span>
          <h4>Secure Payments</h4>
          <p>Multiple payment options with complete safety.</p>
        </div>

      </div>

      {/* VISION */}
      <div style={visionBox}>
        <h4>Our Vision</h4>
        <p>
          To build the most reliable and user-friendly ride platform that empowers
          everyday travel with innovation and trust.
        </p>
      </div>

      <button style={backBtn} onClick={() => setScreen("login")}>
        Back
      </button>

    </div>

  </div>
)}
{screen === "help" && (
  <div style={helpContainer}>

    <div style={helpCard}>

      <h2 style={helpTitle}>Help & Learning Centre</h2>

      <p style={helpDesc}>
        Find answers to common questions and learn how to use RideX efficiently.
      </p>

      {/* HELP ITEMS */}
      <div style={helpList}>

  {/* ITEM 1 */}
  <div
    style={helpItem}
    onClick={() => setActiveHelp(activeHelp === 1 ? null : 1)}
  >
    🚗 How to book a ride
  </div>

  {activeHelp === 1 && (
    <div style={answerBox}>
      🚗 

Enter your pickup and drop location in the app.
Choose your preferred vehicle based on comfort and pricing.
Select a payment method and confirm your booking to get a driver instantly.</div>
  )}

  {/* ITEM 2 */}
  <div
    style={helpItem}
    onClick={() => setActiveHelp(activeHelp === 2 ? null : 2)}
  >
    💳 Payment methods & issues
  </div>

  {activeHelp === 2 && (
    <div style={answerBox}>

💳 

You can pay using GPay, PhonePe, or debit/credit cards.
Ensure your payment details are correct and sufficient balance is available.
If a payment fails, try again or switch to another method.
    </div>
  )}

  {/* ITEM 3 */}
  <div
    style={helpItem}
    onClick={() => setActiveHelp(activeHelp === 3 ? null : 3)}
  >
    📍 Tracking your ride
  </div>

  {activeHelp === 3 && (
    <div style={answerBox}>

📍 

Once your ride is confirmed, you can track the driver in real-time.
The map shows the exact location and movement of your driver.
You will also get updates on arrival time and trip progress.
      
    </div>
  )}

  {/* ITEM 4 */}
  <div
    style={helpItem}
    onClick={() => setActiveHelp(activeHelp === 4 ? null : 4)}
  >
    ❌ Cancelling a ride
  </div>

  {activeHelp === 4 && (
    <div style={answerBox}>
      ❌

You can cancel a ride before the driver arrives.
A small cancellation fee may apply depending on timing.
Frequent cancellations may affect your booking priority.
      
    </div>
  )}

  {/* ITEM 5 */}
  <div
    style={helpItem}
    onClick={() => setActiveHelp(activeHelp === 5 ? null : 5)}
  >
    ⭐ Ratings & feedback
  </div>
  </div>

  {activeHelp === 5 && (
    <div style={answerBox}>
      ⭐

After completing the ride, you can rate your driver.
Provide honest feedback to help improve service quality.
Your ratings help maintain a safe and reliable platform.
    </div>
  )}

</div>
  </div>
)}

      {/* 🔥 LOGIN SCREEN */}
      {screen === "login" && (
        <div style={container}>
          <div style={mainCard}>

            {/* LEFT */}
            <div style={left}>
              <h1 style={logo}>RideX</h1>
              <h2 style={title}>Welcome Back</h2>

              <input
                style={input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                style={input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button style={btn} onClick={handleLogin}>
                Log in
              </button>

              <p style={bottomText}>
                New user?{" "}
                <span style={link} onClick={onRegister}>
                  Sign up
                </span>
              </p>
            </div>

            {/* RIGHT */}
            <div style={right}>
              <div style={accentGlow}></div>
              <div style={glassShape}></div>
            </div>

          </div>
        </div>
      )}

      {/* 🔥 CONTACT PANEL */}
      {showContact && (
        <div style={overlay}>
          <div style={contactPanel}>

  {/* HEADER */}
  <div style={contactHeader}>
    <h3 style={{ margin: 0 }}>Contact Us</h3>
    <span style={closeIcon} onClick={() => setShowContact(false)}>✕</span>
  </div>

  {/* DIVIDER */}
  <div style={divider}></div>

  {/* CONTACT ITEMS */}
  <div style={contactItem}>
    <span style={iconCircle}>📞</span>
    <div>
      <p style={label}>Phone</p>
      <p style={value}>+91 8978354882</p>
    </div>
  </div>

  <div style={contactItem}>
    <span style={iconCircle}>📧</span>
    <div>
      <p style={label}>Email</p>
      <p style={value}>support@ridex.com</p>
    </div>
  </div>

  <div style={contactItem}>
    <span style={iconCircle}>📍</span>
    <div>
      <p style={label}>Location</p>
      <p style={value}>Vijayawada, India</p>
    </div>
  </div>

  {/* SUPPORT BOX */}
  <div 
  style={{ ...supportBox, cursor: "pointer" }}
  onClick={() => {
    setShowContact(false);  // close panel
    setScreen("help");      // open help page
  }}
>
  <p style={{ margin: 0, fontWeight: "600" }}>Need Help?</p>
  <p style={{ fontSize: "12px", color: "#9ca3af" }}>
    Our support team is available 24/7 to assist you.
  </p>
</div>

  {/* BUTTON */}
  <button style={closeBtn} onClick={() => setShowContact(false)}>
    Close
  </button>

</div>
        </div>
      )}

    </div>
  );
}

export default Login;

/* ================= STYLES ================= */

/* BACKGROUND */
const container = {
  height: "100vh",
  background: "linear-gradient(135deg, #f8fafc, #eef2f7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

/* CARD */
const mainCard = {
  display: "flex",
  width: "900px",
  height: "520px",
  borderRadius: "30px",
  overflow: "hidden",

  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",

  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
};

/* LEFT */
const left = {
  flex: 1,
  padding: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#111827"
};

const logo = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "10px"
};

const title = {
  fontSize: "24px",
  marginBottom: "25px"
};

/* INPUT */
const input = {
  padding: "14px",
  borderRadius: "30px",
  marginBottom: "15px",
  fontSize: "14px",
  paddingLeft: "20px",

  background: "#f1f5f9",
  border: "1px solid #e5e7eb",
  color: "#111827",
  outline: "none"
};

/* BUTTON */
const btn = {
  marginTop: "10px",
  padding: "14px",
  borderRadius: "30px",
  border: "none",
  background: "linear-gradient(135deg,#e11d48,#fb7185)",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 25px rgba(225,29,72,0.3)"
};

const bottomText = {
  marginTop: "20px",
  fontSize: "14px",
  color: "#6b7280"
};

const link = {
  color: "#e11d48",
  fontWeight: "600",
  cursor: "pointer"
};

/* RIGHT */
const right = {
  flex: 1,
  position: "relative"
};

/* ACCENT GLOW */
const accentGlow = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "radial-gradient(circle, rgba(225,29,72,0.25), transparent)",
  top: "80px",
  left: "100px",
  borderRadius: "50%",
  filter: "blur(40px)"
};

/* FLOATING SHAPE */
const glassShape = {
  position: "absolute",
  width: "250px",
  height: "250px",
  background: "rgba(255,255,255,0.4)",
  borderRadius: "40px",
  bottom: "50px",
  right: "50px",
  transform: "rotate(25deg)",
  backdropFilter: "blur(10px)"
};
const navBar = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "15px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb"
};

const navBtn = {
  background: "none",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px"
};

const pageCenter = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.3)"
};



const contactPanel = {
  width: "300px",
  height: "100%",
  background: "#0f172a",
  color: "#fff",
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow: "5px 0 30px rgba(0,0,0,0.3)"
};

const contactHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const closeIcon = {
  cursor: "pointer",
  fontSize: "18px",
  opacity: 0.7
};

const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.1)"
};

const contactItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const iconCircle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#1f2937",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px"
};

const label = {
  margin: 0,
  fontSize: "12px",
  color: "#9ca3af"
};

const value = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "500"
};

const supportBox = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "10px",
  background: "#1f2937"
};

const closeBtn = {
  marginTop: "auto",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#e11d48",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer"
};
const homeContainer = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8fafc"
};

const homeContent = {
  textAlign: "center"
};

const homeTitle = {
  fontSize: "48px",
  fontWeight: "800",
  marginTop: "10px",
  color: "#111827"
};

const homeTag = {
  marginTop: "10px",
  letterSpacing: "2px",
  color: "#6b7280",
  fontSize: "12px"
};

const homeBtn = {
  marginTop: "40px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "none",
  background: "#e11d48",
  color: "#fff",
  fontSize: "24px",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(225,29,72,0.4)"
};
const aboutContainer = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f8fafc, #eef2f7)"
};

const aboutCard = {
  width: "700px",
  padding: "40px",
  borderRadius: "20px",
  background: "#fff",
  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const aboutTitle = {
  fontSize: "32px",
  fontWeight: "800",
  marginBottom: "15px"
};

const aboutDesc = {
  color: "#6b7280",
  fontSize: "15px",
  marginBottom: "25px",
  lineHeight: "1.6"
};

const featuresGrid = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  marginBottom: "25px"
};

const featureBox = {
  flex: 1,
  padding: "15px",
  borderRadius: "12px",
  background: "#f9fafb",
  textAlign: "center"
};

const icon = {
  fontSize: "22px"
};

const visionBox = {
  marginTop: "20px",
  padding: "15px",
  borderRadius: "12px",
  background: "#eef2ff"
};

const backBtn = {
  marginTop: "25px",
  padding: "12px 20px",
  borderRadius: "25px",
  border: "none",
  background: "#e11d48",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(225,29,72,0.3)"
};
const helpContainer = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f8fafc, #eef2f7)"
};

const helpCard = {
  width: "500px",
  padding: "30px",
  borderRadius: "20px",
  background: "#fff",
  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const helpTitle = {
  fontSize: "26px",
  fontWeight: "800",
  marginBottom: "10px"
};

const helpDesc = {
  color: "#6b7280",
  marginBottom: "20px"
};

const helpList = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const helpItem = {
  padding: "12px",
  borderRadius: "10px",
  background: "#f1f5f9",
  textAlign: "left",
  cursor: "pointer"
};
const answerBox = {
  marginTop: "6px",
  padding: "12px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #e11d48, #fb7185)", // 🔥 your pink
  color: "#fff",
  fontSize: "13px",
  textAlign: "left",
  boxShadow: "0 6px 15px rgba(225,29,72,0.3)"
};