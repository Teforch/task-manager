import pool from "../../db.js";

class UserController {
  async getUsers(req, res) {
    const { rows } = await pool.query("SELECT * FROM users");
    res.render('users', { users: rows });
  }

  async getUser(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  }

  async createUser(req, res) {
    const { first_name, last_name, password, email } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, password, email],
    );
    res.json(rows[0]);
  }
}

export default new UserController();
