const logger=require("./logger");
const db=require("./db");

const commons={
    "logger":logger,
    "db":db
}
module.exports=commons;