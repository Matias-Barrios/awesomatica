var main_app = angular.module('main_app',['ngTable','LocalStorageModule']);



main_app.controller('main_controller', ['$scope','$http', 'NgTableParams','localStorageService','$location','$filter', function($scope,$http,NgTableParams,localStorageService,$location,$filter) {
		
		
    $scope.uploadme;
	$scope.aviso={};
	$scope.aviso.images = [];
	$scope.aviso.visible = false;
	$scope.aviso.sensible = false;
	$scope.aviso.comercial = true;
	$scope.aviso.tags = "";
	
	var object={
		src : ''
	};
	
	$scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.theFile = element.files[0];
        });
    };
	$scope.setFile2 = function(element) {
        $scope.$apply(function($scope) {
            $scope.theFile2 = element.files[0];
        });
    };
	
	$scope.setFile3 = function(element) {
        $scope.$apply(function($scope) {
            $scope.theFile3 = element.files[0];
        });
    };
	
	
	$scope.aviso.images.push(object);
	
	$scope.cargar_anuncio = function(){
		$scope.cargar_error = "";
		$http({
							method: 'GET',
							url: 'http://45.56.89.82:3000/get_aviso?aviso_id=' + $scope.cargar_anuncio_text,
														
							  
							}).then(function successCallback(response) {
									// this callback will be called asynchronously
									// when the response is available
									 $scope.aviso = response.data;		
									 $scope.phones_input = String(response.data.phones).replace(',',';');
									
							}, function errorCallback(err) {
										// called asynchronously if an error occurs
									// or server returns response with an error status.
									$scope.cargar_error = "Error : " + JSON.stringify(err.data);									
									
							});
	}
	
	$scope.subir_informacion = function() {
		 $scope.result_upload = "";
		/* EJEMPLO DE POST REQUEST
		{
			"api_password" : "shellbomb",
			"file_content" : {
				  "images": [
					{
					  "src": ""
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
				  ]
				}
			}
		*/
		$scope.aviso.phones = $scope.phones_input.split(";");
		$scope.aviso.tags = $scope.aviso.tags + " " + $scope.aviso.name + " " + $scope.aviso.description + " " +  $scope.aviso.address
		$scope.aviso.current_image = 0;
		var post_data = {};
		post_data.api_password = $scope.api_password_input;
		if (! $scope.cargar_anuncio_text)
			post_data.file_name = Date.now() + "_" + Math.floor(Math.random() * 100000);
		else
			post_data.file_name = $scope.cargar_anuncio_text.replace(".json","");
		post_data.file_content = $scope.aviso;
		if ($scope.theFile) {
			$scope.aviso.images[0].src = "images/" + "foto_avisos_" + $scope.theFile.name;
			$scope.uploadImage();
		}
		if ($scope.theFile2) {
			$scope.aviso.images[1] = {};
			$scope.aviso.images[1].src = "images/" + "foto_avisos_" + $scope.theFile2.name;
			$scope.uploadImage2();
		}
		if ($scope.theFile3){
			$scope.aviso.images[2] = {};
			$scope.aviso.images[2].src = "images/" + "foto_avisos_" + $scope.theFile3.name;
			$scope.uploadImage3();
		}
		 
		$http({
							method: 'POST',
							url: 'http://45.56.89.82:3000/put_aviso',
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

    $scope.uploadImage = function() {
	  
      var fd = new FormData();
	  var imgBlob = dataURItoBlob($scope.uploadme);
     
	  fd.append('api_password',$scope.api_password_input);
      fd.append('file', imgBlob, $scope.theFile.name);
	   
	  
      $http.post(
          'http://45.56.89.82:4000/upload_aviso',
		  fd, {
			
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
			
			
          }
        )
        .success(function(response) {
          $scope.result_photo_upload = "Photo Successfully uploaded"
        })
        .error(function(response) {
          $scope.result_photo_upload = "Error uploading picture : " + JSON.stringify(response)
        });
    }
	$scope.uploadImage2 = function() {
	  
      var fd = new FormData();
	  var imgBlob = dataURItoBlob($scope.uploadme2);
     
	  fd.append('api_password',$scope.api_password_input);
      fd.append('file', imgBlob, $scope.theFile2.name);
	   
	  
      $http.post(
          'http://45.56.89.82:4000/upload_aviso',
		  fd, {
			
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
			
			
          }
        )
        .success(function(response) {
          $scope.result_photo_upload2 = "Photo Successfully uploaded"
        })
        .error(function(response) {
          $scope.result_photo_upload2 = "Error uploading picture : " + JSON.stringify(response)
        });
    }
	$scope.uploadImage3 = function() {
	  
      var fd = new FormData();
	  var imgBlob = dataURItoBlob($scope.uploadme3);
     
	  fd.append('api_password',$scope.api_password_input);
      fd.append('file', imgBlob, $scope.theFile3.name);
	   
	  
      $http.post(
          'http://45.56.89.82:4000/upload_aviso',
		  fd, {
			
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
			
			
          }
        )
        .success(function(response) {
          $scope.result_photo_upload3 = "Photo Successfully uploaded"
        })
        .error(function(response) {
          $scope.result_photo_upload3 = "Error uploading picture : " + JSON.stringify(response)
        });
    }
	  //the save method
   

    //you need this function to convert the dataURI
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: mimeString
      });
    }
	
			
	}]);

	//your directive
main_app.directive("fileread", [
  function() {
    return {
      scope: {
        fileread: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
		console.log("element : " + JSON.stringify(element));
          var reader = new FileReader();
		  reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }
]);
	
	
  
  
