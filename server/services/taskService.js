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
