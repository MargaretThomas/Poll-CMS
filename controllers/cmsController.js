var app = angular.module("pollApp", ["ui.router", "ngMaterial", "ngMessages", "ngclipboard"])
app.factory('myFactory', ['$http',
        function($http) {
        	// Get the current sunrise and sunset times.
			var gettingSunriseSunset = function(callback, lat, long){
				$http({
				method: 'GET',
				url: 'http://api.sunrise-sunset.org/json?lat='+lat+'&lng='+long+'&date=today&formatted=0',
				headers: {
					'Content-Type': 'application/json'
				},
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			}
			// Get all polls for the tenant.
			var getAllPolls = function(callback){
				$http({
				method: 'GET',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			}
			// Getting the total votes
			var getVoteCounts = function(callback, pollID) {
				$http({
				method: 'GET',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/Answers/'+pollID,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			};
			// Creates a new poll.
			var newPoll = function(callback, objPoll){
				$http({
					method: 'POST',
					url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls',
					headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
					},
					data: JSON.stringify(objPoll)
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			}
			// Get the total votes per answer.
			var getMetaData = function(callback, endpoint){
				$http({
				method: 'GET',
				url: endpoint,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			}
			// Get the last poll. Need the guid for the widget.
			var getLastPoll = function(callback){
				$http({
				method: 'GET',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls/last',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			}
			// Get the poll details for the poll that needs to be updated.
			var getSpecific = function(callback, pollID){
				$http({
				method: 'GET',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls/' +pollID,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
				});
			}
			// Close a poll.
			var closePoll = function(callback, pollID, pollDetails, tennant){
				$http({
				method: 'PUT',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls/'+pollID,
				headers: {
					'Accept': "*/*",
					'Access-Control-Allow-Origin': '*'
				},
				data: {id: pollID, polls: pollDetails, tennantID: tennant}
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
					toastr.info(response.status);
				});
			}
			// Delete a poll.
			var deletePoll = function(callback, pollID, obj){
				$http({
				method: 'DELETE',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls/DELETE/'+pollID,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				data: JSON.stringify(obj)
				}).then(function successCallback(response) {
					// This callback will be called asynchronously when the response is available.
					callback(response);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					callback(response);
					toastr.info(response.status);
				});
			}
            return {
            	funcGetTimes: gettingSunriseSunset,
				funcAllPolls: getAllPolls,
				funcVoteCounts: getVoteCounts,
				funcNewPoll: newPoll,
				funcMetaData: getMetaData,
				funcLastPoll: getLastPoll,
				funcSpecificPoll: getSpecific,
				funcClosePoll: closePoll,
				funcDeletePoll: deletePoll
            }
        }
]);
app.config(function($stateProvider, $urlRouterProvider) {
	// Default to go to the Home page.
	$urlRouterProvider.otherwise("/home");
	// Various states of the app.
    $stateProvider
	.state("home", {
		url: "/home",
		templateUrl: "templates/home.html"
	})
	.state("addPoll", {
		url: "/add-poll",
		templateUrl: "templates/add-poll.html"
	})
	.state("addAnswers", {
		url: "/add-answers",
		templateUrl: "templates/add-answers.html"
	})
	.state("preview", {
		url: "/preview",
        templateUrl : "templates/preview-poll.html"
    })
	.state("publish", {
		url: "/publish",
		templateUrl: "templates/publish.html"
	})
	.state("results", {
		url: "/results",
		templateUrl: "templates/results.html"
	})
	.state("voteCount", {
		url: "/results",
		templateUrl: "templates/results-vote-count.html"
	})
	.state("deviceModel", {
		url: "/results",
		templateUrl: "templates/results-device-model.html"
	})
	.state("osVersion", {
		url: "/results",
		templateUrl: "templates/results-os-version.html"
	})
	.state("manufacturer", {
		url: "/results",
		templateUrl: "templates/results-manufacturer.html"
	})
	.state("os", {
		url: "/results",
		templateUrl: "templates/results-os.html"
	})
	.state("location", {
		url: "/results",
		templateUrl: "templates/results-location.html"
	})
	.state("users", {
		url: "/results",
		templateUrl: "templates/results-users.html"
	})
	.state("help", {
		url: "/help",
		templateUrl: "templates/help.html"
	});
});
app.controller('cmsController', function($scope, $state, myFactory){
	// Load inline styline
	var loadLightInline = function(){
		$scope.style = {
			"h1Style": "color:#000; font-family: 'Raleway', sans-serif;",
			"h2Style": "color:#000; font-family: 'Raleway', sans-serif;",
			"h3Style": "color:#000; font-family: 'Raleway', sans-serif;",
			"h4Style": "font-family: 'Raleway', sans-serif; color:#FFF; text-align:center",
			"previewBlock": "text-align:center",
			"tblHeadingStyle": "font-weight: bold;color: #FFF;",
			"tblStyle": "border: 1px solid black;border-collapse: collapse;padding: 5px;text-align: center; width: 50px;height: 50px;border-radius: 6px;",
			"th": "border: 1px solid black;border-collapse: collapse;padding: 5px;text-align: center; background-color: #E85D22;",
			"tr": "background-color: #FFF;",
			"td": "border: 1px solid black;border-collapse: collapse;padding: 5px;text-align: center;",
			"h4Widget": "color:#000;text-align:center; font-family: 'Raleway', sans-serif;",
			"fieldset": "height:300px; background-color:4D4D4D",
			"btnVote": "background-color: #E85D22;display: block;border-radius: 12px;border: none;text-align: center;text-decoration: none;font-size: 20px;margin: 5px;color: #FFF;padding: 5px;",
			"tblH3": "color:#000; font-family: 'Raleway', sans-serif;",
			"tblRest": "background-color: #4D4D4D; height: 50px;"
		};
	}
	var loadDarkInline = function(){
		$scope.style = {
			"h1Style": "color:#000; font-family: 'Raleway', sans-serif;",
			"h2Style": "color:#000; font-family: 'Raleway', sans-serif;",
			"h3Style": "color:#000; font-family: 'Raleway', sans-serif;",
			"h4Style": "font-family: 'Raleway', sans-serif; color:#FFF; text-align:center",
			"previewBlock": "text-align:center",
			"tblHeadingStyle": "font-weight: bold;color: #000;",
			"tblStyle": "border: 1px solid black;border-collapse: collapse;padding: 5px;text-align: center; width: 50px;height: 50px;border-radius: 6px;",
			"th": "border: 1px solid black;border-collapse: collapse;padding: 5px;text-align: center; background-color: #E85D22;",
			"tr": "background-color: #FFF;",
			"td": "border: 1px solid black;border-collapse: collapse;padding: 5px;text-align: center;",
			"h4Widget": "color:#000;text-align:center; font-family: 'Raleway', sans-serif;",
			"fieldset": "height:300px",
			"btnVote": "background-color: #E85D22;display: block;border-radius: 12px;border: none;text-align: center;text-decoration: none;font-size: 20px;margin: 5px;color: #FFF;padding: 5px;",
			"tblH3": "color:#FFF; font-family: 'Raleway', sans-serif;",
			"tblRest": "background-color: #FFF; height: 50px;"
		};
	}
	// Setting night mode.
	// Default is set to off.
	$scope.status = "true";
	var setDayMode = function(){
		console.log("day");
		$scope.cssPath = "css/light.css"
		$scope.status = "false";
		$scope.mode = "off";
		$scope.modeColor = "#000";
		loadLightInline();
		$scope.greetings = "hello";
	}
	var setNightMode = function(){
		console.log("night");
		$scope.cssPath = "css/dark.css"
		$scope.status = "true";
		$scope.mode = "on";
		$scope.modeColor = "#FFF";
		loadDarkInline();
		$scope.greetings = "goodbye";
	}
	$scope.changeMode = function(statusMode){
		if(statusMode){
			setDayMode();
		}else{
			setNightMode();
		}
	}
	// Swtich based on time.
	var loadBasedOnTime = function(dayHours, dayMinutes, nightHours, nightMinutes){
		// Automatically check time.
		var now = new Date();
		var dayMillis = new Date(now.getFullYear(), now.getMonth(), now.getDate(), dayHours, dayMinutes, 0, 0) - now;
		var nightMillis = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nightHours, nightMinutes, 0, 0) - now;
		console.log("day "+dayMillis);
		console.log("night "+nightMillis);
		// !. Before sunrise and before sunset = load night time:
		if (dayMillis > 0 && nightMillis > 0) {
			setNightMode();
			/*// Setting timeout for switching to day mode.
		     setTimeout(
				function(){
					// Load day mode.
					setDayMode();
					$scope.$apply();
				}, 
				dayMillis);*/
		}
		// 2. After sunrise but before sunset = load day time:
		else if (dayMillis < 0 && nightMillis > 0) {
			setDayMode();
			/*// Setting timeout for switching to night mode.
		     setTimeout(
				function(){
					// Load night mode.
					setNightMode();
					$scope.$apply();
				}, 
				nightMillis);*/
		}
		// 3. After sunset and before sunrise = load night time:
		else if(nightMillis < 0 && dayMillis < 0){
			// Set the timeout to be tomorrow @ the same hour.
			dayMillis += 86400000; // 86400000 Millis = 24 hours.
			setNightMode();
			/*// Setting timeout for switching to day mode.
		     setTimeout(
				function(){
					// Load day mode.
					setDayMode();
				}, 
				dayMillis);*/
		}
		
	}
	$scope.getCurrentLocation = function(){
		// If there's no location - user doesn't provide the location. Then set the default time to 8am to 5pm.
		var dayHours = 8;
		var dayMinutes = 0;
		var nightHours = 17;
		var nightMinutes = 0; 
		// Default theme.
		$scope.cssPath = "css/light.css"
		// If the user allows for the location.
		if (navigator.geolocation){
			function success(position) {
			    var latitude  = position.coords.latitude;
			    var longitude = position.coords.longitude;
			    console.log(latitude);
			    console.log(longitude);
			    myFactory.funcGetTimes(function(response){
			    	if(response.status >= 200 && response.status < 300){
			    		var data = response.data.results;
			    		var sunrise = new Date(data.sunrise);
			    		var sunset = new Date(data.sunset);
			    		console.log(sunset);
			    		dayHours = sunrise.getHours();
			    		dayMinutes = sunrise.getMinutes();
			    		nightHours = sunset.getHours();
			    		nightMinutes = sunset.getMinutes();
			    		console.log(dayHours +" "+ dayMinutes +" "+nightHours+" "+nightMinutes);
		  				loadBasedOnTime(dayHours, dayMinutes, nightHours, nightMinutes);
			    	}
			    }, latitude, longitude);
			  }

			  function error(error) {
				    	console.log(error.code);
				    switch(error.code) {
				        case error.PERMISSION_DENIED:
				    		toastr.error("Unable to get your current location. Permission has been denied. Modes will use the default times.");
				            break;
				        case error.POSITION_UNAVAILABLE:
				            toastr.error("Unable to get your current location. Position is unavailable. Modes will use the default times.");
				            break;
				        case error.TIMEOUT:
				            toastr.error("Unable to get your current location. Timeout error. Modes will use the default times.");
				            break;
				        case error.UNKNOWN_ERROR:
				            toastr.error("Unable to get your current location. Unknown error. Modes will use the default times.");
				            break;
			    }
			}

			  navigator.geolocation.getCurrentPosition(success, error);		
		  }else{
		  	console.log(dayHours +" "+ dayMinutes +" "+nightHours+" "+nightMinutes);
		  	loadBasedOnTime(dayHours, dayMinutes, nightHours, nightMinutes);
		  }		  
		  
	}
	// Set the properties of the Toastr messages.
	toastr.options = {
		"closeButton": true,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-top-right",
		"showMethod": "show",
		"hideMethod": "hide"
	};
	// HOME.
	$scope.goToHome = function(){
		window.localStorage.clear();
		$state.go("home");
	};
	// Store all the polls for this tenant. To be displayed in the home screen.
	$scope.gettingAllPolls = function(){
		// Clear storage.
		window.localStorage.clear();
		$scope.polls = [];
		$scope.totalVotes = [];
		myFactory.funcAllPolls(function(response){
			if(response.status >= 200 && response.status < 300){
				toastr.info("Retrieving all your polls");
				// Success callback.
				var data = response.data;
				// Gett all the polls.
				for(var index=0;index<data.length;index++){
					data[index].start_date = (new Date(data[index].start_date)).toDateString();
					data[index].end_date = (new Date(data[index].end_date)).toDateString();
					$scope.polls.push(data[index]);
					
					// Get the Vote Counts for each answer of each poll.
					var pollID = data[index].poll_guid;
					myFactory.funcVoteCounts(function(response){
						if(response.status >= 200 && response.status < 300){
							var data = response.data;
							$scope.answersCount = [];
							$scope.answersCount.push(data.ans_vote_1);
							$scope.answersCount.push(data.ans_vote_2);
							$scope.answersCount.push(data.ans_vote_3);
							$scope.answersCount.push(data.ans_vote_4);
							var total = 0;
							for(var indexAns=0;indexAns<$scope.answersCount.length;indexAns++){
								total = total + $scope.answersCount[indexAns]; 
							}
							// Store the total votes for all the polls.
							localStorage.setItem("totalVotes", JSON.stringify($scope.totalVotes));
						}else if(response.status == 404){
							// There are no answers as yet. 404 - not found.
							$scope.totalVotes.push(0);
						}					
					}, pollID);
				}
			}else{
				// Failed callback.
				toastr.error("Unable to receive all your polls. Please refresh this page.");
			}
		});
		
	}
	
	// ADD POLL DETAILS.
	$scope.goToAddPoll = function(){
		$state.go("addPoll");
	}
	$scope.loadPollDetails = function(){
		$scope.poll = JSON.parse(localStorage.getItem("poll"));
		if($scope.poll != null){
			$scope.poll.startDate = new Date($scope.poll.startDate);
			$scope.poll.startTime = new Date($scope.poll.startTime);
			$scope.poll.endDate = new Date($scope.poll.endDate);
			$scope.poll.endTime = new Date($scope.poll.endTime);
		}
	}
	$scope.backToAddPoll = function(){
		$scope.loadPollDetails();
		$state.go("addPoll");
	}
	$scope.goToAddAnswers = function(){	
		// Validation:
		if(!($scope.poll == undefined || $scope.poll.title == undefined || $scope.poll.description == undefined || $scope.poll.question == undefined || $scope.poll.closedMessage == undefined || $scope.poll.notifyText == undefined || $scope.poll.sharingURL == undefined || $scope.poll.author == undefined || $scope.poll.startDate == undefined || $scope.poll.startTime == undefined || $scope.poll.endDate == undefined || $scope.poll.endTime == undefined)){
			toastr.info("Data entered is valid");
			// Set the dates up. From the date time picker and time input.
			var hours = new Date($scope.poll.startTime);
			var oldStart = new Date($scope.poll.startDate);
			var starting = new Date(oldStart.setHours(hours.getHours()));
			starting = new Date(oldStart.setMinutes(hours.getMinutes()));
			
			var hours2 = new Date($scope.poll.endTime);
			var oldEnd = new Date($scope.poll.endDate);
			var ending = new Date(oldEnd.setHours(hours2.getHours()));
			ending = new Date(oldEnd.setMinutes(hours2.getMinutes()));
			
			// Get the time offset.
			var dateNow = new Date();
			var difference = dateNow.getTimezoneOffset();
			if(difference > 0){
				var absolute = Math.abs(difference);
				// Add on the time.
				var h = absolute/60;
				var m = absolute%60;
				// Start Date.
				starting.setHours(starting.getHours() - h);
				starting.setMinutes(starting.getMinutes() - m);
				// End Date.
				ending.setHours(ending.getHours() - h);
				ending.setMinutes(ending.getMinutes() - m);
			} else if(difference < 0){
				var absolute = Math.abs(difference);
				// Add on the time.
				var h = absolute/60;
				var m = absolute%60;
				// Start Date.
				starting.setHours(starting.getHours() + h);
				starting.setMinutes(starting.getMinutes() + m);
				// End Date.
				ending.setHours(ending.getHours() + h);
				ending.setMinutes(ending.getMinutes() + m);
			}
			localStorage.setItem("starting",starting);
			localStorage.setItem("ending",ending);
			localStorage.setItem("poll", JSON.stringify($scope.poll));
			$state.go("addAnswers");		
		}else{
			if($scope.poll != undefined){
				if($scope.poll.startDate == undefined){
					toastr.error("Please enter the start date of the poll.");
				}
			}	
		}
	}
	// ADD ANSWERS FOR A POLL.
	$scope.loadAnswers = function(){
		$scope.answers = JSON.parse(localStorage.getItem("answers"));
	}
	$scope.backToAnswers = function(){
		$scope.loadAnswers();
		$state.go("addAnswers");
	}
	$scope.goToPreview = function(){
		// Capture the answers.
		if($scope.answers == undefined || $scope.answers.option1 == undefined || $scope.answers.option2 == undefined){
			toastr.error("Please enter valid data for the options of this poll.");
		}else{
			toastr.info("Data entered is valid");
			var chosenAnswer = "";
			localStorage.setItem("answers", JSON.stringify($scope.answers));
			localStorage.setItem("chosenAnswer", chosenAnswer);
			var starting = (new Date(localStorage.getItem("starting"))).toISOString();
		var ending = (new Date(localStorage.getItem("ending"))).toISOString();
			$state.go("preview");
		}
	}
	// PREVIEW A POLL.
	$scope.goToPublish = function(){
		// Get data ready for publishing
		$scope.poll = JSON.parse(localStorage.getItem("poll"));
		$scope.answers = JSON.parse(localStorage.getItem("answers"));
		var starting = (new Date(localStorage.getItem("starting"))).toISOString();
		var ending = (new Date(localStorage.getItem("ending"))).toISOString();
		// Setting up the object, depends on how many answers there are.
		var ans_count = 0;
		var newPoll = {};
		if($scope.answers.option3 == undefined && $scope.answers.option4 == undefined){
			ans_count = 2;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 0,"answer": ""},"answer4": {"answer_id": 0,"answer": ""},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
		}else if($scope.answers.option3 == undefined && $scope.answers.option4 != undefined){
			ans_count = 3;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option4},"answer4": {"answer_id": 0},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage, "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
		}else if($scope.answers.option3 != undefined && $scope.answers.option4 == undefined){
			ans_count = 3;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option3},"answer4": {"answer_id": 0}, "start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.answers.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
		}else{
			ans_count = 4;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option3},"answer4": {"answer_id": 4,"answer": $scope.answers.option4},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
		}
		
		myFactory.funcNewPoll(function(response){
			if(response.status >= 200 && response.status < 300){
				// Get the last poll.
				myFactory.funcLastPoll(function(response){
					if(response.status >= 200 && response.status < 300){
						var data = response.data;
						var latestGuid = data.poll_guid;
						$scope.embeddableCode = "<iframe src='http://widget.margaret.dx.am/index.html#/firstState/"+latestGuid+"' width='400' height='500' style='background-color: #FFF;font-family: Lato, sans-serif;'></iframe>";
						localStorage.setItem("embeddableCode", $scope.embeddableCode);
					} else{
						toastr.error("Unable to receive the new created poll. Pleas refresh this page.")
					}
				});
				toastr.success($scope.poll.title + " added!");
				$state.go("publish");
			}else{
				toastr.error("Poll did not publish. Please try again.")
			}
		},newPoll);
	}
	$scope.loadWidgetInfo = function(){
		// Load stuff from dummy API.
		$scope.ans = [];
		$scope.ansVote = [];
		$scope.perc = [0,0,0,0];
		var index = 0;
		$scope.newPoll = JSON.parse(localStorage.getItem("poll"));
		var answers = JSON.parse(localStorage.getItem("answers"));
		$scope.answers = answers;
		if($scope.newPoll == undefined || answers == undefined){
			toastr.warning("Please make sure to add the poll details and the various answers before previewing.");
		}else{
			for(var item in answers){				
				$scope.ans.push(answers[item]);
				$scope.ansVote.push(0);
			}
			$scope.chosenAnswer = localStorage.getItem("chosenAnswer");
		}
		$scope.embeddableCode = localStorage.getItem("embeddableCode");		
	}
	// PUBLISH A POLL.
	$scope.getNewlyCreatedPoll = function(){
		// Show full page LoadingOverlay
		$.LoadingOverlay("show");
		
		// Hide it after 3 seconds
		setTimeout(function(){
			$scope.embeddableCode = localStorage.getItem("embeddableCode");
			$.LoadingOverlay("hide");
		}, 3000);
	}
	$scope.loadDefault = function(){
		$state.go("voteCount");
	}
	// VIEW RESULTS.
	$scope.goToResults = function(){
		$state.go("results");
	}
	$scope.loadVoteCount = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/Answers/'+resultGUID;
		var data;
		$scope.answers = [];
		
		myFactory.funcSpecificPoll(function(response){
			if(response.status >= 200 && response.status < 300){
				// Successful Callback.
				// Get the data.
				var pollDetails = response.data;
				var ans1 = pollDetails.answer.answer.charAt(0).toUpperCase() + pollDetails.answer.answer.substring(1).toLowerCase();
				$scope.answers.push(ans1);
				var ans2 = pollDetails.answer2.answer.charAt(0).toUpperCase() + pollDetails.answer2.answer.substring(1).toLowerCase();
				$scope.answers.push(ans2);
				if(pollDetails.answer3.answer != "" && pollDetails.answer3.answer != undefined){
					var ans3 = pollDetails.answer3.answer.charAt(0).toUpperCase() + pollDetails.answer3.answer.substring(1).toLowerCase();
					$scope.answers.push(ans3);
				}
				if(pollDetails.answer4.answer != "" && pollDetails.answer4.answer != undefined){
					var ans4 = pollDetails.answer4.answer.charAt(0).toUpperCase() + pollDetails.answer4.answer.substring(1).toLowerCase();
					$scope.answers.push(ans4);
				}
				localStorage.setItem("answersResult", JSON.stringify($scope.answers));
				localStorage.setItem("ansCount", pollDetails.ans_count);
			}
		}, resultGUID);
		myFactory.funcMetaData(function(response){
			$scope.existingItemsVC = [];
			$scope.notExistingItemsVC = [];
			if(response.status >= 200 && response.status < 300){
				// Success callback.
				data = response.data;
				$scope.totalVotes = data.poll_vote_total;
				$scope.answersCount = [];
				$scope.answersCount.push(data.ans_vote_1);
				$scope.answersCount.push(data.ans_vote_2);
				$scope.answersCount.push(data.ans_vote_3);
				$scope.answersCount.push(data.ans_vote_4);
				// Percentages for each answer.
				$scope.answersPerc = [];
				$scope.answersPerc.push(data.percent1);
				$scope.answersPerc.push(data.percent2);
				$scope.answersPerc.push(data.percent3);
				$scope.answersPerc.push(data.percent4);
				toastr.success('Received latest vote counts!');
				// Add existingItems.
				if(data.ans_vote_1 == 0){
					$scope.notExistingItemsVC.push(0);
				}else{
					$scope.existingItemsVC.push(0);
				}
				if(data.ans_vote_2 == 0){
					$scope.notExistingItemsVC.push(1);
				}else{
					$scope.existingItemsVC.push(1);
				}
				if(data.ans_vote_3 == 0){
					$scope.notExistingItemsVC.push(2);
				}else{
					$scope.existingItemsVC.push(2);
				}
				if(data.ans_vote_4 == 0){
					$scope.notExistingItemsVC.push(3);
				}else{
					$scope.existingItemsVC.push(4);
				}
			}else{
				$scope.totalVotes = 0;
				var ansCount = localStorage.getItem("ansCount");
				if(ansCount == 2){
					$scope.answersCount = [0,0];
					$scope.answersPerc = [0,0];
				}else if(ansCount == 3){
					$scope.answersCount = [0,0,0];
					$scope.answersPerc = [0,0,0];
				}else{
					$scope.answersCount = [0,0,0,0];
					$scope.answersPerc = [0,0,0,0];
				}
				toastr.error(response.data);
			}
		}, metaEndpoint);
	}
	$scope.loadDeviceModel = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/MetaDeviceModel/'+resultGUID;
		var data;
		$scope.deviceModel = [];
		$scope.deviceModelCount = [];
		$scope.deviceModelPerc = [];
		$scope.totalVotes = 0;
		var ansCount = localStorage.getItem("ansCount");
				
		myFactory.funcMetaData(function(response){
			$scope.existingItemsDM = [];
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(var arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					var dm = data[arrayIndex].device_model_name.charAt(0).toUpperCase() + data[arrayIndex].device_model_name.substring(1).toLowerCase();
					$scope.deviceModel.push(dm);
					$scope.deviceModelCount.push(data[arrayIndex].device_model_count);
					$scope.deviceModelPerc.push(data[arrayIndex].percentage);
					$scope.totalVotes = data[arrayIndex].total;
					if(data[arrayIndex].device_model_count != 0){
						$scope.existingItemsDM.push(arrayIndex);	
					}
				}
				toastr.success('Received latest counts for device models!');
			}else{
				$scope.totalVotes = 0;
				if(ansCount == 2){
					$scope.deviceModel = ['Device Model 1','Device Model 2'];
					$scope.deviceModelCount = [0,0];
					$scope.deviceModelPerc = [0,0];
				}else if(ansCount == 3){
					$scope.deviceModel = ['Device Model 1','Device Model 2','Device Model 3'];
					$scope.deviceModelCount = [0,0,0];
					$scope.deviceModelPerc = [0,0,0];
				}else{
					$scope.deviceModel = ['Device Model 1','Device Model 2','Device Model 3','Device Model 4'];
					$scope.deviceModelCount = [0,0,0,0];
					$scope.deviceModelPerc = [0,0,0,0];
				}
				toastr.error("Record could not be found");
			}
		}, metaEndpoint);
	}
	$scope.loadOSVersion = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/MetaOSVersion/'+resultGUID;
		var data;
		$scope.os_version_name = [];
		$scope.os_version_count = [];
		$scope.osVersionPerc = [];
		$scope.totalVotes = 0;
		var ansCount = localStorage.getItem("ansCount");
		
		myFactory.funcMetaData(function(response){
			$scope.existingItemsOV = [];
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					var osV = data[arrayIndex].os_version_name.charAt(0).toUpperCase() + data[arrayIndex].os_version_name.substring(1).toLowerCase();
					$scope.os_version_name.push(osV);
					$scope.os_version_count.push(data[arrayIndex].os_version_count);
					$scope.osVersionPerc.push(data[arrayIndex].percentage);
					$scope.totalVotes = data[arrayIndex].total;
					if(data[arrayIndex].os_version_count != 0){
						$scope.existingItemsOV.push(arrayIndex);	
					}
				}
				toastr.success('Received latest counts for OS versions!');
			}else{
				$scope.totalVotes = 0;
				if(ansCount == 2){
					$scope.os_version_name = ['OS Version 1','OS Version 2'];
					$scope.os_version_count = [0,0];
					$scope.osVersionPerc = [0,0];
				}else if(ansCount == 3){
					$scope.os_version_name = ['OS Version 1','OS Version 2','OS Version 3'];
					$scope.os_version_count = [0,0,0];
					$scope.osVersionPerc = [0,0,0];
				}else{
					$scope.os_version_name = ['OS Version 1','OS Version 2','OS Version 3','OS Version 4'];
					$scope.os_version_count = [0,0,0,0];
					$scope.osVersionPerc = [0,0,0,0];
				}
				toastr.error("Record could not be found");
			}
		}, metaEndpoint);
	}
	$scope.loadManufacturerCount = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/MetaManufacturer/'+resultGUID;
		var data;
		$scope.manufacturer_name = [];
		$scope.manufacturer_count = [];
		$scope.manufacturerPerc = [];
		$scope.totalVotes = 0;
		var ansCount = localStorage.getItem("ansCount");
		
		myFactory.funcMetaData(function(response){
			$scope.existingItemsM = [];
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					var manuName = data[arrayIndex].manufacturer_name.charAt(0).toUpperCase() + data[arrayIndex].manufacturer_name.substring(1).toLowerCase();
					$scope.manufacturer_name.push(manuName);
					$scope.manufacturer_count.push(data[arrayIndex].manufacturer_count);
					$scope.manufacturerPerc.push(data[arrayIndex].percentage);
					$scope.totalVotes = data[arrayIndex].total;
					if(data[arrayIndex].manufacturer_count != 0){
						$scope.existingItemsM.push(arrayIndex);
					}
				}
				toastr.success('Received latest counts for Manufacturers!');
			}else{
				$scope.totalVotes = 0;
				if(ansCount == 2){
					$scope.manufacturer_name = ['Manufacturer 1','Manufacturer 2'];
					$scope.manufacturer_count = [0,0];
					$scope.manufacturerPerc = [0,0];
				}else if(ansCount == 3){
					$scope.manufacturer_name = ['Manufacturer 1','Manufacturer 2','Manufacturer 3'];
					$scope.manufacturer_count = [0,0,0];
					$scope.manufacturerPerc = [0,0,0];
				}else{
					$scope.manufacturer_name = ['Manufacturer 1','Manufacturer 2','Manufacturer 3','Manufacturer 4'];
					$scope.manufacturer_count = [0,0,0,0];
					$scope.manufacturerPerc = [0,0,0,0];
				}
				toastr.error("Record could not be found");
			}
		}, metaEndpoint);
	}
	$scope.loadOSType = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/MetaOS/'+resultGUID;
		var data;
		$scope.os_type = [];
		$scope.os_count = [];
		$scope.osTypePerc = [];
		$scope.totalVotes = 0;
		var ansCount = localStorage.getItem("ansCount");
		
		myFactory.funcMetaData(function(response){
			$scope.existingItemsOT = [];
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					var osT = data[arrayIndex].os_type.charAt(0).toUpperCase() + data[arrayIndex].os_type.substring(1).toLowerCase();
					$scope.os_type.push(osT);
					$scope.os_count.push(data[arrayIndex].os_count);
					$scope.osTypePerc.push(data[arrayIndex].percentage);
					$scope.totalVotes = data[arrayIndex].total;
					if(data[arrayIndex].os_count != 0){
						$scope.existingItemsOT.push(arrayIndex);
					}
				}
				toastr.success('Received latest counts for OS types!');
			}else{
				$scope.totalVotes = 0;
				if(ansCount == 2){
					$scope.os_type = ['OS Type 1','OS Type 2'];
					$scope.os_count = [0,0];
					$scope.osTypePerc = [0,0];
				}else if(ansCount == 3){
					$scope.os_type = ['OS Type 1','OS Type 2','OS Type 3'];
					$scope.os_count = [0,0,0];
					$scope.osTypePerc = [0,0,0];
				}else{
					$scope.os_type = ['OS Type 1','OS Type 2','OS Type 3','OS Type 4'];
					$scope.os_count = [0,0,0,0];
					$scope.osTypePerc = [0,0,0,0];
				}
				toastr.error("Record could not be found");
			}
		}, metaEndpoint);
	}
	$scope.loadLocationCount = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/MetaLocation/'+resultGUID;
		var data;
		$scope.location_Name = [];
		$scope.loc_Count = [];
		$scope.locationPerc = [];
		$scope.totalVotes = 0;
		var ansCount = localStorage.getItem("ansCount");
		
		myFactory.funcMetaData(function(response){
			$scope.existingItemsL = [];
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					var locName = data[arrayIndex].location_Name.charAt(0).toUpperCase() + data[arrayIndex].location_Name.substring(1).toLowerCase();
					$scope.location_Name.push(locName);
					$scope.loc_Count.push(data[arrayIndex].loc_Count);
					$scope.locationPerc.push(data[arrayIndex].percentage);
					$scope.totalVotes = data[arrayIndex].total;
					if(data[arrayIndex].loc_Count != 0){
						$scope.existingItemsL.push(arrayIndex);
					}
				}
				toastr.success('Received latest counts for locations!');
			}else{
				$scope.totalVotes = 0;
				if(ansCount == 2){
					$scope.location_Name = ['Location 1','Location 2'];
					$scope.loc_Count = [0,0];
					$scope.locationPerc = [0,0];
				}else if(ansCount == 3){
					$scope.location_Name = ['Location 1','Location 2','Location 3'];
					$scope.loc_Count = [0,0,0];
					$scope.locationPerc = [0,0,0];
				}else{
					$scope.location_Name = ['Location 1','Location 2','Location 3','Location 4'];
					$scope.loc_Count = [0,0,0,0];
					$scope.locationPerc = [0,0,0,0];
				}
				toastr.error("Record could not be found");
			}
		}, metaEndpoint);
	}
	$scope.loadUsersCount = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/UserData/'+resultGUID;
		var data;
		$scope.user_id = [];
		$scope.user_name = [];
		$scope.platform = [];
		$scope.vote = [];
		$scope.totalVotes = 0;
		
		var allAnswers = JSON.parse(localStorage.getItem("answersResult"));
		
		myFactory.funcMetaData(function(response){
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					$scope.user_id.push(data[arrayIndex].user_id);
					$scope.user_name.push(data[arrayIndex].user_name);
					var ans = data[arrayIndex].answer.charAt(0).toUpperCase() + data[arrayIndex].answer.substring(1).toLowerCase();
					$scope.platform.push(ans);
					var ansID = data[arrayIndex].ans_id - 1;
					$scope.vote.push(allAnswers[ansID]);
					$scope.totalVotes = $scope.totalVotes + data[arrayIndex].total;
				}
				toastr.success('Received latest user data!');
			}else{
				$scope.totalVotes = 0;
				var ansCount = localStorage.getItem("ansCount");
				if(ansCount == 2){
					$scope.user_id = [1,2];
					$scope.user_name = ['User 1','User 2'];
					$scope.platform = ['Platform 1','Platform 2']
					$scope.vote = ['Answer 1','Answer 2'];
				}else if(ansCount == 3){
					$scope.user_id = [1,2,3];
					$scope.user_name = ['User 1','User 2','User 3'];
					$scope.platform = ['Platform 1','Platform 2','Platform 3']
					$scope.vote = ['Answer 1','Answer 2','Answer 3'];
				}else{
					$scope.user_id = [1,2,3,4];
					$scope.user_name = ['User 1','User 2','User 3','User 4'];
					$scope.platform = ['Platform 1','Platform 2','Platform 3','Platform 4']
					$scope.vote = ['Answer 1','Answer 2','Answer 3','Answer 4'];
				}
				toastr.error("Record could not be found");
			}
		}, metaEndpoint);
	}
});