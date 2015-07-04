(function () {
  'use strict';

  angular
    .module('thinkster.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/universe/register', {
      controller: 'RegisterController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    }).when('/universe/login', {
      controller: 'LoginController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).when('/universe', {
	  	controller: 'IndexController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/layout/index.html'
  	})
    .otherwise('/universe');
    

  }
})();