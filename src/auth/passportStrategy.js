import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "../../db.js";

export function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const response = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ])
        const user = response.rows[0];
        if (!user) {
            return done(null, false, { message: "No user with that email" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user, { message: "Logged in successfully" });
            }
            return done(null, false, { message: "Password incorrect" });
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new Strategy({ usernameField: "email", passwordField: "password" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = response.rows[0];
        done(null, user);
    });
}