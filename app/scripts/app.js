'use strict';

/**
 * @ngdoc overview
 * @name udaciMealsApp
 * @description
 * # udaciMealsApp
 *
 * Main module of the application.
 */
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  	$urlRouterProvider.otherwise('/')

  	$stateProvider
	  	.state('home', {
	  		url:'/',
	  		templateUrl: 'views/menu.html',
	  		controller: 'MenuCtrl as menu'
	  	})
	  	.state('food', {
	  		url:'/haha/:id',
	  		templateUrl: 'views/item.html',
	  		controller: 'ItemCtrl as item'
	  	})
	  	.state('food.nutrition', {
	  		url: '/nutrition',
	  		templateUrl: 'views/item-nutrition.html'
	  	})	  	
	  	.state('food.reviews', {
	  		url: '/reviews',
	  		templateUrl: 'views/item-reviews.html'
	  	})	  	
  }])
