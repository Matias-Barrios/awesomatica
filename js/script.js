var main_app = angular.module('main_app',['ngTable','LocalStorageModule','ngMaterial','jkAngularCarousel']);
  	
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
		
		var aviso = { 
			name:"Panaderia La Fragata",
			address : "AV J BELLONI 4353",
			phones : ['2223453'],
			description :"Esta es la propia Panaderia!! Aca se amasan los verdareos panes",
			tags : 'panaderia biscochos pan comida',
			images: [
			  {
				src: 'images/lafragata1.jpg'
			  },
			  {
				src: 'images/lafragata2.png'
			  },
			  {
				src: 'images/lafragata3.jpg'
			  },
			  
			]
		};
		var aviso2 = { 
			name:"Plaza Deportes N°8",
			address : "AV J BELLONI 4413",
			phones : ['22223123'],
			description :"Plaza de deportes. Cuenta con cancha de Futbol, Basketball y piscina. Hay actividades durante el verano",
			tags : 'plaza deportes futbol basketball piscina',
			images: [
			  {
				src: 'images/plaza1.jpg'
			  },
			  {
				src: 'images/plaza2.jpg'
			  },
			 		  
			]
		};
		
		var avisos = [];
		avisos.push(aviso);
		avisos.push(aviso2);
		
		$scope.tableParams = new NgTableParams({																		
								},{
								
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
										var theData = angular.copy(avisos);
										var filteredData = params.filter() ? $filter('filter')(theData, filters) : theData;
										orderedData = $filter('orderBy')(filteredData, params.orderBy());
										$scope.table_filtered_and_ordered_data = orderedData;
										$scope.number_of_filtered_results = filteredData.length;
										params.total($scope.table_filtered_and_ordered_data.length);
										return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());;
									}
								});
			
	}]); 
	
  
  
