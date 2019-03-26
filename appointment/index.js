const commons = require("../common");
const logger = commons.logger;
const db = commons.db;

module.exports = {
  get: function (id) {
    sql = `Select  user.ID, user.name, user.address, user.email, user.phonenumber, appointment.date  from appointment, user where appointment.userId = user.ID ORDER BY appointment.date ASC `;
    return db.search(sql);
  },
  insert: function (json) {
    sql = `insert into appointment (json) values (${db.pool.escape(
      JSON.stringify(json)
    )})`;
    return db.insert(sql);
  },
  update: function (json, id) {
    sql = `UPDATE appointment SET json = ${db.pool.escape(
      JSON.stringify(json)
    )} WHERE id = ${db.pool.escape(id)}`;
    logger.debug(sql);
    return db.update(sql);
  },
  delete: function (id) {
    sql = `delete from appointment where ID=(${db.pool.escape(id)})`;
    return db.delete(sql);
  }
};
