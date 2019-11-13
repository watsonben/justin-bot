const SlackBot = require('slackbots');

const user_name = 'Justin Hallier';
const icon = 'https://avatars.slack-edge.com/2019-11-13/819110663314_b43a046dc4004e284606_512.jpg';
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
]

const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: user_name,
});

bot.on('message', (event) => {
  if ( // If someone sent us a message or tagged us, and it wasn't a bot.
    event.type === 'desktop_notification'
    && !event.subtitle.includes('(bot)')
  ) {
    const random_index = Math.floor(Math.random() * replies.length);
    const reply = replies[random_index];

    if (event.subtitle.charAt(0) === '#') {
      // Post to a channel
      console.log(event);
      bot.postMessageToChannel(event.subtitle.slice(1), reply, { icon_url: icon })
    }
    else {
      // Post to a user
      bot.postMessage(event.channel, reply, { icon_url: icon })
    }
  }
})
