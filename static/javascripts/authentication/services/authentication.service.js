/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
		getAuthenticatedAccount: getAuthenticatedAccount,
	    isAuthenticated: isAuthenticated,
	    login: login,
	    logout:logout,
	    register: register,
	    setAuthenticatedAccount: setAuthenticatedAccount,
	    unauthenticate: unauthenticate
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/universe/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      });
    }
    
    
    /**
    * @name login
    * @desc Try to login a user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function login(email, password) {
      return $http.post('/universe/api/v1/auth/login/', {
          email: email, password: password
      }).then(loginSuccessFn, loginErrorFn);

	  /**
	   * @name loginSuccessFn
	   * @desc Set the authenticated account and redirect to index
	   */
	  function loginSuccessFn(data, status, headers, config) {
	    Authentication.setAuthenticatedAccount(data.data);

	    window.location = '/universe';
	  };
	  
	  /**
	   * @name loginErrorFn
	   * @desc Log "Epic failure!" to the console
	   */
	  function loginErrorFn(data, status, headers, config) {
	    console.error('Epic failure!');
	  }
    }
    
    	/**
	 * @name logout
	 * @desc Try to log the user out
	 * @returns {Promise}
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function logout() {
	  return $http.post('/universe/api/v1/auth/logout/')
	    .then(logoutSuccessFn, logoutErrorFn);
	
	  /**
	   * @name logoutSuccessFn
	   * @desc Unauthenticate and redirect to index with page reload
	   */
	  function logoutSuccessFn(data, status, headers, config) {
	    Authentication.unauthenticate();
	
	    window.location = '/universe';
	  }
	
	  /**
	   * @name logoutErrorFn
	   * @desc Log "Epic failure!" to the console
	   */
	  function logoutErrorFn(data, status, headers, config) {
	    console.error('Epic failure!');
	  }
	}
    
    /**
	 * @name getAuthenticatedAccount
	 * @desc Return the currently authenticated account
	 * @returns {object|undefined} Account if authenticated, else `undefined`
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function getAuthenticatedAccount() {
	  if (!$cookies.authenticatedAccount) {
	    return;
	  }
	
	  return JSON.parse($cookies.authenticatedAccount);
	}
	
	/**
	 * @name isAuthenticated
	 * @desc Check if the current user is authenticated
	 * @returns {boolean} True is user is authenticated, else false.
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function isAuthenticated() {
	  return !!$cookies.authenticatedAccount;
	}
	
	
	/**
	 * @name setAuthenticatedAccount
	 * @desc Stringify the account object and store it in a cookie
	 * @param {Object} user The account object to be stored
	 * @returns {undefined}
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function setAuthenticatedAccount(account) {
	  $cookies.authenticatedAccount = JSON.stringify(account);
	}
	
	
	/**
	 * @name unauthenticate
	 * @desc Delete the cookie where the user object is stored
	 * @returns {undefined}
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function unauthenticate() {
	  delete $cookies.authenticatedAccount;
	}
	
	
	


  }
})();