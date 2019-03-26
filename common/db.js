const logger = require('./logger');
var mysql = require('promise-mysql');
var ENV = require("../config/env.json");
//const ENV = process.env;
logger.debug(ENV);
const MYSQL_DB_HOST =
  ENV.MYSQL_DB_HOST || logger.error("MYSQL_DB_HOST not specified");
const MYSQL_DB_USER =
  ENV.MYSQL_DB_USER || logger.error("MYSQL_DB_USER not specified");
const MYSQL_DB_PASSWORD =
  ENV.MYSQL_DB_PASSWORD || logger.error("MYSQL_DB_PASSWORD not specified");
const MYSQL_DB_PORT =
  ENV.MYSQL_DB_PORT || logger.error("MYSQL_DB_PORT not specified");
const MYSQL_DB = ENV.MYSQL_DB || logger.error("MYSQL_DB not specified");
const MYSQL_POOL_LIMIT =
  ENV.MYSQL_POOL_LIMIT || logger.error("MYSQL_POOL_LIMIT  not specified");

try {
  pool = mysql.createPool({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    password: MYSQL_DB_PASSWORD,
    database: MYSQL_DB,
    port: MYSQL_DB_PORT,
    connectionLimit: MYSQL_POOL_LIMIT
  });
  if (pool) {
    logger.debug("Pool created");
  }
} catch (error) {
  logger.error("Pool could not be created" + error);
}
module.exports = {
  pool: pool,
  search: function (sql) {
    return new Promise(function (resolve, reject) {
      logger.debug(`SQL: ${sql}`);
      if (!pool) {
        logger.error("Unable to connect to db");
        reject({
          error: 500,
          data: "Error:Could not connect to DB"
        });
      } else {
        pool
          .query(sql)
          .then(function (rows) {
            logger.debug("Query returned" + JSON.stringify(rows));
            if (rows && rows.length == 0) {
              logger.debug("Rows empty");
              reject({
                error: 404,
                data: "No result found"
              });
            } else {
              resolve({
                state: "200",
                data: rows
              });
            }
          })
          .catch(function (error) {
            logger.error(error);
            reject({
              error: 500,
              data: `${error}`
            });
          });
      }
    });
  },
  insert: function (sql) {
    return new Promise(function (resolve, reject) {
      logger.debug(`SQL: ${sql}`);
      if (!pool) {
        logger.error("Unable to connect to db");
        reject({
          error: 500,
          data: "Error:Could not connect to DB"
        });
      } else {
        pool
          .query(sql)
          .then(function (rows) {
            logger.debug("Query returned" + JSON.stringify(rows));
            resolve({
              state: "200",
              data: rows
            });
          })
          .catch(function (error) {
            logger.error(error);
            reject({
              error: 500,
              data: `${error}`
            });
          });
      }
    });
  },
  delete: function (sql) {
    return new Promise(function (resolve, reject) {
      logger.debug(`SQL: ${sql}`);
      if (!pool) {
        logger.error("Unable to connect to db");
        reject({
          error: 500,
          data: "Error:Could not connect to DB"
        });
      } else {
        pool
          .query(sql)
          .then(function (rows) {
            if (rows && rows.affectedRows >= 1) {
              logger.debug("Query returned" + JSON.stringify(rows));
              resolve({
                state: "200",
                data: rows
              });
            } else {
              reject({
                error: 404,
                data: "No result found"
              });
            }
          })
          .catch(function (error) {
            logger.error(error);
            reject({
              error: 500,
              data: `${error}`
            });
          });
      }
    });
  },
  update: function (sql, json) {
    return new Promise(function (resolve, reject) {
      logger.debug(`SQL: ${sql}`);
      if (!pool) {
        logger.error("Unable to connect to db");
        reject({
          error: 500,
          data: "Error:Could not connect to DB"
        });
      } else {
        pool
          .query(sql, json)
          .then(function (rows) {
            if (rows && rows.affectedRows >= 1) {
              logger.debug("Query returned" + JSON.stringify(rows));
              resolve({
                state: "200",
                data: rows
              });
            } else {
              reject({
                error: 404,
                data: "No result found"
              });
            }
          })
          .catch(function (error) {
            logger.error(error);
            reject({
              error: 500,
              data: `${error}`
            });
          });
      }
    });
  }
};
