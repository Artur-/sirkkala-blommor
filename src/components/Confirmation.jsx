import { useState } from "react";
import { APPS_SCRIPT_URL } from "../config";

export default function Confirmation({ summary }) {
  const { namn, epost, orderLines, totalSum } = summary;
  const [paymentState, setPaymentState] = useState("idle"); // idle | loading | done

  const handleBetalat = async () => {
    setPaymentState("loading");
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ action: "betalat", namn, epost }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (_) {}
    setPaymentState("done");
  };

  return (
    <div style={{ background: "#faf7f2", minHeight: "100vh", padding: "0 0 60px" }}>
      <div
        style={{
          maxWidth: 520,
          margin: "48px auto",
          background: "white",
          borderRadius: 20,
          padding: "40px 36px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 12 }}>🌿</div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 30,
            color: "#2d4a22",
            marginBottom: 6,
          }}
        >
          Tack för din beställning!
        </h2>
        <p style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>{namn}</p>

        {/* Order lines */}
        <div
          style={{
            textAlign: "left",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "16px 0",
            marginBottom: 24,
          }}
        >
          {orderLines.map(({ flower, total, colors }) => (
            <div
              key={flower.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 0",
                fontSize: 17,
              }}
            >
              <span style={{ fontSize: 24 }}>{flower.emoji}</span>
              <span style={{ flex: 1, color: "#333" }}>
                {flower.category ? `${flower.category} \u2013 ` : ""}
                {flower.name} \u2013 {total} st ({colors.join(", ")})
              </span>
              <span style={{ fontWeight: 700, color: "#2d4a22" }}>
                {total * flower.price}€
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700,
              fontSize: 21,
              fontFamily: "'Playfair Display', serif",
              color: "#2d4a22",
              paddingTop: 12,
              marginTop: 8,
              borderTop: "2px solid #e8e8e0",
            }}
          >
            <span>Totalt</span>
            <span>{totalSum}€</span>
          </div>
        </div>

        {/* Payment instructions */}
        <div
          style={{
            background: "#f0f7eb",
            borderRadius: 12,
            padding: "20px 24px",
            textAlign: "left",
            marginBottom: 28,
          }}
        >
          <p style={{ marginBottom: 12, fontSize: 17, color: "#333" }}>
            Vänligen betala in <strong>{totalSum}€</strong> med:
          </p>
          <p style={{ marginBottom: 8, fontSize: 17, color: "#333" }}>
            📱 <strong>MobilePay</strong> till nummer <strong>123</strong>
          </p>
          <p style={{ marginBottom: 0, fontSize: 17, color: "#333" }}>
            🏦 <strong>Bankkonto</strong> 123-123
          </p>
          <div
            style={{
              marginTop: 12,
              padding: "10px 14px",
              background: "white",
              borderRadius: 8,
              fontSize: 16,
              color: "#444",
              borderLeft: "3px solid #7aad5c",
            }}
          >
            Meddelande: <strong>"Blommor \u2013 {namn}"</strong>
          </div>
        </div>

        {paymentState === "done" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "14px 24px",
              background: "#f0f7eb",
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              color: "#2d4a22",
            }}
          >
            <span style={{ fontSize: 24 }}>✅</span>
            Betalning registrerad!
          </div>
        ) : (
          <button
            onClick={handleBetalat}
            disabled={paymentState === "loading"}
            style={{
              display: "block",
              width: "100%",
              padding: "14px 24px",
              background: paymentState === "loading"
                ? "#aaa"
                : "linear-gradient(135deg, #4a8a2e, #2d5e1a)",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 18,
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              cursor: paymentState === "loading" ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(45,94,26,0.25)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >
            {paymentState === "loading" ? "Registrerar..." : "✅ Jag har betalat"}
          </button>
        )}
      </div>
    </div>
  );
}
