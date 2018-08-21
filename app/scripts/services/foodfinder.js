'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.foodFinder
 * @description
 * # foodFinder
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('foodFinder', ['$http', function ($http) {
    // Using AngularJS $http
    this.getMenu = function() {return $http({method: 'GET', url: '/menu/menu-old.json'})}
    // Or using fetch()
    // this.getMenu = function() {return fetch('/menu/menu-old.json')};
    this.getItem = function(id){
        let menuItemFile = '/menu/'+id+'.json';
        return $http({method: 'GET', url: menuItemFile});
    }
    this.getImg = function(searchedForText) {
        return $http({
            method: 'GET',
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 873bf2c1d62f2daaa6601ba7b80193a298d82daa562a837ca3d8564d107d5225'
            }
        })
    }
  }]);
