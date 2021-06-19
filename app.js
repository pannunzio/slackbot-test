//https://dashboard.ngrok.com/get-started/setup
//https://blog.logrocket.com/build-a-slackbot-in-node-js-with-slacks-bolt-api/



const { App } = require("@slack/bolt");

// require the fs module that's built into Node.js
const fs = require('fs')
// get the raw data from the db.json file
let raw = fs.readFileSync('db.json');
// parse the raw bytes from the file as JSON
let faqs= JSON.parse(raw);



require("dotenv").config();
// Initializes your app with your bot token and signing secret
// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
// });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode:true, // enable the following to use socket mode
  appToken: process.env.APP_TOKEN
});


app.command("/knowledge", async ({ command, ack, say }) => {
  try {
    await ack();
    let message = { blocks: [] };
    faqs.data.map((faq) => {
      message.blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Question*",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: faq.question,
          },
        },
        {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Answer*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: faq.answer,
            },
          }
      );
    });
    say(message);
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

app.message(/products/, async ({ command, say }) => {
  try {
    let message = { blocks: [] };
    const productsFAQs = faqs.data.filter((faq) => faq.keyword === "products");

    productsFAQs.map((faq) => {
      message.blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Question ❓*",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: faq.question,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Answer ✔️*",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: faq.answer,
          },
        }
      );
    });

    say(message);
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});


// matches any string that contains the string hey
app.message(/hey/, async ({ command, say }) => {
    console.log("test from mariana");
    try {
      say("Yaaay! that command works! ⚡️☠️");
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});



app.command("/update", async ({ command, ack, say }) => {
  try {
    await ack();
    const data = command.text.split("|");
    const newFAQ = {
      keyword: data[0].trim(),
      question: data[1].trim(),
      answer: data[2].trim(),
    };
    // save data to db.json
    fs.readFile("db.json", function (err, data) {
      const json = JSON.parse(data);
      json.data.push(newFAQ);
      fs.writeFile("db.json", JSON.stringify(json), function (err) {
        if (err) throw err;
        console.log("Successfully saved to db.json!");
      });
    });
    say(`You've added a new FAQ with the keyword *${newFAQ.keyword}.*`);
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

(async () => {
  const port = 5000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
