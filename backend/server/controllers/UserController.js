"use strict";
var joi = require('joi'),
    Boom = require('boom'),
    BaseController = require('./BaseController.js'),
    DatabaseService = require('../services/DatabaseService.js');

/**
 * User controller, contains all functions to build the user, this also extends BaseController
 */
class UserController extends BaseController {

    constructor() {
        super();
    }

    GetCollectionName() {
        return "user";
    }

    /**
     * Returns the User which matches the id received
     */
    GetItem() {
        return {
            method: 'GET',
            path: '/user/{id}',
            config: {
                description: 'Get User',
                notes: 'Returns the User which matches the id received',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseGetItemHandler(this.GetCollectionName(), request.params.id)
                        .then((item)=>{
                            reply(item);
                        })
                        .catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    params: {
                        id: joi.string().hex().required().description("Filter user by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Returns the Users meeting the provided parameters. In case there are no search parameters, all Users will be returned
     */
    Get() {
        return {
            method: 'GET',
            path: '/user',
            config: {
                description: 'Get Users',
                notes: 'Returns the Users meeting the provided parameters. In case there are no search parameters, all Users will be returned',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseGetHandler(this.GetCollectionName(), request.query)
                        .then((item)=>{
                            reply(item);
                        })
                        .catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    query: {
                        id: joi.string().hex().optional().description("Filter user by id (same as use path/{id})"),
                        email: joi.string().optional().description("Filter user by email")
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Create a new user entity.
     */
    Post() {
        return {
            method: 'POST',
            path: '/user',
            config: {
                description: 'Create User',
                notes: 'Create a new user and returns it.',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BasePostHandler(this.GetCollectionName(), request.payload)
                        .then((item)=>{
                            reply(item);
                        })
                        .catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        })

                },
                validate: {
                    payload: {
                        email: joi.string().allow('').required().description("The user's email"),
                        username: joi.string().required().description("The username"),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Updates the user item that has the id provided. If the update is sucessful then the notification item data will be returned
     */
    Patch() {
        return {
            method: 'PATCH',
            path: '/user/{id}',
            config: {
                description: 'Patch user item',
                notes: 'Updates the user item that has the id provided. If the update is sucessful then the user item data will be returned',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BasePatchHandler(this.GetCollectionName(), request.params.id, request.payload)
                        .then((item)=>{
                            reply(item);
                        })
                        .catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    params: {
                        id: joi.string().hex().required().description("Filter user by id "),
                    },
                    payload: {
                        email: joi.string().optional().description("The user's email"),
                        username: joi.string().optional().description("The username"),
                        wearableid: joi.string().hex().optional().description("The wearable id")
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }
    /**
     * Deletes the user item that has the id provided.
     */
    Delete() {
        return {
            method: 'DELETE',
            path: '/user/{id}',
            config: {
                description: 'delete user item',
                notes: 'Deletes the user item that has the id provided.',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseDeleteHandler(this.GetCollectionName(), request.params.id)
                        .then(()=>{
                            reply();
                        })
                        .catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    params: {
                        id: joi.string().hex().required().description("Filter user by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

}
module.exports = new UserController();
