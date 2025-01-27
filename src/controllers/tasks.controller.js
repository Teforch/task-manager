import pool from "../../db.js";
import { format } from "date-fns";

class TaskController {
  async getTasksPage(req, res) {
    const { rows } =
      await pool.query(`SELECT tasks.*, task_statuses.name as status_name, users.first_name, users.last_name, exc.first_name as exc_first_name, exc.last_name as exc_last_name FROM tasks
            INNER JOIN task_statuses ON tasks.status_id = task_statuses.id 
            INNER JOIN users ON tasks.creator_id = users.id 
            LEFT JOIN users AS exc ON exc.id = tasks.executor_id
            `);

    rows.forEach((task, i) => {
      const formattedDate = format(
        new Date(task.created_at),
        "M/d/yyyy, h:mm:ss a",
      );
      rows[i].created_at = formattedDate;
    });
    console.log(rows[0].formattedDate);

    res.render("tasks/tasks", { tasks: rows, isGuest: req.isGuest });
  }

  async getTaskPage(req, res) {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT tasks.*, task_statuses.name as status_name, users.first_name as creator_first_name, users.last_name as creator_last_name, exc.first_name as exc_first_name, exc.last_name as exc_last_name FROM tasks
            INNER JOIN task_statuses ON tasks.status_id = task_statuses.id 
            INNER JOIN users ON tasks.creator_id = users.id 
            LEFT JOIN users AS exc ON exc.id = tasks.executor_id
            WHERE tasks.id = $1
            `,
      [id],
    );

    const formattedDate = format(
      new Date(rows[0].created_at),
      "M/d/yyyy, h:mm:ss a",
    );
    rows[0].formattedDate = formattedDate;

    res.render("tasks/task", { task: rows[0], isGuest: req.isGuest });
  }

  async createTaskPage(req, res) {
    const { rows: statuses } = await pool.query("SELECT * FROM task_statuses");
    const { rows: users } = await pool.query("SELECT * FROM users");
    res.render("tasks/createTask", {
      isGuest: req.isGuest,
      statuses,
      users,
    });
  }

  async editTaskPage(req, res) {
    const { id } = req.params;

    const { rows: users } = await pool.query("SELECT * FROM users");
    const { rows: statuses } = await pool.query("SELECT * FROM task_statuses");
    const { rows: tasks } = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id],
    );

    const executorName = users.find((user) => user.id === tasks[0].executor_id);
    const statusName = statuses.find(
      (status) => status.id === tasks[0].status_id,
    ).name;

    tasks[0].executorName = `${executorName.first_name} ${executorName.last_name}`;
    tasks[0].statusName = statusName[0];

    const filteredUsers = users.filter(
      (user) => user.id !== tasks[0].executor_id,
    );
    const filteredStatuses = statuses.filter(
      (status) => status.id !== tasks[0].status_id,
    );

    res.render("tasks/editTask", {
      task: tasks[0],
      statuses: filteredStatuses,
      users: filteredUsers,
      isGuest: req.isGuest,
    });
  }

  async createTask(req, res) {
    const { name, description, status, executor } = req.body;
    const creatorId = req.user.id;
    console.log(name, description, status, executor, creatorId);
    await pool.query(
      "INSERT INTO tasks (name, description, status_id, executor_id, creator_id) VALUES ($1, $2, $3, $4, $5)",
      [name, description, status, executor, creatorId],
    );
    res.redirect("/tasks");
  }

  async deleteTask(req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.redirect("/tasks");
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const { name, description, status, executor } = req.body;
    await pool.query(
      "UPDATE tasks SET name = $1, description = $2, status_id = $3, executor_id = $4 WHERE id = $5",
      [name, description, status, executor, id],
    );
    res.redirect("/tasks");
  }
}

export default new TaskController();
