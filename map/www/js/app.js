// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var nameApp = angular.module('starter', ['ionic', 'uiGmapgoogle-maps']);
 
nameApp.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    });
  $urlRouterProvider.otherwise("/");
  
});
 

nameApp.controller('HomeCtrl', function($scope) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
});