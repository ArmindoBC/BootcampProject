//Init Server
process.chdir(__dirname);
var ServerService = require("./services/ServerService.js");
ServerService.Initialize();
ServerService.Start();
