const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
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




//routes
app.use("/auth", require("./routes/auth"));
app.use("/expenses", require("./routes/expense"));
app.use("/profile", require("./routes/profile"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
