/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;
    
	activate();
	
    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.authentication.controllers.LoginController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name register
    * @desc Register a new user
    * @memberOf thinkster.authentication.controllers.RegisterController
    */
    function register() {
      Authentication.register(vm.email, vm.password, vm.username).then(registerSuccessFn, registerErrorFn);

	  /**
	  * @name registerSuccessFn
	  * @desc Log the new user in
	  */
	  function registerSuccessFn(data, status, headers, config) {
	    Authentication.login(data.data.email, data.data.password);
	  }

	  /**
	  * @name registerErrorFn
	  * @desc Log "Epic failure!" to the console
	  */
	  function registerErrorFn(data, status, headers, config) {
	    console.error('Epic failure!');
	  }
    }
    
  }
})();