import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import sessionRoutes from "./src/routes/session.routes.js";
import mainRoutes from "./src/routes/main.routes.js";
import "dotenv/config";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import passport from "passport";
import { initialize } from "./src/auth/passportStrategy.js";

initialize(passport);

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// view engine setup
app.set("view engine", "ejs");
app.set("views", "./src/views");

// routes
app.use("/", userRoutes);
app.use("/", sessionRoutes);
app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
