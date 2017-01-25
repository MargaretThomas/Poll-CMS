var app = angular.module("pollApp", ["ui.router"])
app.config(function($stateProvider, $urlRouterProvider) {
	// Default to go to the Home page.
	$urlRouterProvider.otherwise("/home");
	// Various states of the app.
    $stateProvider
    .state("login", {
		url: "/login",
        templateUrl : "templates/login.html"
    })
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
	$scope.goToAddAnswers = function(){
		$state.go("addAnswers");
	}
	$scope.goToPreview = function(){
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
});