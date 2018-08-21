'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.orderManager
 * @description
 * # orderManager
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('orderManager', function () {
  	var selectedDay = 'Monday'
    var orderSelection = {
    	Mon: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''
    	},
    	Tue: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	},
    	Wed: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	},
    	Thur: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	},
    	Fri: {
    		breakfast: '',
    		lunch: '',
    		dinner: ''    		
    	}   	    	    	
    }
    this.getActiveDay = function(){
    	return selectedDay;
    }
    this.setActiveDay = function(day){
    	selectedDay = day;
    }
    this.chooseMenuOption = function(meal, menuItem){
    	orderSelection[selectedDay][meal] = menuItem;
    }      
    this.removeMenuOption = function(day, menuCategory){
    	orderSelection[day][menuCategory] = '';
    }
    this.getOrders = function(){
    	return orderSelection;
    }          
  });
