export default function FlowerCard({ flower, quantities, setQty }) {
  const total = flower.colors.reduce(
    (sum, c) => sum + (quantities[flower.id][c] || 0),
    0
  );

  return (
    <div className="flower-card" style={{ background: flower.bg }}>
      {/* Image area */}
      <div
        style={{
          height: 200,
          overflow: "hidden",
          background: `${flower.accent}18`,
        }}
      >
        <img
          src={flower.image}
          alt={flower.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: flower.imagePosition || "center",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 14,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: flower.accent,
                lineHeight: 1.2,
              }}
            >
              {flower.category ? `${flower.category} – ${flower.name}` : flower.name}
              {flower.detail && (
                <span style={{ fontSize: 16, marginLeft: 6 }}>
                  {flower.detail}
                </span>
              )}
            </h3>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#888",
              background: "rgba(0,0,0,0.06)",
              padding: "2px 8px",
              borderRadius: 20,
              whiteSpace: "nowrap",
              marginLeft: 8,
            }}
          >
            {flower.price}€/st
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {flower.colors.map((color, i) => (
            <div
              key={color}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 16, color: "#444" }}>
                {flower.colorEmojis[i]} {color}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  className="counter-btn"
                  onClick={() =>
                    setQty(
                      flower.id,
                      color,
                      (quantities[flower.id][color] || 0) - 1
                    )
                  }
                >
                  −
                </button>
                <input
                  type="number"
                  min="0"
                  style={{
                    width: 40,
                    height: 28,
                    textAlign: "center",
                    border: "1.5px solid #ccc",
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 700,
                    background: "white",
                    color: "#222",
                  }}
                  value={quantities[flower.id][color] || 0}
                  onChange={(e) => setQty(flower.id, color, e.target.value)}
                />
                <button
                  className="counter-btn"
                  onClick={() =>
                    setQty(
                      flower.id,
                      color,
                      (quantities[flower.id][color] || 0) + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {total > 0 && (
          <div
            style={{
              marginTop: 12,
              fontSize: 15,
              textAlign: "right",
              paddingTop: 8,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              color: flower.accent,
            }}
          >
            {total} st × {flower.price}€ ={" "}
            <strong>{total * flower.price}€</strong>
          </div>
        )}
      </div>
    </div>
  );
}
