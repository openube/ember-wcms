define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        renderTemplate : function () {
            var applicationController, loginController;

            applicationController = this.controllerFor("application");
            loginController = this.controllerFor("login");

            this.render("LoginView", {
                outlet : "login",
                controller : loginController
            });

            this.render("AdminNavigationView", {
                outlet : "adminNavigation",
                controller : applicationController
            });

            this.render("LoadingView", {
                outlet : "loading",
                controller : applicationController
            });
        },
        setupController : function (controller, model) {
            var applicationController, loginController;

            applicationController = this.controllerFor("application");
            loginController = this.controllerFor("login");

            applicationController.set("loginController", loginController);
            loginController.checkSession();

            applicationController.updateTitle("application");
        },
        events : {
            login : function (router) {
                router.get("loginController").login();
            },
            logout : function (router) {
                router.get("loginController").logout();

                router.transitionTo("page.index");
            }
        }
    });
});
