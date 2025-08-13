import pool from "../../db/pool.js";

export const getAllProjects = async () => {
  const { rows } = await pool.query("SELECT * FROM projects ORDER BY id DESC");
  return rows;
};

export const getProjectById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM projects WHERE id = $1", [
    id,
  ]);
  return rows;
};

export const createProject = async (name, description) => {
  const { rows } = await pool.query(
    "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return rows;
};

export const updateProject = async (id, name, description) => {
  const { rows } = await pool.query(
    "UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return rows;
};

export const deleteProject = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM projects WHERE id = $1", [
    id,
  ]);
  return rowCount;
};
