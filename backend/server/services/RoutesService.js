"use strict";

/**
 * Routes Service: Build and check requirements for routings.
 */

class RoutesService {

    constructor() {}

    BuildRoutes() {
        console.log("Building Routes...");
        this.AllRoutes = [];

        //concat routes needed to build our backend service
        this.ConcatRoutes(RoutesService.BuildContactRoutes());

        console.log("Routes Build!");

        //Register Routes on Server
        return this.AllRoutes;
    }

    ConcatRoutes(newRoutes) {
        this.AllRoutes = [].concat(this.AllRoutes, newRoutes);
    }

    //it gathers all the user api routes

    static BuildContactRoutes() {
        console.log("ContactRoutes...");
        var Contact = require('../controllers/ContactController.js');
        var ContactRoutes = [];
        ContactRoutes.push(Contact.Get());
        ContactRoutes.push(Contact.GetItem());
        ContactRoutes.push(Contact.GetItemAutocomplete());
        ContactRoutes.push(Contact.Post());
        ContactRoutes.push(Contact.Patch());
        ContactRoutes.push(Contact.Delete());
        ContactRoutes.push(Contact.Put());

        return ContactRoutes;
    }
}
module.exports = new RoutesService();
