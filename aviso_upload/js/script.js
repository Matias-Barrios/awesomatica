var main_app = angular.module('main_app',['ngTable','LocalStorageModule','ngMaterial','jkAngularCarousel']);



main_app.controller('main_controller', ['$scope','$http', 'NgTableParams','localStorageService','$location','$filter', function($scope,$http,NgTableParams,localStorageService,$location,$filter) {
		
		 //the image
    $scope.uploadme;
	

    $scope.uploadImage = function() {
	  $scope.result_upload = "";
      var fd = new FormData();
      var imgBlob = dataURItoBlob($scope.uploadme);
      fd.append('file', imgBlob);
      $http.post(
          'imageURL',
          fd, {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }
        )
        .success(function(response) {
          $scope.result_upload = "Successfully uploaded"
        })
        .error(function(response) {
          $scope.result_upload = "Error uploading picture : " + response
        });
    }


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
	
	
  
  
