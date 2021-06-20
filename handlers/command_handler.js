const fs = require('fs');

module.exports = (client, Discord) => {
    function dateLog(){
        // function for date log
        return "\x1b[36m" + new Date().toLocaleString() + "\x1b[0m | ";
    }
    const load_dir = (dirs) => {
        const command_files = fs.readdirSync(`./Commands/${dirs}`).filter(file => file.endsWith('.js'));
    for(const file of command_files){
        const command = require(`../Commands/${dirs}/${file}`);
        if(command.name) {
            client.commands.set(command.name, command);
            console.log(dateLog() + `Successfully loaded command file: ${file}` )
        } else {
            continue;
        }
    }
}
    ['General'].forEach(e => load_dir(e))
}

