const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    price: 15,
    imageUrl: "https://images.unsplash.com/photo-1589367924363-4f26b92f3d3c",
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag",
    price: 20,
    imageUrl: "https://images.unsplash.com/photo-1606813908894-11c8c03e3c92",
  },
  {
    id: 3,
    name: "Bamboo Toothbrush Set",
    price: 8.5,
    imageUrl: "https://images.unsplash.com/photo-1616435828517-06c574ea5061",
  },
  {
    id: 4,
    name: "Reusable Coffee Cup",
    price: 12,
    imageUrl: "https://images.unsplash.com/photo-1617196038597-18c4958ea26d",
  },
  {
    id: 5,
    name: "Natural Soy Candle",
    price: 18,
    imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  },
  {
    id: 6,
    name: "Handmade Jute Basket",
    price: 25,
    imageUrl: "https://images.unsplash.com/photo-1616628182501-6b5e7d67e0bb",
  },
  {
    id: 7,
    name: "Organic Skincare Soap Bar",
    price: 6.5,
    imageUrl: "https://images.unsplash.com/photo-1622396481460-11bce4db36ab",
  },
  {
    id: 8,
    name: "Stainless Steel Lunchbox",
    price: 30,
    imageUrl: "https://images.unsplash.com/photo-1590080875452-7a6f1a2b75f4",
  },
  {
    id: 9,
    name: "Eco Yoga Mat",
    price: 45,
    imageUrl: "https://images.unsplash.com/photo-1584466977773-2f5f45d2e3a6",
  },
  {
    id: 10,
    name: "Reusable Metal Straws",
    price: 10,
    imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b",
  },
];

app.get("/api/products", (req, res) => res.json(products));

app.post("/api/checkout", (req, res) => {
  const total =
    req.body.cart?.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0) || 0;

  console.log("Total:", total);
  res.json({ success: true, message: "Order received successfully!", total });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
