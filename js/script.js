var main_app = angular.module('main_app',['ngTable','LocalStorageModule']);
  	
	main_app.config(function (localStorageServiceProvider,$httpProvider) {
			localStorageServiceProvider
				.setPrefix('chef_website_');
		 $httpProvider.defaults.cache = false;
	
		
	});

	main_app.directive('highlight', function () {
    return {
        link: function ($scope, element, attrs) {
            element.bind('mouseenter', function () {
                                element.css('background-color', '#ccf2ff');
            });
            element.bind('mouseleave', function () {
                                element.css('background-color', 'white');
            });
        }
    };
        });
	
	
	
	
	
	
	main_app.controller('main_controller', ['$scope','$http', 'NgTableParams','localStorageService','$location','$filter', function($scope,$http,NgTableParams,localStorageService,$location,$filter) {
		//Global variables 
		
		$scope.fatal_error = false;
		$scope.activar_navegacion = false;
		$scope.show_main = true;
		$scope.show_horoscopo = false;
		$scope.show_historia = false;
		
		var signos = [
		{
			nombre : "ARIES",
			imagen : "images/h_aries.png",
			fechas : "del 12 de oct al 54 de abr",
			informacion : "bla blah bla blahbla blahbla blahbla blahbla blahbla blahbla blahbla blahbla blahbla blah"
		}
		
		];
		
		// END GLOBAL VARIABLES
		
		
		$scope.get_avisos = function(){
			$scope.api_response = {};
			$scope.total_number_of_avisos = 0; 	
			$scope.error_on_view = "";			
			$http({
						method: 'GET',
						url: 'http://45.33.116.147:3000/get_avisos' 
						}).then(function successCallback(response) {
							$scope.api_response = response.data;
							$scope.total_number_of_avisos = response.data.length; 							
							$scope.tableParams = new NgTableParams({
									count: 5								
								},{
									counts: [],
									getData: function(params) {
										
										 // organize filter as $filter understand it (graph object)
											var filters = {};
											angular.forEach(params.filter(), function(val,key){
												var filter = filters;
												var parts = key.split('.');
												for (var i=0;i<parts.length;i++){
													if (i!=parts.length-1) {
														filter[parts[i]] = {};
														filter = filter[parts[i]];
													}
													else {
														filter[parts[i]] = val;
													}
												}
											})
										var theData = angular.copy($scope.api_response);
										var filteredData = params.filter() ? $filter('filter')(theData, filters) : theData;
										
										orderedData = $filter('orderBy')(filteredData, params.orderBy());
										$scope.table_filtered_and_ordered_data = orderedData;
										$scope.number_of_filtered_results = filteredData.length;
										params.total($scope.table_filtered_and_ordered_data.length);
										return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());;
									}
								});
			
								
						}, function errorCallback(err) {
								$scope.error_on_view = "Errors occurred : " + JSON.stringify(err.data);
								$scope.fatal_error = true;
						});
		}
		$scope.get_horoscopo = function(){
			$scope.tableParams_horoscopo = new NgTableParams({
										count: 12								
									},{ counts: [],
										dataset: signos});
		}
		
		
		$scope.hide_all = function(){
			$scope.show_main = false;
			$scope.show_horoscopo = false;
			$scope.show_historia = false;
			$scope.activar_navegacion = false;
			
		}
		$scope.display_horoscopo = function(){
			$scope.hide_all();
			$scope.show_horoscopo = true;
		}
		$scope.display_main = function(){
			$scope.hide_all();
			$scope.show_main = true;
		}
		$scope.display_historia = function(){
			$scope.hide_all();
			$scope.show_historia = true;
		}
		//RUN ONCE
		$scope.get_avisos();
		$scope.get_horoscopo();
		//$scope.display_horoscopo();
			
	}]); 
	
  
  

	