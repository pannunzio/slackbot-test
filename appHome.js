const JsonDB = require('node-json-db').JsonDB;

const app = require('./app.js');

const createHome = async(event, client) => {
  const  panels = new JsonDB('views', true, false, '/');
  const  userDb = new JsonDB('userInfo', true, false, '/');
  panels.load();
  userDb.load();

  let homeView = {};
  let projs = {};

  homeView = panels.getData("/HOME");
  projs = userDb.getData("/"+event.user+"/projects");
  //projectView = panels.getData("/PROJ_VIEW");
  console.log(projs.length);
  for (let i = 0; i < projs.length; i++){
    const projectView = {
     "type": "section",
     "text": {
       "type": "mrkdwn",
       "text": "*" + projs[i].project_title + "*\n" + projs[i].project_description,
     },
     "block_id": projs[i].project_id,
     "accessory": {
       "type": "button",
       "text": {
         "type": "plain_text",
         "text": "Edit",
         "emoji": true
       },
       "value": projs[i].project_id,
       "action_id": "edit-project",
     }
    };
    homeView.blocks.push(projectView);
    homeView.blocks.push({"type": "divider"});
  }

  const result = await client.views.publish({
    user_id: event.user,
    view: homeView
  });
  return result;
};

const refreshHome = async(user_id, client) => {
  const  panels = new JsonDB('views', true, false, '/');
  const  userDb = new JsonDB('userInfo', true, false, '/');
  panels.load();
  userDb.load();

  let homeView = {};
  let projs = {};

  homeView = panels.getData("/HOME");
  projs = userDb.getData("/"+user_id+"/projects");
  //projectView = panels.getData("/PROJ_VIEW");
  console.log(projs.length);
  for (let i = 0; i < projs.length; i++){
    const projectView = {
     "type": "section",
     "text": {
       "type": "mrkdwn",
       "text": "*" + projs[i].project_title + "*\n" + projs[i].project_description,
     },
     "block_id": projs[i].project_id,
     "accessory": {
       "type": "button",
       "text": {
         "type": "plain_text",
         "text": "Edit",
         "emoji": true
       },
       "value": projs[i].project_id,
       "action_id": "edit-project",
     }
    };
    homeView.blocks.push(projectView);
    homeView.blocks.push({"type": "divider"});
  }

  const result = await client.views.publish({
    user_id: user_id,
    view: homeView
  });
  return result;
};

module.exports = { createHome, refreshHome };
