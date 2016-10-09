var app = angular.module("Widgets", [ "ngRoute" ]);
/*app.factory('xmlParser', function () {
	  var x2js = new X2JS();
	  return {
	    xml2json: x2js.xml2json,
	    xml_str2json_withOutBind : x2js.xml_str2json,
	    xml_str2json: function (args) {
	      return angular.bind(x2js, x2js.xml_str2json, args)();
	    },
	    json2xml: x2js.json2xml_str
	  }
	})*/
// Home Controller
app.controller("homeController", [ "$scope", function($scope) {
	$scope.title = "Widgets";
} ]);
// Flicker Controller
//app
//		.controller(
//				"meaningController",
//				[
//						"$scope",
//						"$http","xmlParser",
//						function($scope, $http,xmlParser) {
//							$scope.title = "Word meaning";
//							$scope.getFlickrPhotos = [];
//							$http
//									.get(
//											"https://dictionary.yandex.net/api/v1/dicservice/lookup?key=dict.1.1.20160619T153437Z.5d602287b8e810c7.7b4c757cacd2b2cf4ffa40faf5e0f5b779af817f&lang=en-ru&text=tiger"
//							                    )
//									.success(
//											function(xml) {
//												var json=xmlParser.xml_str2json(xml);
//												$scope.getMeanings.push(xml.def[0].tr[0].ex.text);
//
//												}
//											)
//									.error(
//											function() {
//												$scope.getMeanings = "Your feed could not be loaded";
//											})
//
//						} ]);
//app.controller("flickrController",["$scope","$http",function($scope,$http){
//	$http.jsonp("https://api.imgur.com/3/gallery/top/viral/1?showViral=true").
//	success(function(data){
//		$scope.images=data;
//	}).
//	error(function(){
//		$scope.images="No images received";
//	})
//}])

//weather controller
app.controller("weatherController",["$scope","$http","$log","$routeParams",function($scope,$http,$log,$routeParams){
	$scope.cityID=$routeParams.name;
	$scope.hide=true;
	$scope.getWeather=function(){
		$http.get("http://api.openweathermap.org/data/2.5/weather?q="+$scope.cityID+"&APPID=b9b59147d9a564172adb6ca6f1dd5878")
		.success(function(data, status, headers, config) {
			$scope.weatherData=data;
			console.log($scope.weatherData);
			$scope.minTemp=data.main.temp_min - 273.15;
			$scope.maxTemp=data.main.temp_max - 273.15;
			$scope.hide=false;
		}).error(function() {
			$scope.minTemp="Could not load Min Temp";
			$scope.maxTemp="Could not load Max Temp";
			
		})
	};
	
}]);
//temperature value filter for weather data
app.filter("fixTemp",function(){
	return function(value){
		var output;
		output=value*2;;
		return output;
	}
});
app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "views/weather.html",
		controller : "weatherController"
	}).when("/:name/", {
		templateUrl : "views/weather.html",
		controller : "weatherController"
	}).when("/images", {
		templateUrl : "views/meaning.html",
		controller : "flickrController"
	}).when("/addItem/edit/:id/", {
		templateUrl : "views/editItem.html",
		controller : "groceryListController"
	}).otherwise({
		redirectTo : "/"
	})
})