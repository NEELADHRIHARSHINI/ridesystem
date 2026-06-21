import { useEffect, useState } from "react";

function History() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(data);
  }, []);

  return (
    <div>
      <h2>💳 Payment History</h2>

      {payments.map((p, i) => (
        <div key={i} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>
          <p>Txn: {p.txnId}</p>
          <p>Amount: ₹{p.amount}</p>
          <p>Method: {p.method}</p>
          <p>Date: {p.date}</p>
        </div>
      ))}
    </div>
  );
}

export default History;