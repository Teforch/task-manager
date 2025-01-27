import pool from "../../db.js";
import bcrypt from "bcrypt";

class UserController {
  async getUsers(req, res) {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id");
    res.render("users/users", { users: rows, isGuest: req.isGuest });
  }

  async createUser(req, res) {
    const { name, surname, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4)",
      [name, surname, hashedPassword, email],
    );
    req.flash("success_msg", "User created successfully");
    res.redirect("/");
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      req.logout(req.user, (err) => {
        if (err) return next(err);
      });

      await pool.query("DELETE FROM users WHERE id = $1", [id]);
      res.redirect("/users");
    } catch {
      req.flash("error_msg", "User is used in tasks");
      res.redirect("/users");
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, surname, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, password = $3, email = $4 WHERE id = $5",
      [name, surname, hashedPassword, email, id],
    );
    req.flash("success_msg", "User updated successfully");
    res.redirect("/users");
  }

  registerPage(req, res) {
    res.render("users/register", { isGuest: req.isGuest });
  }

  async editPage(req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.render("edit", { user: rows[0], isGuest: req.isGuest });
  }
}

export default new UserController();
