const commons = require("../common");
const logger = commons.logger;
const db = commons.db;

module.exports = {
    get: function (id) {
        sql = `Select json from posts where post_ID=${db.pool.escape(id)}`;
        return db.search(sql)
    },
    insert: function (json) {
        sql = `insert into posts (json) values (${db.pool.escape(JSON.stringify(json))})`;
        return db.insert(sql)
    },
    update: function (json, id) {

        sql = `UPDATE posts SET json = ${db.pool.escape(JSON.stringify(json))} WHERE id = ${db.pool.escape(id)}`;
        logger.debug(sql);
        return db.update(sql)
    },
    delete: function (id) {
        sql = `delete from posts where post_ID=(${db.pool.escape(id)})`;
        return db.delete(sql)
    }
}



