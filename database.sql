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
