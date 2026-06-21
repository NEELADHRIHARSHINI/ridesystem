import { FaArrowRight } from "react-icons/fa";

/* ===== LOGO COMPONENT ===== */
const Logo = () => (
  <svg
    width="280"
    viewBox="0 0 512 300"
    style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))" }}
  >

    {/* 🔥 GRADIENT */}
    <defs>
      <radialGradient id="pinkSun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </radialGradient>
    </defs>

    {/* 🚗 CAR (with animation) */}
    <g style={{ animation: "carFloat 3s ease-in-out infinite" }}>
      <rect x="60" y="120" rx="20" ry="20" width="300" height="80" fill="#111827" />
      <polygon points="100,120 180,80 300,80 340,120" fill="#111827" />

      <polygon points="120,115 185,85 290,85 320,115" fill="#ffffff" opacity="0.3" />

      <circle cx="130" cy="210" r="25" fill="#1f2937" />
      <circle cx="130" cy="210" r="12" fill="#9ca3af" />

      <circle cx="300" cy="210" r="25" fill="#1f2937" />
      <circle cx="300" cy="210" r="12" fill="#9ca3af" />
    </g>

    {/* 🌸 MODERN SUN ICON */}
<g transform="translate(340, 50) scale(0.7)">

  {/* HALF SUN */}
  <circle cx="60" cy="60" r="40" fill="url(#pinkSun)" />

  {/* CUT LINES */}
  <rect x="60" y="20" width="8" height="80" fill="#f8fafc" />
  <rect x="60" y="40" width="30" height="8" fill="#f8fafc" />
  <rect x="60" y="60" width="30" height="8" fill="#f8fafc" />

  {/* RAYS (ROUNDED) */}
  <line x1="60" y1="5" x2="60" y2="-15" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>
  <line x1="60" y1="115" x2="60" y2="135" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>
  <line x1="5" y1="60" x2="-15" y2="60" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>
  <line x1="115" y1="60" x2="135" y2="60" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>

  <line x1="20" y1="20" x2="5" y2="5" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>
  <line x1="100" y1="20" x2="115" y2="5" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>
  <line x1="20" y1="100" x2="5" y2="115" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>
  <line x1="100" y1="100" x2="115" y2="115" stroke="#fb7185" strokeWidth="6" strokeLinecap="round"/>

</g>

  </svg>
);

/* ===== HOME COMPONENT ===== */
function Home({ onStart }) {
  return (
    <div style={container}>

      {/* 🔥 ANIMATION STYLES */}
      <style>
        {`
        @keyframes sunPulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        @keyframes carFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        `}
      </style>

      <Logo />

      <h1 style={title}>RideX</h1>

      <p style={tagline}>YOUR RIDE. YOUR WAY.</p>

      <button
        style={arrowBtn}
        onClick={onStart}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.15)";
          e.target.style.boxShadow = "0 12px 35px rgba(225,29,72,0.6)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 8px 25px rgba(225,29,72,0.3)";
        }}
      >
        <FaArrowRight />
      </button>

    </div>
  );
}

export default Home;

/* ===== STYLES ===== */

const container = {
  height: "100vh",
  width: "100%",
  background: "#f8fafc",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: "20px"
};

const title = {
  fontSize: "58px",
  fontWeight: "800",
  color: "#111827",
  margin: "0"
};

const tagline = {
  fontSize: "14px",
  color: "#6b7280",
  letterSpacing: "2px",
  marginBottom: "30px"
};

const arrowBtn = {
  width: "65px",
  height: "65px",
  borderRadius: "50%",
  border: "none",
  background: "linear-gradient(135deg,#e11d48,#fb7185)",
  color: "white",
  fontSize: "22px",
  cursor: "pointer",
  boxShadow: "0 8px 25px rgba(225,29,72,0.3)",
  transition: "all 0.3s ease"
};