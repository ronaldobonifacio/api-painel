const { query } = require('../../config/database');

// The name of the view you want to query
const VIEW_NAME = 'Your_Second_View_Name'; // <-- TODO: CHANGE THIS to your actual view name

/**
 * Fetches all data from the specified view.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects from the view.
 */
const getAllData = async () => {
  const queryString = `SELECT * FROM [${VIEW_NAME}]`;
  return query(queryString);
};

module.exports = {
  getAllData,
};
