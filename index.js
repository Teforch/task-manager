import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set("view engine", "ejs");
app.set("views", "./src/views");

// routes
app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.render("index");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
