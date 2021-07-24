const app = require('./app.js');
const JsonDB = require('node-json-db').JsonDB;
const crypto = require("crypto");

/**
{
  "U025DQE171P" : {
    "projects":[
      {
      "project_id": "a1",
      "project_title":"Project Title",
      "start_date":"2021-04-28",
      "end_date":"2021-04-28",
      "project_description":"<fakelink.toUrl.com|Fake link to resource> fun times dear"
      },
    {
      "project_id": "a2",
      "project_title":"Title 2",
      "start_date":"2021-04-28",
      "end_date":"2021-04-28",
      "project_description":"Loreem ipsum"
    }]
  }
}

**/

const createProject = async(payload, client, trigger_id) => {
  const  panels = new JsonDB('views', true, false, '/');
  panels.load();
  const modal = panels.getData("/MODAL_CREATE");
  try{
    const result = await client.views.open({
      trigger_id: trigger_id,
        view: modal
      });
      return result;
    } catch (e) {
      console.log(e);
    }
};

const saveNewProject = async(data) => {
  const userProjs = new JsonDB('userInfo', true, false, '/');
  userProjs.load();
  const newData = {
    "project_id": crypto.randomBytes(4).toString("hex"),
    "project_title":data.title,
    "start_date":data.startDate,
    "end_date":data.endDate,
    "project_description":data.projectDescription,
  }
  userProjs.push("/"+data.user_id+"/projects[]", newData);
  return true;
}

const editProject = async(payload, client, trigger_id) => {
  const  panels = new JsonDB('views', true, false, '/');
  panels.load();
  const modal = panels.getData("/MODAL_EDIT");
  try{
    const result = await client.views.open({
      trigger_id: trigger_id,
        view: modal
      });
      return result;
    } catch (e) {
      console.log(e);
    }
};

module.exports = { createProject, editProject, saveNewProject };
