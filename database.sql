CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE task_statuses (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  description text,
  status_id int REFERENCES task_statuses(id) NOT NULL,
  creator_id int REFERENCES users(id) NOT NULL,
  executor_id int REFERENCES users(id),
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
)
