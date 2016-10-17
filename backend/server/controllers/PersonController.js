"use strict";
var joi = require('joi'),
    Boom = require('boom'),
    BaseController = require('./BaseController.js'),
    DatabaseService = require('../services/DatabaseService.js');

/**
 * Person controller, contains all functions to build the person, this also extends BaseController
 */
class PersonController extends BaseController {

    constructor() {
        super();
    }

    GetCollectionName() {
        return "person";
    }

    /**
     * Returns the Person which matches the id received
     */
    GetItem() {
        return {
            method: 'GET',
            path: '/person/{id}',
            config: {
                description: 'Get Person',
                notes: 'Returns the Person which matches the id received',
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
                        id: joi.string().hex().required().description("Filter person by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Returns the Persons meeting the provided parameters. In case there are no search parameters, all Persons will be returned
     */
    Get() {
        return {
            method: 'GET',
            path: '/person',
            config: {
                description: 'Get Persons',
                notes: 'Returns the Persons meeting the provided parameters. In case there are no search parameters, all Persons will be returned',
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
                        id: joi.string().hex().optional().description("Filter person by id (same as use path/{id})"),
                        project_id: joi.string().hex().optional().description("Filter person by project id (same as use path/{id})")
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Create a new person entity.
     */
    Post() {
        return {
            method: 'POST',
            path: '/person',
            config: {
                description: 'Create Person',
                notes: 'Create a new person and returns it.',
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
                        name: joi.string().required().description("The person's name"),
                        age: joi.number().min(0).required().description("The person's age"),
                        title: joi.string().required().description("The person's title"),
                        project_id: joi.string().hex().required().description("The project id")
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Updates the person item that has the id provided. If the update is sucessful then the notification item data will be returned
     */
    Patch() {
        return {
            method: 'PATCH',
            path: '/person/{id}',
            config: {
                description: 'Patch person item',
                notes: 'Updates the person item that has the id provided. If the update is sucessful then the person item data will be returned',
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
                        id: joi.string().hex().required().description("Filter person by id "),
                    },
                    payload: {
                        name: joi.string().optional().description("The person's name"),
                        age: joi.number().min(0).optional().description("The person's age"),
                        title: joi.string().optional().description("The person's title"),
                        project_id: joi.string().hex().optional().description("The project id")
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }
    /**
     * Deletes the person item that has the id provided.
     */
    Delete() {
        return {
            method: 'DELETE',
            path: '/person/{id}',
            config: {
                description: 'delete person item',
                notes: 'Deletes the person item that has the id provided.',
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
                        id: joi.string().hex().required().description("Filter person by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

}
module.exports = new PersonController();
