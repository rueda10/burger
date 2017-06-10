var connection = require("../config/connection.js");

var orm = {
  selectAll: function(tableName, callback) {
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },
  insertOne: function(tableName, columns, value, callback) {
    var queryString = "INSERT INTO " + tableName;
    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (?) ";

    console.log(queryString);

    connection.query(queryString, value, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  updateOne: function(tableName, values, condition, callback) {
    var queryString = "UPDATE " + tableName;
    queryString += " SET ";
    queryString += objToSql(values);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
}

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

module.exports = orm;