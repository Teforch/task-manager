import pool from "../../db.js";

class TaskStatusController {
  async getStatusesPage(req, res) {
    const { rows } = await pool.query("SELECT * FROM task_statuses");
    res.render("taskStatuses/statuses", {
      statuses: rows,
      isGuest: req.isGuest,
    });
  }

  async createStatusPage(req, res) {
    res.render("taskStatuses/createStatus", { isGuest: req.isGuest });
  }

  async editStatusPage(req, res) {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM task_statuses WHERE id = $1",
      [id],
    );
    console.log(rows[0]);
    res.render("taskStatuses/editStatus", {
      status: rows[0],
      isGuest: req.isGuest,
    });
  }

  async createStatus(req, res) {
    const { name } = req.body;
    await pool.query("INSERT INTO task_statuses (name) VALUES ($1)", [name]);
    res.redirect("/statuses");
  }

  async deleteStatus(req, res) {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM task_statuses WHERE id = $1", [id]);
      res.redirect("/statuses");
    } catch {
      req.flash("error_msg", "Status is used in tasks");
      res.redirect("/statuses");
    }
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    await pool.query("UPDATE task_statuses SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
    res.redirect("/statuses");
  }
}

export default new TaskStatusController();

