const { query } = require('../../config/database');

// The name of the view you want to query
const VIEW_NAME = 'Your_First_View_Name'; // <-- TODO: CHANGE THIS to your actual view name

/**
 * Fetches all data from the specified view.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects from the view.
 */
const getAllData = async () => {
  // The query function is generic, so we just pass the query string
  // IMPORTANT: Ensure VIEW_NAME does not come from user input to prevent SQL injection.
  const queryString = `SELECT * FROM [${VIEW_NAME}]`;
  return query(queryString);
};

module.exports = {
  getAllData,
};
