const SlackBot = require('slackbots');

const user_name = 'Justin Hallier'; // Name of the SlackBot
const icon = 'https://avatars.slack-edge.com/2019-11-13/819110663314_b43a046dc4004e284606_512.jpg'; // Icon uploaded to Slack
const replies = [
  'Sorry, don\'t want to help right now.',
  'Nope, I don\'t feel like it.',
  'Ughhh what?',
  'Ask Eric instead.',
  'Justin can\'t come to the phone right now. Leave a message and he\'ll (probably never) get back to you.',
  'Nah, I\'ve had enough; I\'m going to Europe.',
  'No',
  'No',
  'No',
  'Pong?',
  'No u',
  ':kappa:',
];

const ericReplies = [
  'I guess you drew the short straw',
  'Don\'t be down',
  'I bet this goes over your head',
];

const bot = new SlackBot({
  token: process.env.SLACK_TOKEN, // This is in Heroku, and in .bash_profile
  name: user_name,
});

/**
 * When someone DMs or @tags us, reply with a semi-randomly generated response.
 */
bot.on('message', (event) => {
  const { channel, subtitle, type } = event;
  if ( // If someone sent us a message or tagged us, and it wasn't a bot.
    type === 'desktop_notification'
    && !subtitle.includes('(bot)')
  ) {
    let random_index;
    let reply;
    switch (subtitle) {
      case 'Eric Lin':
        random_index = Math.floor(Math.random() * ericReplies.length);
        reply = ericReplies[random_index];
        break;
      case 'Sreeman Nalli':
        reply = ':middle_finger:';
        break;
      default:
        random_index = Math.floor(Math.random() * replies.length);
        reply = replies[random_index];
        break;
    }

    bot.postMessage(channel, reply, { icon_url: icon })
  }
})
