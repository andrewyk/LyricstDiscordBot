const instructions =
   //basic commands
   "__**GENERAL:**__\n" +
   "**!login:**\tlogin to account\n" +
   "**!song {song name}:**\tsearch song names\n" +
   "**!addsong {song name}:**\tadd song to song list\n" +
   "**!songlist:**\tview song list\n" +
   "**!removesong:**\tremove song from song list\n" +
   "**!songinfo {song name}:**\tview song info\n" +
   "**?daily | ?d:**\tredeem 100 omopoints hourly\n\n";

/*
   //games commands
   "__**GAMES:**__\n" +
   "**?heads <points> | ?h <points> | ?tails <points> | ?t <points>:**\tplay heads or tails\n" +
   "**?blackjack <points> | ?bj <points>:**\tplay blackjack\n" +
   "NOTE: <points> can be all (e.g. ?h all)\n\n"
*/
/*
   //misc commands
   "__**MISC:**__\n" +
   "**?yesno <question> | ?yn <question>:**\task omoster a yes/no question\n" +
   "**?poll:**\tpoll a question to the server\n" +
   "**?pick <options seperated by spaces>:**\tlet omoster pick for u\n" +
   "**?code:**\tlink to github";
*/

const help = (message) => {message.channel.send(instructions);};


module.exports = {

  help

};