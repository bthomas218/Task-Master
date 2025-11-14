/**
 * Service to create a new task
 * @param {*} db - The database client
 * @param {*} desc - Description of the task
 * @param {*} status - Status of the task
 * @returns {Promise<Object>} - The created task
 */
export const createTask = async (db, desc, status) => {
  const query = `INSERT INTO tasks (description, status) 
      VALUES ($1, COALESCE($2, 'To do'::status))
      RETURNING *;`;
  const values = [desc, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Service to get tasks, optionally filtered by status
 * @param {*} db - The database client
 * @param {*} status - Status of tasks to retrieve
 * @returns {Promise<Object>} - A list of tasks
 */
export const getTasks = async (db, status) => {
  let query;
  const values = [status];
  query =
    status === "All"
      ? "SELECT * FROM tasks"
      : "SELECT * FROM tasks WHERE status = $1";
  const result = await db.query(query, status === "All" ? [] : values);
  return result.rows;
};

/**
 * Service to get a task by its ID
 * @param {*} db - The database client
 * @param {*} id - ID of the task to retrieve
 * @returns {Promise<Object>} - The task with the specified ID
 */
export const getTaskById = async (db, id) => {
  const query = "SELECT * FROM tasks WHERE task_id = $1";
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Service to update a task
 * @param {*} db - The database client
 * @param {*} id - The id of the task to update
 * @param {*} desc - The new description of the task
 * @param {*} status - The new status of the task
 * @returns {Promise<Object>} - The updated task
 */
export const updateTask = async (db, id, desc, status) => {
  const query = `UPDATE tasks 
        SET description = COALESCE($1, description), 
        status = COALESCE($2, status),
        updated_at = NOW() 
        WHERE task_id = $3
        RETURNING description, status, updated_at;`;
  const vaulues = [desc, status, id];
  const result = await db.query(query, vaulues);
  return result.rows[0];
};

/**
 * Service to delete a task
 * @param {*} db - The database client
 * @param {*} id - The id of the task to delete
 * @returns {Promise<void>} - The deleted task
 */
export const deleteTask = async (db, id) => {
  const query = `DELETE FROM tasks 
        WHERE task_id = $1
        RETURNING *;`;
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};
