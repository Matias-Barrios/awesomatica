var main_app = angular.module('main_app',['ngTable','LocalStorageModule']);



main_app.controller('main_controller', ['$scope','$http', 'NgTableParams','localStorageService','$location','$filter', function($scope,$http,NgTableParams,localStorageService,$location,$filter) {
		
		
	$scope.signos = [
		{
			nombre : "ACUARIO",
			elemento : "Aire",
			color : "Celeste, Plateado",
			dia : "Sabado",
			gobernado : "Urano, Saturno",
			compatibilidad : "Leo, Sagitario",
			numeros_suerte : "4, 7, 11, 22, 29",
			imagen : "images/h_acuario.png",
			fechas : "20 de Enero al 18 de Febrero",
			informacion : ""
		},
		{
			nombre : "PISCIS",
			elemento : "Agua",
			color : "Malva, Lila, Purpura, Violeta, Verde Agua",
			dia : "Jueves",
			gobernado : "Neptuno, Jupiter",
			compatibilidad : "Virgo, Tauro",
			numeros_suerte : "3, 9, 12, 15, 18, 24",
			imagen : "images/h_piscis.png",
			fechas : "19 de Febrero al 20 de Marzo",
			informacion : ""
		},
		{
			nombre : "ARIES",
			elemento : "Fuego",
			color : "Rojo",
			dia : "Martes",
			gobernado : "Marte",
			compatibilidad : "Libra, Leo",
			numeros_suerte : "1, 8, 17",
			imagen : "images/h_aries.png",
			fechas : "21 de Marzo al 19 de Abril",
			informacion : ""
		},
		{
			nombre : "TAURO",
			elemento : "Tierra",
			color : "Verde, Rosado",
			dia : "Viernes, Lunes",
			gobernado : "Venus",
			compatibilidad : "Escorpio, Cancer",
			numeros_suerte : "2, 6, 9, 12, 24",
			imagen : "images/h_tauro.png",
			fechas : "20 de Abril al 20 de Mayo",
			informacion : ""
		},
		{
			nombre : "GEMINIS",
			elemento : "Aire",
			color : "Verde Claro, Amarillo",
			dia : "Miercoles",
			gobernado : "Mercurio",
			compatibilidad : "Sagitario, Acuario",
			numeros_suerte : "5, 7, 14, 23",
			imagen : "images/h_geminis.png",
			fechas : "21 de Mayo al 20 de Junio",
			informacion : ""
		},
		{
			nombre : "CANCER",
			elemento : "Agua",
			color : "Blanco",
			dia : "Lunes, Jueves",
			gobernado : "Luna",
			compatibilidad : "Capricornio, Tauro",
			numeros_suerte : "2, 3, 15, 20",
			imagen : "images/h_cancer.png",
			fechas : "21 de Junio al 22 de Julio",
			informacion : ""
		},
		{
			nombre : "LEO",
			elemento : "Fuego",
			color : "Dorado, Amarillo, Naranja",
			dia : "Domingo",
			gobernado : "Sol",
			compatibilidad : "Acuario, Geminis",
			numeros_suerte : "1, 3, 10, 19",
			imagen : "images/h_leon.png",
			fechas : "23 de Julio al 22 de Agosto",
			informacion : ""
		},
		{
			nombre : "VIRGO",
			elemento : "Tierra",
			color : "Gris, Beige, Amarillo Palido",
			dia : "Miercoles",
			gobernado : "Mercurio",
			compatibilidad : "Piscis, Cancer",
			numeros_suerte : "5, 14, 15, 23, 32",
			imagen : "images/h_virgo.png",
			fechas : "23 de Agosto al 22 de Septiembre",
			informacion : ""
		},
		{
			nombre : "LIBRA",
			elemento : "Aire",
			color : "Rosado, Verde",
			dia : "Viernes",
			gobernado : "Venus",
			compatibilidad : "Aries, Sagitario",
			numeros_suerte : "4, 6, 13, 15, 24",
			imagen : "images/h_libra.png",
			fechas : "23 de Septiembre al 22 de Octubre",
			informacion : ""
		},
		{
			nombre : "ESCORPIO",
			elemento : "Agua",
			color : "Escarlata, Rojo, Oxido",
			dia : "Martes",
			gobernado : "Pluton, Marte",
			compatibilidad : "Tauro, Cancer",
			numeros_suerte : "8, 11, 18, 22",
			imagen : "images/h_escorpio.png",
			fechas : "23 de Octubre al 21 de Noviembre",
			informacion : ""
		},
		{
			nombre : "SAGITARIO",
			elemento : "Fuego",
			color : "Azul",
			dia : "Jueves",
			gobernado : "Jupiter",
			compatibilidad : "Geminis, Aries",
			numeros_suerte : "3, 7, 9, 12, 21",
			imagen : "images/h_sagitario.png",
			fechas : "22 de Noviembre al 21 de Diciembre",
			informacion : ""
		},
		{
			nombre : "CAPRICORNIO",
			elemento : "Tierra",
			color : "Marron, Negro",
			dia : "Sabado",
			gobernado : "Saturno",
			compatibilidad : "Tauro, Cancer",
			numeros_suerte : "4, 8, 13, 22",
			imagen : "images/h_capricornio.png",
			fechas : "22 de Diciembre al 19 de Enero",
			informacion : ""
		}
		
		
	];
	
	
	
		
	$scope.subir_informacion = function() {
		var post_data = {};
		post_data.api_password = $scope.api_password_input;
		post_data.signos = $scope.signos;
		$http({
							method: 'POST',
							url: 'http://45.33.116.147:3000/crear_horoscopo',
							headers: {
							   'Content-Type': 'application/json'
							},
							data:post_data
							
							  
							}).then(function successCallback(response) {
									// this callback will be called asynchronously
									// when the response is available
									 $scope.result_upload = "Success!!";																				
									 
							}, function errorCallback(err) {
										// called asynchronously if an error occurs
									// or server returns response with an error status.
									$scope.result_upload = "Error : " + JSON.stringify(err.data);									
									
							});
		
	}

  			
	}]);


	
  
  
