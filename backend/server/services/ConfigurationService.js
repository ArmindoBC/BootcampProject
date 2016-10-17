"use strict";
var LogClient = require('../clients/log');
/**
* Configuration Service: Functions to retrieve the configs from the files
*/

class ConfigurationService {
    //Usage node <init_script> -e <mode>
    //mode: production or development
    constructor() {
        this.env = require('minimist')(process.argv.slice(2)).e || process.env.NODE_ENV;
        if (this.env == "production") {
            LogClient.Log({
                level: "DEBUG",
                category: "Back-end Server Configuration",
                message: "Initiating in production mode..."
            });
             this.CurrentConfigs = require('../configs/prodconfig');
        } else {
            LogClient.Log({
                level: "DEBUG",
                category: "Back-end Server Configuration",
                message: "Initiating in development mode..."
            });
            this.env = "development";
            this.CurrentConfigs = require('../configs/devconfig');
        }
    }

    GetHttpServerPort() {
        return this.CurrentConfigs.HttpServerPort;
    }


    GetDatabaseURL() {
        return this.CurrentConfigs.DatabaseURL;
    }

    IsHttpEnabled(){
        return this.CurrentConfigs.httpMode;
    }

    GetDefaultUserGroups(){
        return this.CurrentConfigs.defaultUsersGroups;
    }

    GetTranslationConfigs(){
        return this.CurrentConfigs.i18n;
    }
    GetSalt() {
        return this.CurrentConfigs.salt;
    }

    GetSecret() {
        return this.CurrentConfigs.secret;
    }

    GetPasswordValidationHash() {
        return this.CurrentConfigs.PasswordValidationHash;
    }
}
module.exports = new ConfigurationService();
