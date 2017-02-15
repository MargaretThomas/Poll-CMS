var app = angular.module("pollApp", ["ui.router", "ngMaterial", "ngMessages"])
app.factory('myFactory', ['$http',
        function($http) {
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
					url: 'http:/pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls',
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
			var closePoll = function(callback, pollID, obj){
				$http({
				method: 'PUT',
				url: 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls/'+pollID,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'mimeType': 'json'
				},
				data: obj
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
	.state("help", {
		url: "/help",
		templateUrl: "templates/help.html"
	});
});
app.controller('cmsController', function($scope, $state, myFactory){
	// Set the properties of the Toastr messages.
	toastr.options = {
		"closeButton": true,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-top-left"
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
			$state.go("preview");
		}
	}
	// PREVIEW A POLL.
	$scope.goToPublish = function(){
		// Get data ready for publishing
		$scope.poll = JSON.parse(localStorage.getItem("poll"));
		$scope.answers = JSON.parse(localStorage.getItem("answers"));
		
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
			starting.setHours(starting.getHours() + h);
			starting.setMinutes(starting.getMinutes() + m);
			// End Date.
			ending.setHours(starting.getHours() + h);
			ending.setMinutes(starting.getMinutes() + m);
		} else if(difference < 0){
			var absolute = Math.abs(difference);
			// Add on the time.
			var h = absolute/60;
			var m = absolute%60;
			// Start Date.
			starting.setHours(starting.getHours() - h);
			starting.setMinutes(starting.getMinutes() - m);
			// End Date.
			ending.setHours(starting.getHours() - h);
			ending.setMinutes(starting.getMinutes() - m);
		}
		// Setting up the object, depends on how many answers there are.
		var ans_count = 0;
		var newPoll = {};
		if($scope.answers.option3 == undefined && $scope.answers.option4 == undefined){
			ans_count = 2;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 0,"answer": ""},"answer4": {"answer_id": 0,"answer": ""},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
			console.log("2");
		}else if($scope.answers.option3 == undefined && $scope.answers.option4 != undefined){
			ans_count = 3;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option4},"answer4": {"answer_id": 0},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage, "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
			console.log("3..");
		}else if($scope.answers.option3 != undefined && $scope.answers.option4 == undefined){
			ans_count = 3;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option3},"answer4": {"answer_id": 0}, "start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.answers.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
			console.log("3.+");
		}else{
			ans_count = 4;
			newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": ans_count,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option3},"answer4": {"answer_id": 4,"answer": $scope.answers.option4},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
			console.log("4");
		}
		
		myFactory.funcNewPoll(function(response){
			if(response.status >= 200 && response.status < 300){
				// Get the last poll.
				myFactory.funcLastPoll(function(response){
					if(response.status >= 200 && response.status < 300){
						var data = response.data;
						var latestGuid = data.poll_guid;
						$scope.embeddableCode = "<iframe src='http://widget.margaret.dx.am/index.html#/firstState/"+latestGuid+"' width='400' height='500' style='background-color: #FFF;font-family: Lato, sans-serif;'></iframe>";
						console.log($scope.embeddableCode);
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
		$scope.answers = JSON.parse(localStorage.getItem("answers"));
		myFactory.funcMetaData(function(response){
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
			}else{
				$scope.totalVotes = 0;
				$scope.answersCount = [0,0,0,0];
				$scope.answersPerc = [0,0,0,0];
				toastr.error('Unable to received latest vote count. Please ensure that votes have been cast');
			}
		}, metaEndpoint);
	}
	$scope.loadDeviceModel = function(){
		var resultGUID = localStorage.getItem("resultGUID");
		var metaEndpoint = 'http://pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/AnsResult/MetaDeviceModel/'+resultGUID;
		var data;
		myFactory.funcMetaData(function(response){
			if(response.status >= 200 && response.status < 300 && response.data.length > 0) {
				var data = response.data;
				for(arrayIndex = 0; arrayIndex < data.length; arrayIndex++){
					$scope.deviceModel.push(data[arrayIndex].device_model_name);
					$scope.deviceModelCount.push(data[arrayIndex].device_model_count);
					$scope.deviceModelPerc.push(data[arrayIndex].percentage);
					$scope.totalVotes = data[arrayIndex].total;
				}
				toastr.success('Received latest counts for device models!');
			}else{
				$scope.totalVotes = 0;
				$scope.deviceModel = ['Device Model 1','Device Model 2','Device Model 3','Device Model 4'];
				$scope.deviceModelCount = [0,0,0,0];
				$scope.deviceModelPerc = [0,0,0,0];
				toastr.error('Unable to received latest counts for device models. Please ensure that votes have been cast');
			}
		}, metaEndpoint);
	}
	// DETELE A POLL.
	
});