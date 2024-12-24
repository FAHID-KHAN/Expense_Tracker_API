const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const authroutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const path = require("path");
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "expense-tracker-secret",
    resave: false,
    saveUninitialized: true,
  })
);

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//routes for viewing the expense api 
app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API!");
});


//routes
app.use("/auth", authroutes);
app.use("/expenses", expenseRoutes);
// app.use("/profile", require("./routes/profile"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
