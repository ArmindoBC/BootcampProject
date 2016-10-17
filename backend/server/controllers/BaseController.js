"use strict";
var Boom = require('boom'),
    LogClient = require('../clients/log'),
    authClient = require('../clients/auth'),
    DatabaseService = require('../services/DatabaseService.js'),
    DatabaseDictionary = require('../configs/DatabaseDictionary'),
    ClientDictionary = require('../configs/ClientDictionary');

class BaseController {
    /**
     * Base controller, contains all functions to the API
     */
    constructor() {
    }

    BaseGetItemHandler(collectionName, id) {
        var collection = DatabaseService.GetCollection(collectionName);

        return collection.findOne({_id: DatabaseService.BuildObjectId(id)})
            .then((doc) => {


                return this.BuildGetItemMessage(doc);

            });

    }
    BaseGetItemsAutocompleteHandler(collectionName, string) {
        var collection = DatabaseService.GetCollection(collectionName);

        //build regex to search the substring in the collection names
        var regexValue = "^"+ string ;
        var searchRegex = new RegExp(regexValue, 'i');

        //construct the object to search the substring
        var query =  {name: searchRegex };

        return collection.find(query).toArray()
            .then((doc) => {
                console.log(doc);
                return this.BuildGetAutocompleteMessage(doc);
            });

    }
    BaseGetHandler(collectionName, query = {}) {
        var collection = DatabaseService.GetCollection(collectionName);

        var ParsedData = this.ParseQueryByDatabaseDictionary(query);

        return collection.find(ParsedData).toArray()
            .then((doc) => {
                return this.BuildGetAllItemsMessage(doc);
            })
    }

    BasePostHandler(collectionName, payload) {
        var ParsedData = this.ParseQueryByDatabaseDictionary(payload);
        return DatabaseService.GetCollection(collectionName).insert(ParsedData, {w: 1})
            .then((doc) => {
                return this.BuildPostItemMessage(doc.ops[0]);
            })

    }

    BasePutHandler(collectionName, id, payload) {
        var ParsedData = this.ParseQueryByDatabaseDictionary(payload);

        DatabaseService.GetCollection(collectionName).update(
            {_id: DatabaseService.BuildObjectId(id)},
            ParsedData)
            .then((doc) => {
                return this.BuildPutItemMessage(doc, ParsedData);
            });
    }

    BasePatchHandler(collectionName, id, payload) {
        var ParsedData = this.ParseQueryByDatabaseDictionary(payload);

        return DatabaseService.GetCollection(collectionName).findAndModify(
            {_id: DatabaseService.BuildObjectId(id)},
            {}, //sort properties
            {
                $set: ParsedData //update properties
            }, {
                new: true, // return new doc if one is upserted
                upsert: false // insert the document if it does not exist
            })
            .then((doc) => {
                return this.BuildPatchItemMessage(doc, ParsedData);
            });
    }

    BaseDeleteHandler(collectionName, id) {
        return DatabaseService.GetCollection(collectionName).remove({_id: DatabaseService.BuildObjectId(id)})
            .then((doc) => {
                return this.BuildDeleteItemMessage(doc);
            });
    }

    GetCollectionByIds(collectionName, data, fieldName) {
        return new Promise((resolve, reject) => {
            var collection = DatabaseService.GetCollection(collectionName);
            var ParsedData = this.ParseFieldsByDatabaseDictionary(fieldName, data);

            var result = collection.find(ParsedData).toArray((err, doc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    //console.log(doc);
                    resolve(doc);
                }
            });

        });
    }

//------PARSEDATA-------------------------------------------------------------

    ParseQueryByDatabaseDictionary(query) {
        var result = {};
        for (var key in query) {
            var new_key = DatabaseDictionary[key];
            if (new_key == '_id') {
                result[new_key] = DatabaseService.BuildObjectId(query[key]);
            } else if (new_key) {
                result[new_key] = query[key];
            } else
                result[key] = query[key];
        }

        return result;
    }

    ParseFieldsByDatabaseDictionary(fieldName, listOfvalues) {
        var ParsedValues = [];

        for (var i = 0; i < listOfvalues.length; i++) {
            try {
                ParsedValues.push(DatabaseService.BuildObjectId(listOfvalues[i]));
            } catch (e) {
                throw e;
            }
        }
        ;

        var new_key = DatabaseDictionary[fieldName];
        var InKey = "$in";
        var result = {};
        result[new_key] = {};
        result[new_key][InKey] = ParsedValues;
        return result;
    }


    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

