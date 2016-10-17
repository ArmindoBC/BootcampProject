"use strict";
var joi = require('joi'),
    Boom = require('boom'),
    async = require('async'),
    BaseController = require('./BaseController.js'),
    DatabaseService = require('../services/DatabaseService.js');

/**
 * Project controller, contains all functions to build the project, this also extends BaseController
 */
class ProjectController extends BaseController {

    constructor() {
        super();
    }

    GetCollectionName() {
        return "project";
    }

    /**
     * Returns the Project which matches the id received
     */
    GetItem() {
        return {
            method: 'GET',
            path: '/project/{id}',
            config: {
                description: 'Get Projct',
                notes: 'Returns the Project which matches the id received',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseGetItemHandler(this.GetCollectionName(), request.params.id)
                        .then((item)=>{
                            request.server.inject({
                                method: 'GET',
                                url: '/person?project_id=' + item.id
                            }, function(response){
                                if(response.statusCode === 200)
                                {
                                    item.person = response.result;
                                    reply(item);
                                }
                                else
                                    reply(Boom.notfound());
                            })
                        })
                        .catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        });
                },
                validate: {
                    params: {
                        id: joi.string().hex().required().description("Filter project by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Returns the Projects meeting the provided parameters. In case there are no search parameters, all Projects will be returned
     */
    Get() {
        return {
            method: 'GET',
            path: '/project',
            config: {
                description: 'Get Projects',
                notes: 'Returns the Projects meeting the provided parameters. In case there are no search parameters, all Projects will be returned',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseGetHandler(this.GetCollectionName(), request.query)
                        .then((item)=>{
                            async.each(item, 
                                (project, callback) => {
                                    request.server.inject({
                                    method: 'GET',
                                    url: '/person?project_id=' + project.id
                                    }, (response) => {
                                        if(response.statusCode === 200)
                                        {
                                            project.person = response.result;
                                            callback();
                                        }
                                        else
                                            callback();
                                    });
                                },
                                (err) => {
                                    if(err)
                                        reply(Boom.notfound());
                                    else
                                        reply(item);
                                });
                        }).catch((err)=>{
                            reply(Boom.wrap(err, 400));
                        });
                            
                        
                },
                validate: {
                    query: {
                        id: joi.string().hex().optional().description("Filter project by id (same as use path/{id})"),

                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Create a new project entity.
     */
    Post() {
        return {
            method: 'POST',
            path: '/project',
            config: {
                description: 'Create Project',
                notes: 'Create a new project and returns it.',
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
                        name: joi.string().required().description("The project name"),
                        startdt: joi.date().required().description("The start date"),
                        clientname: joi.string().required().description("The client name"),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Updates the project item that has the id provided. If the update is sucessful then the notification item data will be returned
     */
    Patch() {
        return {
            method: 'PATCH',
            path: '/project/{id}',
            config: {
                description: 'Patch project item',
                notes: 'Updates the project item that has the id provided. If the update is sucessful then the project item data will be returned',
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
                        id: joi.string().hex().required().description("Filter project by id "),
                    },
                    payload: {
                        name: joi.string().optional().description("The project name"),
                        startdt: joi.date().optional().description("The start date"),
                        title: joi.string().optional().description("The project title"),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }
    /**
     * Deletes the project item that has the id provided.
     */
    Delete() {
        return {
            method: 'DELETE',
            path: '/project/{id}',
            config: {
                description: 'delete project item',
                notes: 'Deletes the project item that has the id provided.',
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
                        id: joi.string().hex().required().description("Filter project by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

}
module.exports = new ProjectController();
