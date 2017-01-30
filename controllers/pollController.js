var app = angular.module("pollApp", ["ui.router", "ngMaterial"])
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
app.controller('cmsController', function($scope, $state){
	// Some functions to update the state.
	$scope.goToHome = function(){
		$state.go("home");
	};
	$scope.goToAddPoll = function(){
		$state.go("addPoll");
	}
	$scope.goToAddAnswers = function(){
		// Capture new poll details.
		var newPoll = {pollStatus:"Open", pollID:"3", title:"Favourite Soup", question:"What is your favourite soup?", answerCount:3, totalVotes:20, startDate:"2017-02-01T08:00:00Z", endDate:"2017-02-19T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite Soup Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"www.google.com"};
		localStorage.setItem("poll", JSON.stringify(newPoll));
		$state.go("addAnswers");
	}
	$scope.goToPreview = function(){
		// Capture the answers.
		var answers = [["Tomato Soup",11], ["Potato Soup",6], ["Leek Soup", 4]];
		$scope.chosenAnswer = "Tomato Soup";
		localStorage.setItem("answers", JSON.stringify(answers));
		$state.go("preview");
	}
	$scope.goToPublish = function(){
		$state.go("publish");
	}
	$scope.goToResults = function(){
		$state.go("results");
	}
	// Dummy content for now. Here is where the the API request will be made.
	var data = [{pollStatus:"Closed", pollID:"1", title:"Favourite Vegetable", description:"Poll to determine the most favourite vegetable.", question:"What is your favourite veggie?", answerCount:3, totalVotes:20, endDate:"2017-01-15T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite Vegetable Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"www.google.com"}, {pollStatus:"Open", pollID:"2", title:"Favourite Fruit", description:"Poll to find out what is the most favourite fruit.", question:"What is your favourite fruit?", answerCount:3, totalVotes:20, endDate:"2017-02-19T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite fruit Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"www.google.com"}];
	
	$scope.poll = data;
	
	$scope.loadWidgetInfo = function(){
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
	}
	$scope.formatNumber = function(votes) {
		return Math.round(votes); 
		//return votes;
	}
});