const commons = require("../common");
const logger = commons.logger;
const db = commons.db;

module.exports = {
  get: function (id) {
    sql = `Select Id, name, address, email, phonenumber from user where ID=${db.pool.escape(id)}`;
    return db.search(sql);
  },
  insert: function (json) {
    sql = `insert into user (json) values (${db.pool.escape(
      JSON.stringify(json)
    )})`;
    return db.insert(sql);
  },
  update: function (json, id) {
    sql = `UPDATE user SET json = ${db.pool.escape(
      JSON.stringify(json)
    )} WHERE id = ${db.pool.escape(id)}`;
    logger.debug(sql);
    return db.update(sql);
  },
  delete: function (id) {
    sql = `delete from user where ID=(${db.pool.escape(id)})`;
    return db.delete(sql);
  }
};
