/*
* Authors && Tutorials:
  https://dashboard.ngrok.com/get-started/setup
  https://blog.logrocket.com/build-a-slackbot-in-node-js-with-slacks-bolt-api/
  - Steve Daniels
  -Mariana Pannunzio
  Owner: Anna Lang
*/

const { App } = require("@slack/bolt");

// require the fs module that's built into Node.js
const appHome = require('./appHome.js');
const modals = require('./modalPanel.js');
let hasLoadedHome =  false;

require("dotenv").config();


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN
});

// matches any string that contains the string hey
app.message(/hey/, async ({ command, say }) => {
    try {
      say("Yaaay! that command works! ⚡️☠️");
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

app.event('app_home_opened', async({event, client, context, body}) => {
  if(!hasLoadedHome){
    const homeView = appHome.createHome(event, client);
    if(homeView){
      console.log('homeView success');
      hasLoadedHome = true;
    }
  }
});

app.action({ action_id: 'create-project'} , async({ ack, payload, client, body }) => {
  ack();
  console.log(body.user);
  const modalPanel = modals.createProject(payload, client, body.trigger_id);
});

app.view('modal-create-project',  async ({ ack, body, view, client }) => {
  ack();
  const data = {
    title: view['state']['values']['project-title']['title-input']['value'],
    startDate: view['state']['values']['start-date']['start-date']['selected_date'],
    endDate: view['state']['values']['end-date']['end-date']['selected_date'],
    description: view['state']['values']['project-description']['description-input']['value'],
    user_id: body.user.id,
  }
  const addProj = modals.saveNewProject(data);
  if(addProj) {
    const homeView = appHome.refreshHome(body.user.id, client);
    if(homeView){
      console.log('homeView success');
      hasLoadedHome = true;
    }
  }
});

app.action({ action_id: 'edit-project'} , async({ack, payload, client, body}) => {
  ack();
  const modalPanel = modals.editProject(payload, client, body.trigger_id);
});

app.view('modal-edit-project',  async ({ ack, body, view, client }) => {
  ack();
});

(async () => {
  const port = process.env.PORT || 5000;
  await app.start(port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
