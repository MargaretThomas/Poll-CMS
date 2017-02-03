angular.module('myApp', [])
    .factory('myFactory', ['$http',
        function($http) {
			// Getting the media from immedia's profile.
			var getMediaFromImmedia = function(callback) {
				var endPoint = 'https://api.instagram.com/v1/users/276072369/media/recent/??count=99&callback=JSON_CALLBACK&access_token=276072369.1677ed0.0fc757946b45400da3db42f5264d55b6';
	
				$http.jsonp(endPoint).success(function(response) {
					callback(response.data);
				});
            };
			
            return {
                getMediaFromImmedia
            }
        }
    ])
    .controller("myCtrl", function($scope, $http, myFactory) {
		// Storing the info that was returned from Instagram.	
		$scope.data = [];
		// Storing the mediaIDs for all media that has a comment.
		$scope.mediaIDs = [];
		$scope.mediaId;
		// Storing all the comments.
		$scope.comments = [];
		
		// Method to get immedia's info and store it in the data array.
		$scope.getDataForImmedia = function(){
			myFactory.getMediaFromImmedia(function(data){
				for(var index=0;index<data.length;index++){
					$scope.data.push(data[index]);					
					if(data[index].comments.count > 0){
						$scope.mediaIDs.push(data[index].id);
					}
				}
			});
		}
		
		// Method to get all existing comments.
		$scope.getComments = function(){
			// Loop through mediaIDs array.
			for(var j=0;j<$scope.mediaIDs.length;j++){
				// Save latest media id.
				$scope.mediaId = $scope.mediaIDs[j];
				
				var endPoint = "https://api.instagram.com/v1/media/"+$scope.mediaIDs[j]+"/comments?access_token=276072369.1677ed0.0fc757946b45400da3db42f5264d55b6&callback=JSON_CALLBACK";
		
				$http.jsonp(endPoint).success(function(response) {
					$scope.weather = response.data;
					for(var index=0;index<response.data.length;index++){
						$scope.comments.push(response.data[index].text);
					}
				});
				
			}
		}
    });