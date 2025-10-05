# Simple Shopping Cart Application

A simple full-stack e-commerce application demonstrating a product catalog and shopping cart functionality.
---
## Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS
-   **Backend**: Node.js, Express
---

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Tanmay7586/shopping-cart-project
    cd shopping-cart-project
    ```

2.  **Install Backend Dependencies:**
    ```sh
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```sh
    cd ../client
    npm install
    ```

4.  **Run the Application:**

    -   start the **backend server**:
        ```sh
        node server.js
        ```

    -   start the **frontend client**:
        ```sh
        npm run dev
        ```

5.  **Open in Browser:**
    Visit [`http://localhost:5173`](http://localhost:5173) in your web browser to see the application live.

---

## Running Tests

This does not include an automated test suite.

1.  Verifying that all products load from the API.
2.  Adding items to the cart and checking if the cart UI updates.
3.  Adjusting item quantities (`+` / `-`) and ensuring the total price is correct.
4.  Removing an item by setting its quantity to 0.
5.  Refreshing the page to confirm the cart state is restored from `localStorage`.
6.  Clicking "Checkout" to ensure the cart is cleared and a success message appears.

---
