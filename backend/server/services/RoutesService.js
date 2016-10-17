"use strict";

/**
 * Routes Service: Build and check requirements for routings.
 */

class RoutesService {

    constructor() {
    }

    BuildRoutes() {
        console.log("Building Routes...");
        this.AllRoutes = [];

        //concat routes needed to build our backend service
        this.ConcatRoutes(RoutesService.BuildUserRoutes());
        this.ConcatRoutes(RoutesService.BuildProjectRoutes());

        console.log("Routes Build!");

        //Register Routes on Server
        return this.AllRoutes;
    }

    ConcatRoutes(newRoutes) {
        this.AllRoutes = [].concat(this.AllRoutes, newRoutes);
    }

    //it gathers all the user api routes
    static BuildUserRoutes() {
        console.log("User Routes...");
        var User = require('../controllers/UserController.js');
        var UserRoutes = [];
        UserRoutes.push(User.Get());
        UserRoutes.push(User.GetItem());
        UserRoutes.push(User.Post());
        UserRoutes.push(User.Patch());
        UserRoutes.push(User.Delete());

        return UserRoutes;
    }

    static BuildProjectRoutes() {
        console.log("Project Routes...");
        var Project = require('../controllers/ProjectController.js');
        var ProjectRoutes = [];
        ProjectRoutes.push(Project.Get());
        ProjectRoutes.push(Project.GetItem());
        ProjectRoutes.push(Project.Post());
        ProjectRoutes.push(Project.Patch());
        ProjectRoutes.push(Project.Delete());

        return ProjectRoutes;
    }
}
module.exports = new RoutesService();
