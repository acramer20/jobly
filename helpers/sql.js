const { BadRequestError } = require("../expressError");

/**
 * 
 * @param {*} dataToUpdate {Object} {field1: newVal, field2: newVal and so on}
 * @param {*} jsToSql also and {Object} takes the js type data and maps them to the database columns for example: {firstName: "first_name"}
 * @returns {Object} {setCols, updatedValues}
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
