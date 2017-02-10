var app = angular.module("pollApp", ["ui.router", "ngMaterial"])
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
					callback(response.data);
				}, function errorCallback(response) {
					// Called asynchronously if an error occurs or server returns response with an error status.
					alert("Could not load all the polls.");
				});
			}
			// Creates a new poll.
			var newPoll = function(objPoll){
				var request = {
					method: 'POST',
					url: 'http:/pollapi.azurewebsites.net/98b6b223-6849-4c3b-8c50-1f42f26946ed/api/polls',
					headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
					},
					data: JSON.stringify(objPoll)
				}
				$http(request).then(function(){
					alert("POSTed");
				}, function()
				{
					alert("not POSTed");
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
            return {
				funcAllPolls: getAllPolls,
				funcNewPoll: newPoll,
				funcMetaData: getMetaData
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
	// Some functions to update the state.
	$scope.goToHome = function(){
		$state.go("home");
	};
	$scope.goToAddPoll = function(){
		$state.go("addPoll");
	}
	$scope.goToAddAnswers = function(){	
		// Validation:
		var title = $scope.poll.title;
		var description = $scope.poll.description;
		var question = $scope.poll.question;
		var thanksMessage = $scope.poll.thanksMessage;
		var closedMessage = $scope.poll.closedMessage;
		var notifyText = $scope.poll.notifyText;
		var sharingURL = $scope.poll.sharingURL;
		var createdBy = $scope.poll.createdBy;
		var startDate = $scope.poll.startDate;
		var startTime = $scope.poll.startTime;
		var endDate = $scope.poll.endDate;
		var endTime = $scope.poll.endTime;
		
		localStorage.setItem("poll", JSON.stringify($scope.poll));
		$state.go("addAnswers");
	}
	$scope.goToPreview = function(){
		// Capture the answers.
		var chosenAnswer = "Jazz";
		localStorage.setItem("answers", JSON.stringify($scope.answers));
		localStorage.setItem("chosenAnswer", chosenAnswer);
		$state.go("preview");
	}
	$scope.goToPublish = function(){
		
		$scope.poll = JSON.parse(localStorage.getItem("poll"));
		$scope.answers = JSON.parse(localStorage.getItem("answers"));
		
		var hours = new Date($scope.poll.startTime);
		var oldStart = new Date($scope.poll.startDate);
		var starting = new Date(oldStart.setHours(hours.getHours()));
		
		var hours2 = new Date($scope.poll.endTime);
		var oldEnd = new Date($scope.poll.endDate);
		var ending = new Date(oldEnd.setHours(hours2.getHours()));
		
		var newPoll = {"poll_title": $scope.poll.title,"poll_description": $scope.poll.description,"status": 1,"question": $scope.poll.question,"ans_count": 4,"answer": {"answer_id": 1,"answer": $scope.answers.option1},"answer2": {"answer_id": 2,"answer": $scope.answers.option2},"answer3": {"answer_id": 3,"answer": $scope.answers.option3},"answer4": {"answer_id": 4,"answer": $scope.answers.option4},"start_date": starting,"end_date": ending,"thanks_message": $scope.poll.thanksMessage,"closed_message": $scope.poll.closedMessage,  "notification_text": $scope.poll.notifyText,"share_url": $scope.poll.sharingURL,"author": $scope.poll.author};
		
		myFactory.funcNewPoll(newPoll);
		$state.go("publish");
	}
	$scope.goToResults = function(){
		$state.go("results");
	}
	// Store all the polls for this tenant. To be displayed in the home screen.
	$scope.gettingAllPolls = function(){
		$scope.polls = [];
		myFactory.funcAllPolls(function(data){
			for(var index=0;index<data.length;index++){
				$scope.polls.push(data[index]);
			}
		});
	}
		
	$scope.loadWidgetInfo = function(){
		/*
		// Load stuff from dummy API.
		$scope.ans = [];
		$scope.ansVote = [];
		var index = 0;
		$scope.newPoll = JSON.parse(localStorage.getItem("poll"));
		var answers = JSON.parse(localStorage.getItem("answers"));
		$scope.answers = answers;
		for(var item in answers){
			var singleAnswer = answers[item];
			$scope.ans.push(singleAnswer[0]);
			$scope.ansVote.push(singleAnswer[1]);
		}
		$scope.chosenAnswer = localStorage.getItem("chosenAnswer");
		
		*/
	}
	$scope.loadDefault = function(){
		$state.go("voteCount");
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
});