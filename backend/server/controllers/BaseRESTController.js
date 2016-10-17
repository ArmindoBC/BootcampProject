"use strict";
var Boom = require('boom'),
    request = require('request-promise'),
    LogClient = require('../clients/log'),
    BaseController = require('./BaseController.js'),
    Utils = require('../helpers/Utils');

/**
 * Base rest controller
 * It contains all methods that allows to access external REST APIs
 */
class BaseRESTController extends BaseController {
    constructor(options) {
        super();
        this.baseUrl = options.baseUrl;
        this.path = options.path;
    }

    /**
     *  It returns the path of the target service
     */
    GetServicePath() {
        return this.path;
    }


    /**
     *  It accesses a set of entities
     *
     * @param path : service path that will be requested in order to access list of entities
     */
    BaseRestGetHandler(options) {
        //check if the baseUrl is send in the options, if not is the baseurl set by default in the controller
        var baseUrl;
        if (options.baseUrl)
            baseUrl = options.baseUrl;
        else
            baseUrl = this.baseUrl;

        return BaseRESTController.MakeHttpRequest({
                uri: `${this.baseUrl}${options.path}`,
                method: "GET",
                json: true,
                query: options.query,
                timeout: options.timeout
            }).then((result) => {
                return this.BuildGetAllItemsMessage(false, result);
            })
            .catch((err) => {
                LogClient.Log({
                    level: 'ERROR',
                    category: "information",
                    message: `Error accessing data on path ${err.options.uri}: ${err.message}`
                });
                throw err;
            })
    }

    /**
     *  It accesses a single entity that matches the received id
     *
     *  @param path : service path that will be requested in order to access list of entities
     *  @param id : the id of the entity that will be accessed
     */
    BaseRestGetItemHandler(options) {
        //check if the baseUrl is send in the options, if not is the baseurl set by default in the controller
        var baseUrl;
        if (options.baseUrl)
            baseUrl = options.baseUrl;
        else
            baseUrl = this.baseUrl;

        return BaseRESTController.MakeHttpRequest({
                uri: `${this.baseUrl}${options.path}/${options.id}`,
                method: "GET",
                json: true
            }).then((result) => {
                return this.BuildGetItemMessage(false, result);
            })
            .catch((err) => {
                LogClient.Log({
                    level: 'ERROR',
                    category: "information",
                    message: `Error accessing data on path ${err.options.uri}: ${err.message}`
                });
                throw err;
                //return Boom.wrap(err, err.statusCode);
            })
    }

    /**
     * It makes a request in order to create a new entity using data received in param
     * @param path: service path that will be requested in order to access list of entities
     * @param data: data that wiil be posted in the target service
     */
    BaseRestPostHandler(options) {
        //check if the baseUrl is send in the options, if not is the baseurl set by default in the controller
        var baseUrl;
        if (options.baseUrl)
            baseUrl = options.baseUrl;
        else
            baseUrl = this.baseUrl;

        return BaseRESTController.MakeHttpRequest({
                uri: `${baseUrl}${options.path}`,
                method: "POST",
                body: options.data,
                timeout: options.timeout
            }).then((result) => {
                return this.BuildPostItemMessage(false, result);
            })
            .catch((err) => {
                LogClient.Log({
                    level: 'ERROR',
                    category: "information",
                    message: `Error creating entities accessing path ${baseUrl}${options.path}: ${err.message}`
                });
                throw err;
                //return Boom.wrap(err, err.statusCode);
            })
    }

    /**
     *  It makes an HTTP request
     * @param configs: arguments to make the http request like uri, method, and needed data
     */
    static MakeHttpRequest(configs) {
        return request({
            uri: configs.uri,
            json: true,
            method: configs.method,
            body: configs.body,
            qs: configs.query,
            timeout: configs.timeout
        });
    }


    /**
     * Filter an object data filtering it sending only the necessary fields
     * @param data: original object data
     * @param responseModel
     * @returns vehicle object restricted to the necessary fields
     */
    FilterData(data, responseModel) {
        return responseModel ? Utils.DeepPick(data, responseModel) : data;
    }

    /**
     * It serializes data before send data to users
     * @param data
     * @param serializeModel
     */
    SerializeData(data, serializeModel) {
        return serializeModel ? Utils.RenameKeys(data, serializeModel) : data;
    }

    /**
     * It deserialize data received from the user
     * @param data
     * @param deserializeModel
     */
    DeserializeData(data, deserializeModel) {
        return deserializeModel ? Utils.RenameKeys(data, deserializeModel) : data;
    }

}
module.exports = BaseRESTController;
