"use strict";
var joi = require('joi'),
    Boom = require('boom'),
    BaseController = require('./BaseController.js'),
    DatabaseService = require('../services/DatabaseService.js');

joi.phone = require('joi-phone');

/**
 * Contact controller with all the functions reegarding contact collection
 */
class ContactController extends BaseController {

    constructor() {
        super();
    }

    GetCollectionName() {
        return "contact";
    }

    /**
     * return the contact by the contact id
     */
    GetItem() {
            return {
                method: 'GET',
                path: '/contact/{id}',
                config: {
                    description: 'Get contact',
                    notes: 'Returns the contact which matches the id received',
                    tags: ['api'],
                    /*pre: [{
                        method: BaseController.Authorize(['general'])
                    }],*/
                    handler: (request, reply) => {
                        return this.BaseGetItemHandler(this.GetCollectionName(), request.params.id)
                            .then((item) => {
                                reply(item);
                            })
                            .catch((err) => {
                                reply(Boom.wrap(err, 400));
                            })
                    },
                    validate: {
                        params: {
                            id: joi.string().hex().required().description("Filter contact by id "),
                        },
                        /*headers: joi.object({
                            'authorization': joi.string().required()
                        }).unknown()*/
                    }
                }
            };
        }
        /**
         * return the contact by the contact id
         */
    GetItemAutocomplete() {
        return {
            method: 'GET',
            path: '/contact/autocomplete/{string}',
            config: {
                description: 'Get contact by some sub string of the name',
                notes: 'Returns the contacts which match the name of the substring passed',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseGetItemsAutocompleteHandler(this.GetCollectionName(), request.params.string)
                        .then((item) => {
                            reply(item);
                        })
                        .catch((err) => {
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    params: {
                        string: joi.string().required().description("Filte contact by substring of the name "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Returns the Contacts meeting the provided parameters. In case there are no search parameters, all Contacts will be returned
     */
    Get() {
        return {
            method: 'GET',
            path: '/contact',
            config: {
                description: 'Get contacts',
                notes: 'Returns the Contacts meeting the provided parameters. In case there are no search parameters, all Contacts will be returned',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseGetHandler(this.GetCollectionName(), request.query)
                        .then((item) => {
                            reply(item);
                        })
                        .catch((err) => {
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    query: {
                        id: joi.string().hex().description("Filter contact by id (same as use path/{id})"),
                        name: joi.string().description("Filter by contact's name"),
                        email: joi.string().email().description("Filter contact by email"),
                        phonenumber: joi.phone.e164().description("Filter by contact's phone number"),
                        address: joi.string().description("Filter by the contact's address"),
                        birthday: joi.date().iso().max('now').description("Filter by the contact's birthday")
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Create a new contact in the database by a POST request
     */
    Post() {
        return {
            method: 'POST',
            path: '/contact',
            config: {
                description: 'Create a contact ',
                notes: 'Create a new contact and returns it.',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BasePostHandler(this.GetCollectionName(), request.payload)
                        .then((item) => {
                            reply(item);
                        })
                        .catch((err) => {
                            reply(Boom.wrap(err, 400));
                        })

                },
                validate: {
                    payload: {
                        name: joi.string().required().description("Name of the contact person"),
                        phonenumber: joi.phone.e164().optional().allow('').description("The contact's phone number"),
                        email: joi.string().email().optional().allow('').description("The contact's email"),
                        address: joi.string().optional().allow('').description("The contact's address"),
                        birthday: joi.date().iso().optional().max('now').allow('').description("The contact's birthday"),
                        picture: joi.string().optional().allow('').description("The contact's picture"),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

    /**
     * Updates the contact item that has the id provided. If the update is sucessful then the notification item data will be returned
     */
    Patch() {
            return {
                method: 'PATCH',
                path: '/contact/{id}',
                config: {
                    description: 'Patch contact item',
                    notes: 'Updates the contact item that has the id provided. If the update is sucessful then the contact item data will be returned',
                    tags: ['api'],
                    /*pre: [{
                        method: BaseController.Authorize(['general'])
                    }],*/
                    handler: (request, reply) => {
                        return this.BasePatchHandler(this.GetCollectionName(), request.params.id, request.payload)
                            .then((item) => {
                                reply(item);
                            })
                            .catch((err) => {
                                reply(Boom.wrap(err, 400));
                            })
                    },
                    validate: {
                        params: {
                            id: joi.string().hex().required().description("Filter contact by id "),
                        },
                        payload: {
                            name: joi.string().optional().description("Name of the contact person"),
                            phonenumber: joi.phone.e164().optional().description("The contact's phone number"),
                            email: joi.string().email().optional().description("The contact's email"),
                            address: joi.string().optional().description("The contact's address"),
                            birthday: joi.date().iso().max('now').optional().description("The contact's birthday")
                        },
                        /*headers: joi.object({
                            'authorization': joi.string().required()
                        }).unknown()*/
                    }
                }
            };
        }
        /**
         * Put an element on the database
         */
    Put() {
            return {
                method: 'PUT',
                path: '/contact/{id}',
                config: {
                    description: 'Put contact item in the database',
                    notes: 'Updates the contact item that has the id provided. If the update is sucessful then the contact item data will be returned',
                    tags: ['api'],
                    /*pre: [{
                        method: BaseController.Authorize(['general'])
                    }],*/
                    handler: (request, reply) => {
                        return this.BasePutHandler(this.GetCollectionName(), request.params.id, request.payload)
                            .then((item) => {
                                reply(item);
                            })
                            .catch((err) => {
                                reply(Boom.wrap(err, 400));
                            })
                    },
                    validate: {
                        params: {
                            id: joi.string().hex().required().description("Filter contact by id "),
                        },
                        payload: {
                            name: joi.string().optional().description("Name of the contact person"),
                            phonenumber: joi.phone.e164().optional().description("The contact's phone number"),
                            email: joi.string().email().optional().description("The contact's email"),
                            address: joi.string().optional().description("The contact's address"),
                            birthday: joi.date().iso().max('now').optional().description("The contact's birthday")
                        },
                        /*headers: joi.object({
                            'authorization': joi.string().required()
                        }).unknown()*/
                    }
                }
            };
        }
        /**
         * Deletes the contact item that has the id provided.
         */
    Delete() {
        return {
            method: 'DELETE',
            path: '/contact/{id}',
            config: {
                description: 'delete contact item',
                notes: 'Deletes the contact item that has the id provided.',
                tags: ['api'],
                /*pre: [{
                    method: BaseController.Authorize(['general'])
                }],*/
                handler: (request, reply) => {
                    return this.BaseDeleteHandler(this.GetCollectionName(), request.params.id)
                        .then(() => {
                            reply();
                        })
                        .catch((err) => {
                            reply(Boom.wrap(err, 400));
                        })
                },
                validate: {
                    params: {
                        id: joi.string().hex().required().description("Delete contact by id "),
                    },
                    /*headers: joi.object({
                        'authorization': joi.string().required()
                    }).unknown()*/
                }
            }
        };
    }

}
module.exports = new ContactController();
