const SlackBot = require('slackbots');

const bot = new SlackBot({
    token: process.env.SLACK_TOKEN,
    name: 'Justin Hallier',
});
const icon = 'https://avatars.slack-edge.com/2019-11-13/819110663314_b43a046dc4004e284606_512.jpg'
const replies = [
    'Sorry, don\'t want to help right now.',
    'Nope, I don\'t feel like it.',
    'Ughhh what?',
    'Ask Eric instead.',
    'Justin can\'t come to the phone right now. Leave a message and he\'ll (probably never) get back to you.',
    'Nah, that\'s it: I\'m going to Europe.',
    'No',
    'No',
    'No'
]

bot.on('message', (e) => {
    if (e.type === "desktop_notification" && e.subtitle.includes('(bot)') === false) {
        const reply = replies[Math.floor(Math.random() * replies.length)];
	if (e.subtitle.charAt(0) === '#') {
            // Post to a channel
            bot.postMessageToChannel(e.subtitle.slice(1), reply, { icon_url: icon });
	} else {
            // Post to a user
	    console.log(e.subtitle);
	    bot.postMessageToUser(e.subtitle, reply, { icon_url: icon });
	}
    }
});
