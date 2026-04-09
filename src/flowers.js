export const FLOWERS = [
  {
    id: "pelargon",
    name: "Pelargon",
    category: null,
    detail: "Kruka ⌀12cm",
    price: 4.5,
    emoji: "🌸",
    image: "/images/pelargon.png",
    bg: "#fce8f0",
    accent: "#d4197a",
    colors: ["Vit", "Röd", "Ljusröd"],
    colorEmojis: ["⚪", "🔴", "🩷"],
  },
  {
    id: "miljoonakello",
    name: "Miljoonakello AMPEL",
    category: null,
    detail: "Kruka ⌀25cm",
    price: 19,
    emoji: "🌺",
    image: "/images/miljoonakello.png",
    bg: "#f9e8f0",
    accent: "#b5006e",
    colors: ["Vit", "Ljusröd", "Blå"],
    colorEmojis: ["⚪", "🩷", "🔵"],
  },
  {
    id: "lumihiutale",
    name: "Lumihiutale AMPEL",
    category: null,
    detail: "Kruka ⌀25cm",
    price: 19,
    emoji: "🌼",
    image: "/images/lumihiutale.jpg",
    imagePosition: "bottom",
    bg: "#eef4fb",
    accent: "#2980b9",
    colors: ["Vit", "Ljusröd", "Blå"],
    colorEmojis: ["⚪", "🩷", "🔵"],
  },
  {
    id: "jordgubbar",
    name: "Jordgubbsampel",
    category: null,
    detail: "Kruka ⌀25cm",
    price: 19,
    emoji: "🍓",
    image: "/images/jordgubbar.jpg",
    bg: "#fef0ee",
    accent: "#c0392b",
    colors: ["Jordgubbar"],
    colorEmojis: ["🍓"],
  },
  {
    id: "orter",
    name: "Färska örter",
    category: null,
    detail: "Kruka ⌀10,5cm",
    price: 4,
    emoji: "🌿",
    image: "/images/mynta.png",
    imagePosition: "top",
    bg: "#edf7ed",
    accent: "#27ae60",
    colors: ["Timjan", "Basilika", "Mynta"],
    colorEmojis: ["🌱", "🌿", "🍃"],
  },
];

export const initQuantities = () => {
  const q = {};
  FLOWERS.forEach((f) => {
    q[f.id] = {};
    f.colors.forEach((c) => (q[f.id][c] = 0));
  });
  return q;
};
