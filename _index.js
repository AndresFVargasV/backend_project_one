const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Enable CORS
app.use(cors());

// Define the main route
app.get("/", (req, res) => {
  res.send("The server is running!");
});

// Connect to the database
try {
  mongoose.connect("mongodb://localhost:27017/e-comerse-db");
  console.log("Connected to the database");
} catch (error) {
  console.log("Could not connect to the database");
}

// Define the app routes
//const ordersRoutes = require('./modules/orders/orders.routes')
//const booksRoutes = require('./modules/books/books.routes')
const usersRoutes = require("./modules/users/users.routes");

app.use("/users", usersRoutes);
//app.use('/products', booksRoutes)
//app.use('/orders', ordersRoutes)

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
