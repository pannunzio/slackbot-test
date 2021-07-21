const JsonDB = require('node-json-db').JsonDB;
const  db = new JsonDB('userHome', true, false, '/');

const app = require('./app.js');

const createHome = async(event, client) => {
  db.load();
  //db.getData("/test1","super test", true);
  let userData = db.getData('/'+event.user);
  console.log(userData);
  const result = await client.views.publish({
    user_id: event.user,
    view: userData
  });
  return result;
};

module.exports = { createHome };
