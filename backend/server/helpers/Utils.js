"use strict";
var _ = require('underscore'),
    crypto = require('crypto'),
    X2JS = require('x2js');

/**
 * Unit of Work Service: Responsible for MongoDB connection
 */

class Utils {

    constructor() {}

    /**
     * it checks if a value can be considered as null/undefined
     * @param value
     */
    static IsNull(value){
        return (value == undefined || value == null || value === "null");
    }

    /**
     * It receives an object and returns a random property
     * @param obj
     */
    static PickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
                result = prop;
        return result;
    }

    /**
     * It retrieves a filtered object attending the received model. The returned object only contains the keys
     * present in model object.
     * @param object : original object
     * @param model : the object which contains the fields to return
     */
    static DeepPick(object, model){

        if(_.isObject(model)){
            object = _.pick(object, function(value, key) {
                return model[key];
            });

            for (var prop in model) {
                if(_.isObject(object[prop])){
                    object[prop] = Utils.DeepPick(object[prop], model[prop])
                }
            }
        }
        return object;
    }

    /**
     * It renames the object keys
     * @param object: the original object
     * @param map: the object which maps the original field names to the target field names
     */
    static RenameKeys(object, map){
        var finalObj = {};

        _.each(object, (value, key)=>{

            if(_.isObject(map[key])){
                if(_.isArray(value)){
                    finalObj[key] = value;

                    for (var prop in value) {
                        value[prop] = Utils.RenameKeys(value[prop], map[key])
                    }

                }
                else{
                    finalObj[key] = Utils.RenameKeys(value, map[key])
                }
            }
            else{
                key = map[key] || key;
                finalObj[key] = value;
            }

        });
        return finalObj;
    }

    /**
     * It receives a birth date and returns a number representing the age
     * @param birthDay
     */
    static CalculateAge(birthDay) {
        var ageDifMs = Date.now() - birthDay.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    /**
     * It generates a random Sha1 string
     */
    static GenerateSha1(){

        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

    /**
     * it receives a xml string and converts it into a json object
     */
    static XML2JSON(xmlString){
        var x2js = new X2JS();
        return x2js.xml2js(xmlString);
    }
}
module.exports = Utils;