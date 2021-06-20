module.exports = (client, Discord) => {
    
    function dateLog(){
        // function for date log
        return "\x1b[36m" + new Date().toLocaleString() + "\x1b[0m | ";
    }
    console.log(dateLog() + 'Bot has succesfully loaded all commands and is ready to go!');
    
}