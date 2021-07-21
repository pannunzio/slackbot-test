const app = require('./app.js');

const createProject = async(payload, client, trigger_id) => {
  try{
    const result = await client.views.open({
      trigger_id: trigger_id,
        view: {
        	"title": {
        		"type": "plain_text",
        		"text": "Create Project",
        		"emoji": true
        	},
        	"submit": {
        		"type": "plain_text",
        		"text": "Submit",
        		"emoji": true
        	},
        	"type": "modal",
          "callback_id": "modal-create-project",
        	"close": {
        		"type": "plain_text",
        		"text": "Cancel",
        		"emoji": true
        	},
        	"blocks": [
        		{
        			"type": "input",
              "block_id": "project-title",
        			"element": {
        				"type": "plain_text_input",
        				"action_id": "title-input"
        			},
        			"label": {
        				"type": "plain_text",
        				"text": "New Project Name",
        				"emoji": true
        			}
        		},
        		{
        			"type": "header",
        			"text": {
        				"type": "plain_text",
        				"text": "Project Timeline",
        				"emoji": true
        			}
        		},
        		{
        			"type": "section",
              "block_id": "start-date",
        			"text": {
        				"type": "mrkdwn",
        				"text": "Start Date:"
        			},
        			"accessory": {
        				"type": "datepicker",
        				"initial_date": "2021-04-28",
        				"placeholder": {
        					"type": "plain_text",
        					"text": "Select a date",
        					"emoji": true
        				},
        				"action_id": "start-date"
        			}
        		},
        		{
        			"type": "section",
              "block_id": "end-date",
        			"text": {
        				"type": "mrkdwn",
        				"text": "Deadline:"
        			},
        			"accessory": {
        				"type": "datepicker",
        				"initial_date": "2021-04-28",
        				"placeholder": {
        					"type": "plain_text",
        					"text": "Select a date",
        					"emoji": true
        				},
        				"action_id": "end-date"
        			}
        		},
        		{
        			"type": "input",
              "block_id": "project-description",
        			"element": {
        				"type": "plain_text_input",
        				"action_id": "description-input"
        			},
        			"label": {
        				"type": "plain_text",
        				"text": "Short Description",
        				"emoji": true
        			}
        		}
        	]
        }
      });
      return result;
    } catch (e) {
      console.log(e);
    }
};

const editProject = async(payload, client, trigger_id) => {
  try{
    const result = await client.views.open({
      trigger_id: trigger_id,
        view: {
        	"title": {
        		"type": "plain_text",
        		"text": "//To Do",
        		"emoji": true
        	},
        	"submit": {
        		"type": "plain_text",
        		"text": "Submit",
        		"emoji": true
        	},
        	"type": "modal",
          "callback_id": "modal-edit-project",
        	"close": {
        		"type": "plain_text",
        		"text": "Cancel",
        		"emoji": true
        	},
        	"blocks": [
        		{
        			"type": "header",
        			"text": {
        				"type": "plain_text",
        				"text": "Under Construction",
        				"emoji": true
        			}
        		}
        	]
        }
      });
      return result;
    } catch (e) {
      console.log(e);
    }
};

module.exports = { createProject, editProject };
