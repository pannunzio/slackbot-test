const app = require('./app.js');

const createProject = async(payload, client, trigger_id) => {
  console.log(payload);
  try{
    const result = await client.views.open({
      trigger_id: trigger_id,
        view: {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "My App"
          },
          "close": {
            "type": "plain_text",
            "text": "Close"
          },
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
              }
            },
            {
              "type": "context",
              "elements": [
                {
                  "type": "mrkdwn",
                  "text": "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  //return result;
};

module.exports = { createProject };
