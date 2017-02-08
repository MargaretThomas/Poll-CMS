var app = angular.module("pollApp", ["ui.router", "ngMaterial"])
app.factory('myFactory', ['$http',
        function($http) {
			// Get all polls for the tenant.
			var getAllPolls = function(callback){
				$http({
				method: 'GET',
				url: 'http://pollapi.azurewebsites.net/123/api/polls',
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
				var req = {
					method: 'POST',
					url: 'http:/pollapi.azurewebsites.net/123/api/polls',
					headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
					},
					data: JSON.stringify(objPoll)
				}
				$http(req).then(function(){
					alert("POSTed");
				}, function()
				{
					alert("not POSTed");
				});
			}
            return {
				funcAllPolls: getAllPolls,
				funcNewPoll: newPoll
				
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
		var newPoll = {"poll_title": "Fav Fast Food!","poll_description": "Find out the favourite take out restaurant","status": 1,"question": "Where do you go for your favourite take out","ans_count": 4,"answer": {"answer_id": 1,"answer": "KFC"},"answer2": {"answer_id": 2,"answer": "Chicken Licken"},"answer3": {"answer_id": 3,"answer": "Burger King"},"answer4": {"answer_id": 4,"answer": "Steers"},"start_date": "2017-02-08T08:00:00.591Z","end_date": "2017-02-08T17:00:00.591Z","thanks_message": "Thanks for participating!","closed_message": "This poll is now closed",  "notification_text": "Hey! Check out this poll - Fav Fast Food","share_url": "www.yfm.co.za","author": "DJ Jones"}
		
		
		//myFactory.funcNewPoll(newPoll);
		localStorage.setItem("poll", JSON.stringify(newPoll));
		$state.go("addAnswers");
	}
	$scope.goToPreview = function(){
		// Capture the answers.
		var answers = [["Jazz",3], ["Pop",2], ["Deep House", 4], ["Rock", 1]];
		var chosenAnswer = "Jazz";
		localStorage.setItem("answers", JSON.stringify(answers));
		localStorage.setItem("chosenAnswer", chosenAnswer);
		$state.go("preview");
	}
	$scope.goToPublish = function(){
		$state.go("publish");
	}
	$scope.goToResults = function(){
		$state.go("results");
	}
	// Store all the polls for this tenant. To be displayed in the home screen.
	$scope.polls = [];
	
	$scope.gettingAllPolls = function(){
		myFactory.funcAllPolls(function(data){
			for(var index=0;index<data.length;index++){
				$scope.polls.push(data[index]);
			}
		});
	}
		
	$scope.loadWidgetInfo = function(){
		$scope.gettingLastPoll();
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
	}
	$scope.loadResults = function(){
		$scope.loadWidgetInfo();
		$scope.platforms = [["iOS",5], ["Android",3], ["Web", 2]];
		$scope.locations = [["Durban",4], ["Cape Town",3], ["Johannesburg", 3]];
	}
	$scope.formatNumber = function(votes) {
		return Math.round(votes); 
		//return votes;
	}
});