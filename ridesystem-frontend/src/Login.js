import { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ======================
  // LOGIN
  // ======================
  const login = async () => {
    try {
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const token = await res.text();

      localStorage.setItem("token", token);
      onLogin(token);

    } catch {
      alert("Login Failed ❌");
    }
  };

  // ======================
  // REGISTER
  // ======================
  const register = async () => {
    try {
      await fetch("http://localhost:8084/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      alert("Registered Successfully ✅");

    } catch {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🚖 Ride App Login</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={login} style={styles.loginBtn}>
          Login
        </button>

        <button onClick={register} style={styles.registerBtn}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;

// ================= STYLES =================

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0"
  },
  loginBtn: {
    width: "100%",
    padding: "10px",
    background: "black",
    color: "white",
    marginBottom: "10px"
  },
  registerBtn: {
    width: "100%",
    padding: "10px",
    background: "gray",
    color: "white"
  }
};