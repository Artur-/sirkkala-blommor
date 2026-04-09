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
                {flower.category ? `${flower.category} – ` : ""}
                {flower.name} – {total} st ({colors.join(", ")})
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
        <p style={{ fontSize: 17, color: "#333", marginBottom: 16 }}>
          Betala med något av följande alternativ:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left", marginBottom: 28 }}>
          {/* MobilePay */}
          <div
            style={{
              background: "#f0f7eb",
              borderRadius: 12,
              padding: "16px 20px",
            }}
          >
            <p style={{ fontSize: 17, color: "#333", marginBottom: 4 }}>
              📱 <strong>MobilePay</strong> till nummer <strong>123</strong>
            </p>
            <p style={{ fontSize: 17, color: "#333", marginBottom: 0 }}>
              Summa: <strong>{totalSum}€</strong>
            </p>
          </div>

          <p style={{ fontSize: 15, color: "#999", textAlign: "center", margin: 0 }}>– eller –</p>

          {/* Bank */}
          <div
            style={{
              background: "#f0f7eb",
              borderRadius: 12,
              padding: "16px 20px",
            }}
          >
            <p style={{ fontSize: 17, color: "#333", marginBottom: 4 }}>
              🏦 <strong>Bankkonto</strong> FI1740550017530573
            </p>
            <p style={{ fontSize: 17, color: "#333", marginBottom: 4 }}>
              Summa: <strong>{totalSum}€</strong>
            </p>
            <div
              style={{
                padding: "8px 12px",
                background: "white",
                borderRadius: 8,
                fontSize: 16,
                color: "#444",
                borderLeft: "3px solid #7aad5c",
              }}
            >
              Meddelande: <strong>"Blommor – {namn}"</strong>
            </div>
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
