import { useState } from "react";
import { FLOWERS, initQuantities } from "./flowers";
import FlowerCard from "./components/FlowerCard";
import Confirmation from "./components/Confirmation";

import { APPS_SCRIPT_URL } from "./config";

export default function App() {
  const [quantities, setQuantities] = useState(initQuantities);
  const [namn, setNamn] = useState("");
  const [epost, setEpost] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const setQty = (flowerId, color, value) => {
    const v = value === "" ? "" : Math.max(0, parseInt(value) || 0);
    setQuantities((prev) => ({
      ...prev,
      [flowerId]: { ...prev[flowerId], [color]: v },
    }));
  };

  const totalPerFlower = (flower) =>
    flower.colors.reduce((sum, c) => sum + (quantities[flower.id][c] || 0), 0);

  const totalSum = FLOWERS.reduce(
    (sum, f) => sum + totalPerFlower(f) * f.price,
    0
  );

  const orderLines = FLOWERS.filter((f) => totalPerFlower(f) > 0).map((f) => ({
    flower: f,
    total: totalPerFlower(f),
    colors: f.colors
      .filter((c) => quantities[f.id][c] > 0)
      .map((c) => `${quantities[f.id][c]} ${c.toLowerCase()}`),
  }));

  const canSubmit =
    namn.trim() && epost.trim() && orderLines.length > 0 && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);

    const payload = { namn, epost, timestamp: new Date().toISOString() };
    FLOWERS.forEach((f) => {
      f.colors.forEach((c) => {
        payload[`${f.id}_${c}`] = quantities[f.id][c] || "";
      });
      payload[`${f.id}_total`] = totalPerFlower(f) || "";
    });
    payload.total_summa = totalSum;

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
    } catch (_) {
      // no-cors ger alltid opaque response — ignorera
    }

    setOrderSummary({ namn, epost, orderLines, totalSum });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted && orderSummary) {
    return <Confirmation summary={orderSummary} />;
  }

  return (
    <div style={{ background: "#faf7f2", minHeight: "100vh", paddingBottom: 60 }}>

      {/* ── Header ── */}
      <header
        style={{
          textAlign: "center",
          padding: "48px 24px 32px",
          background: "linear-gradient(180deg, #e8f5e2 0%, #faf7f2 100%)",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌿</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 5vw, 40px)",
            fontWeight: 700,
            color: "#2d4a22",
            marginBottom: 6,
            letterSpacing: "-0.5px",
          }}
        >
          Sirkkala Gårdsfest 2026
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            color: "#6b7c5a",
            marginBottom: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Blomsterbeställning
        </p>
        <div
          style={{
            width: 60,
            height: 2,
            background: "#7aad5c",
            margin: "0 auto",
            borderRadius: 2,
          }}
        />
      </header>

      {/* ── Intro ── */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "12px 24px 0",
          textAlign: "center",
          fontSize: 16,
          lineHeight: 1.6,
          color: "#4a4a4a",
        }}
      >
        <p style={{ marginBottom: 8 }}>
          Köp dina sommarblommor och understöd fjärde klassen i Sirkkala skolas lägerskola!
        </p>
        <p style={{ marginBottom: 8, fontWeight: 700 }}>
          Beställ senast 18.4.2026
        </p>
        <p style={{ marginBottom: 8 }}>
          Levereras till skolgården till gårdsfesten.
        </p>
        <p style={{ marginBottom: 8 }}>
          Leverantör: Riipin puutarha</p>
        <p>Obs! Bilderna föreställer blomsorterna och är endast riktgivande.</p>
      </div>

      {/* ── Flower Cards ── */}
      <div
        className="card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 20,
          padding: "32px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {FLOWERS.map((flower) => (
          <FlowerCard
            key={flower.id}
            flower={flower}
            quantities={quantities}
            setQty={setQty}
          />
        ))}
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#999",
          margin: "-12px 0 20px",
          padding: "0 24px",
        }}
      >
        ⌀ cm är krukans diameter
      </p>

      {/* ── Contact ── */}
      <section
        className="page-section"
        style={{ maxWidth: 480, margin: "0 auto", padding: "0 24px 28px" }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#2d4a22",
            marginBottom: 14,
          }}
        >
          Kontaktuppgifter
        </h2>
        <input
          className="text-input"
          type="text"
          placeholder="Ditt namn *"
          value={namn}
          onChange={(e) => setNamn(e.target.value)}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Telefonnummer eller e-post *"
          value={epost}
          onChange={(e) => setEpost(e.target.value)}
        />
      </section>

      {/* ── Summary ── */}
      <section
        className="page-section"
        style={{ maxWidth: 480, margin: "0 auto", padding: "0 24px 32px" }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#2d4a22",
            marginBottom: 14,
          }}
        >
          Sammanfattning
        </h2>
        {orderLines.length === 0 ? (
          <p style={{ color: "#aaa", fontStyle: "italic", fontSize: 16 }}>
            Inga blommor valda ännu.
          </p>
        ) : (
          <>
            {orderLines.map(({ flower, total, colors }) => (
              <div
                key={flower.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #e8e8e0",
                  fontSize: 17,
                }}
              >
                <span>
                  {flower.emoji} {flower.category ? `${flower.category} – ` : ""}{flower.name} ({colors.join(", ")}) – {total} st
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
                marginTop: 4,
              }}
            >
              <span>Totalt</span>
              <span>{totalSum}€</span>
            </div>
          </>
        )}
      </section>

      {/* ── Submit ── */}
      <p
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#666",
          maxWidth: 480,
          margin: "0 auto 12px",
          padding: "0 24px",
        }}
      >
        Betalning sker med MobilePay eller direkt till konto.
      </p>
      <button className="submit-btn" onClick={handleSubmit} disabled={!canSubmit}>
        {loading ? "Skickar..." : "🌿 Bekräfta köp"}
      </button>
      {!canSubmit && !loading && (
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#c0392b",
            maxWidth: 480,
            margin: "8px auto 0",
            padding: "0 24px",
          }}
        >
          {orderLines.length === 0 && "Välj minst en blomma. "}
          {!namn.trim() && "Fyll i ditt namn. "}
          {!epost.trim() && "Fyll i telefonnummer eller e-post."}
        </p>
      )}

      <p
        style={{
          textAlign: "center",
          color: "#bbb",
          fontSize: 13,
          marginTop: 32,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Sirkkala Gårdsfest 2026
      </p>
    </div>
  );
}