//------MESSAGES--------------------------------------------------------------
    BuildGetItemMessage(doc) {
        var message;

        if (!doc) {
            throw Boom.notFound();
        } else if (doc.length == 0) {
            //Does Not Exist
            message = [];
        } else {
            //Exist, return
            message = this.ParseDocumentByClientDictionary(doc);
        }
        return message;
    }

    BuildGetAutocompleteMessage(doc) {

        LogClient.Log({
            level: 'DEBUG',
            category: "information",
            message: "All items received successfully"
        });
        return this.ParseDocumentByClientDictionary(doc);
    }

    BuildGetAllItemsMessage(doc) {

        LogClient.Log({
            level: 'DEBUG',
            category: "information",
            message: "All items received successfully"
        });
        return this.ParseDocumentByClientDictionary(doc);
    }

    BuildPostItemMessage(doc) {
        LogClient.Log({
            level: 'DEBUG',
            category: "information",
            message: "Item message built successfully"
        });
        return this.ParseDocumentByClientDictionary(doc);
    }

    BuildPutItemMessage(doc, payload) {
        var message;

        LogClient.Log({
            level: 'DEBUG',
            category: "information",
            message: "Put Item message built successfully"
        });
        if (doc.result.n)
            message = this.ParseDocumentByClientDictionary(payload);
        else {
            throw Boom.badRequest();
        }
        return message;
    }

    BuildPatchItemMessage(doc) {
        var message;

        LogClient.Log({
            level: 'DEBUG',
            category: "information",
            message: "Patch Item message built successfully"
        });
        if (doc.value === null) {
            throw  Boom.notFound();
        } else if (doc.ok === 1) {
            message = this.ParseDocumentByClientDictionary(doc.value);
        } else {
            throw Boom.badRequest();
        }
        return message;
    }

    BuildDeleteItemMessage(doc) {
        var message;

        LogClient.Log({
            level: 'DEBUG',
            category: "information",
            message: "Delete Item message built successfully"
        });
        if (doc == null) {
            //Does Not Exist
            throw Boom.create(204);
        } else if (doc.result.n === 0) {
            throw Boom.notFound();
        } else {
            message = undefined;
        }
        return message;
    }

    ParseDocumentByClientDictionary(doc) {
        var result = {};
        doc = JSON.stringify(doc);
        doc = JSON.parse(doc);

        if (doc instanceof Array) {
            //if is an array, parse each value individually
            var keys = Object.keys(doc);
            result = new Array();
            for (var key in keys) {
                var partialResult = {};
                this.ParseObjectData(doc[key], partialResult, this);
                result.push(partialResult);
            }
        } else {
            //parse object
            this.ParseObjectData(doc, result, this);
        }
        return result;
    }

    ParseObjectData(doc, result, handler, pass) {
        //test if it's object or not
        if (doc != null && typeof(doc) == "object") {
            //needs parse
            var keys = Object.keys(doc);
            //run each key and test if it is an object or Not
            for (var index in keys) {
                //get new key
                var newKey = ClientDictionary[keys[index]];
                if (newKey == null) {
                    newKey = keys[index];
                }

                //Should pass this iteration?
                if (pass === true) {
                    //Empty
                    if (typeof(doc[keys[index]]) == "object") {
                        result[newKey] = {};
                    } else {
                        result[newKey] = JSON.parse(JSON.stringify(doc[keys[index]]));
                    }

                    //parse Object
                    handler.ParseObjectData(doc[keys[index]], result[newKey], handler, false);
                } else {


                    if (doc[keys[index]] instanceof Array) {
                        //It's an Array
                        result[newKey] = new Array();

                        //parse Object
                        handler.ParseObjectData(doc[keys[index]], result[newKey], handler, true);
                    } else {
                        //replace key
                        result[newKey] = JSON.parse(JSON.stringify(doc[keys[index]]));

                        //parse Object
                        handler.ParseObjectData(doc[keys[index]], result[newKey], handler, false);
                    }
                }

            }
        }
    }

    static  Authorize(groups) { //groups is an array of group identifiers that user session token owner must belong
        return function (req, reply) {
            if (!req.headers.authorization) {
                return reply(Boom.forbidden("You don't have permission."));
            }
            var credentials = req.headers.authorization.split(' ');

            if (credentials[0] != 'Bearer') {
                LogClient.Log({
                    level: "ERROR",
                    category: `authorization`,
                    message: `Error: authorization scheme must follow Bearer strategy.`
                });
                reply(Boom.badRequest());
            } else {
                var authorizationData = {
                    token: credentials[1],
                    groups: groups
                };
                return authClient.Authorize(authorizationData)
                    .then((res) => {
                        if (res.success) {
                            req.pre.userid = res.user;
                            reply.continue();
                        } else {
                            LogClient.Log({
                                level: 'WARN',
                                category: "authorization",
                                message: "Invalid request. User does not have permissions to access route " + req.path
                            });
                            reply(Boom.forbidden("You don't have permission."));
                        }

                    })
                    .catch((err) => {
                        LogClient.Log({
                            level: 'ERROR',
                            category: "authorization",
                            message: "Error while request authorization. Error: " + err.message
                        });
                        reply(Boom.badRequest());
                    })
            }
        }
    }


}

module.exports = BaseController;
