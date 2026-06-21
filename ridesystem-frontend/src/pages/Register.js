import { useState } from "react";

function Register({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    alert("Registered Successfully ✅");
    onLogin();
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Register</h2>

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

        <button style={btn} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;

/* ✅ FIXED STYLES */

const container = {
  height: "100vh",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  background: "white",
  padding: "35px",
  borderRadius: "15px",
  width: "340px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

const title = {
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#f59e0b",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};