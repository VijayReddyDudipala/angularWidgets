var app=angular.module("Widgets",["ngRoute"]);
//Home Controller
app.controller("homeController",["$scope", function($scope) {
	$scope.title="Widgets";
}]);
//Flicker Controller
app.controller("flickrController",["$scope",function($scope){
	$scope.title="Flickr feed";
}]);