var main_app = angular.module('main_app',['ngTable','LocalStorageModule','720kb.socialshare']);
  	
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
		$scope.show_trabajo_ofrecido = false;
		var pagina = $location.search().pagina;
		var filtro = $location.search().filtro;
		
		
		// END GLOBAL VARIABLES
		
		
		$scope.get_avisos = function(filtro){
			
			$http({
						method: 'GET',
						url: 'http://45.33.116.147:3000/get_avisos' 
						}).then(function successCallback(response) {
							$scope.api_response = response.data;
							$scope.total_number_of_avisos = response.data.length; 	
							if ( $scope.total_number_of_avisos == 0) {
								$scope.fatal_error = true;
							}
							$scope.tableParams = new NgTableParams({
									count: 5,
									filter : {
										tags : filtro
									}									
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
		$scope.next_image = function (aviso){ 
	
			if (aviso.current_image == (aviso.images.length - 1))
				return aviso.current_image = 0;
			
			if (aviso.current_image < (aviso.images.length - 1))
				return aviso.current_image = aviso.current_image + 1 ;
				
		}
		$scope.prev_image = function (aviso){ 
		
			if (aviso.current_image == 0 )
				return aviso.current_image = (aviso.images.length - 1);
			
			if (aviso.current_image > 0)
				return aviso.current_image = aviso.current_image - 1 ;
				
		}
		$scope.get_avisos_test = function(){
			
			var my_array_of_avisos = [{
				 "images": [
					{
					  "src": "images/h_virgo.png"
					},
					{
					  "src": "images/h_aries.png"
					}
				  ],
				  "visible": true,
				  "sensible": false,
				  "name": "Ferreteria Venus",
				  "address": "Teniente Galeano 2358",
				  "description": "Una ferreteria re pipi cucu",
				  "tags": "ferreteria barraca reparacion tornillos",
				  "phones": [
					"22271616"
				  ],
				 "current_image" : 1
			}];
			
							
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
										var theData = angular.copy(my_array_of_avisos);
										var filteredData = params.filter() ? $filter('filter')(theData, filters) : theData;
										
										orderedData = $filter('orderBy')(filteredData, params.orderBy());
										$scope.table_filtered_and_ordered_data = orderedData;
										$scope.number_of_filtered_results = filteredData.length;
										params.total($scope.table_filtered_and_ordered_data.length);
										return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());;
									}
								});				
			
								
					
		}
		$scope.get_horoscopo = function(){
			
			$http({
						method: 'GET',
						url: 'http://45.33.116.147:3000/get_horoscopo' 
						}).then(function successCallback(response) {
							var signos = response.data;
							$scope.tableParams_horoscopo = new NgTableParams({
										count: 12								
									},{ counts: [],
										dataset: signos});					
							
			
								
						}, function errorCallback(err) {
								$scope.error_on_view = "Errors occurred : " + JSON.stringify(err.data);
								$scope.fatal_error = true;
								$scope.display_main();
						});
			
		}
		$scope.get_trabajos_ofrecidos = function(){
			
			$http({
						method: 'GET',
						url: 'http://45.33.116.147:3000/get_t_ofrecido' 
						}).then(function successCallback(response) {
							$scope.api_response_t_ofrecido = response.data;
							$scope.total_number_of_t_ofrecidos = response.data.length; 							
							$scope.tableParams_trabajos_ofrecidos = new NgTableParams({
									count: 5,
									filter : {
										tags : filtro
									}									
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
										var theData = angular.copy($scope.api_response_t_ofrecido);
										var filteredData = params.filter() ? $filter('filter')(theData, filters) : theData;
										
										orderedData = $filter('orderBy')(filteredData, params.orderBy());
										$scope.table_filtered_and_ordered_data_t_ofrecidos = orderedData;
										$scope.number_of_filtered_results_t_ofrecidos = filteredData.length;
										params.total($scope.table_filtered_and_ordered_data_t_ofrecidos.length);
										return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());;
									}
								});
			
								
						}, function errorCallback(err) {
								$scope.error_on_view = "Errors occurred : " + JSON.stringify(err.data);
								$scope.fatal_error = true;
						});
			
		}
		
		
		
		$scope.hide_all = function(){
			$scope.show_main = false;
			$scope.show_horoscopo = false;
			$scope.show_trabajo_ofrecido = false;
			$scope.activar_navegacion = false;
			
		}
		$scope.display_horoscopo = function(){
			$scope.get_horoscopo();
			$scope.hide_all();
			$scope.show_horoscopo = true;
		}
		$scope.display_main = function(){
			$scope.hide_all();
			$scope.show_main = true;
		}
		$scope.display_trabajo_ofrecido = function(){
			$scope.get_trabajos_ofrecidos(filtro);
			$scope.hide_all();
			$scope.show_trabajo_ofrecido = true;
		}
		//RUN ONCE
		
		$scope.get_avisos(filtro);
		$scope.display_main();
		if (pagina == "t_ofrecido") {
			$scope.display_trabajo_ofrecido();
			
		}
			
		
		
		
		
			
	}]); 
	
  
  

	