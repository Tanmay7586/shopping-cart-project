import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("shoppingCart")) || []
  );

  //fetch products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    })();
  }, []);

  // store cart to localStorage
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) =>
    setCart((prev) => {
      const item = prev.find((p) => p.id === product.id);
      return item
        ? prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...product, quantity: 1 }];
    });

  const updateQuantity = (id, qty) =>
    setCart((prev) =>
      qty < 1
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      if (!res.ok) throw new Error("Checkout failed");
      const data = await res.json();

      console.log("Checkout:", data);
      setCheckoutMsg("Order placed successfully!");
      setCart([]);
      localStorage.removeItem("shoppingCart");
    } catch (err) {
      console.error(err);
      setCheckoutMsg("Checkout failed. Try again.");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
        </header>

        {checkoutMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {checkoutMsg}
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <main className="col-span-2 grid grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-600 mt-1">₹ {p.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </main>

          <aside className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-4">
              Your Cart
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total:</span>
                    <span className="text-indigo-600">
                      ₹ {total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-green-500 text-white font-bold py-3 px-4 rounded-lg"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
