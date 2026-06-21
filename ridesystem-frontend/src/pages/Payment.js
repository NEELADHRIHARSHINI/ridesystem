import React from "react";

function Payment({ amount, onSuccess, onClose }) {
  return (
    <div style={overlay}>
      <div style={card}>

        {/* HEADER */}
        <div style={header}>
          <span style={icon}>💳</span>
          <h2 style={title}>Pay ₹{amount}</h2>
        </div>

        {/* DIVIDER */}
        <div style={dividerWrap}>
          <div style={line}></div>
          <div style={dot}></div>
          <div style={line}></div>
        </div>

        {/* BUTTONS */}
        <div style={btnRow}>

          <button style={btn} onClick={onSuccess}>
            <div style={{...logo, background:"#fff"}}>
              <span style={{color:"#4285F4", fontWeight:"bold"}}>G</span>
            </div>
            <span style={text}>Pay via GPay</span>
          </button>

          <button style={btn} onClick={onSuccess}>
            <div style={{...logo, background:"#5f259f"}}>
              <span style={{color:"#fff"}}>पे</span>
            </div>
            <span style={text}>Pay via PhonePe</span>
          </button>

          <button style={btn} onClick={onSuccess}>
            <div style={{...logo, background:"#0a8f2e"}}>
              💳
            </div>
            <span style={text}>Card</span>
          </button>

        </div>

        {/* FOOTER */}
        <div style={footer}>
          🛡️ Secure demo payment
        </div>

        {/* CLOSE BUTTON (FIXED PROFESSIONAL) */}
        <button style={closeBtn} onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default Payment;

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backdropFilter: "blur(6px)" // 🔥 premium blur
};

const card = {
  background: "#fff",
  padding: "32px 36px",
  borderRadius: "22px",
  width: "520px",
  textAlign: "center",
  boxShadow: "0 25px 70px rgba(0,0,0,0.35)"
};

const header = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginBottom: "5px"
};

const icon = {
  fontSize: "24px"
};

const title = {
  fontSize: "26px",
  fontWeight: "700"
};

const dividerWrap = {
  display: "flex",
  alignItems: "center",
  margin: "20px 0"
};

const line = {
  flex: 1,
  height: "1px",
  background: "#e5e5e5"
};

const dot = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#16a34a",
  margin: "0 10px"
};

const btnRow = {
  display: "flex",
  gap: "15px",
  marginTop: "10px"
};

const btn = {
  flex: 1,
  padding: "16px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #16a34a, #138a2e)", // 🔥 gradient
  color: "white",
  border: "none",
  fontWeight: "600",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.25)", // 🔥 depth
  transition: "transform 0.15s ease"
};

const logo = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const text = {
  whiteSpace: "nowrap"
};

const footer = {
  marginTop: "25px",
  fontSize: "13px",
  color: "#777"
};

/* 🔥 FIXED CLOSE BUTTON */
const closeBtn = {
  marginTop: "18px",
  padding: "10px 24px",
  borderRadius: "25px",
  background: "#ff3b30",
  color: "white",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};