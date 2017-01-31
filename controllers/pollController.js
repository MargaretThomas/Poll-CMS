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
		$scope.poll =  [{pollStatus:"Closed", pollID:"cd5f4e71-0637-4839-93fa-78cd3d598dda", title:"Favourite Vegetable", description:"Poll to determine the most favourite vegetable.", question:"What is your favourite veggie?", answerCount:3, totalVotes:20, endDate:"2017-01-15T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite Vegetable Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"https://www.yfm.co.za/", author: "DJ John"}, {pollStatus:"Open", pollID:"57fc2f6d-82e7-e611-af1f-00dbdf9ddb35", title:"Favourite Fruit", description:"Poll to find out what is the most favourite fruit.", question:"What is your favourite fruit?", answerCount:3, totalVotes:20, endDate:"2017-02-19T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite fruit Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"https://www.yfm.co.za/", author: "DJ John"}, {pollStatus:"Open", pollID:"6a3fc393-82e7-e611-af1f-00dbdf9ddb35", title:"Favourite Genre", question:"What type of music would you like to hear today?", answerCount:4, totalVotes:10, startDate:"2017-01-31T08:00:00Z", endDate:"2017-01-31T17:00:00Z", thanksMessage:"Thanks for your feedback!", closedMessage:"The Genre Poll is now Closed!", websiteForSharing:"https://www.yfm.co.za/", author: "DJ John"}];
		$state.go("home");
	};
	$scope.goToAddPoll = function(){
		$state.go("addPoll");
	}
	$scope.goToAddAnswers = function(){
		// Capture new poll details.
		var newPoll = {pollStatus:"Open", pollID:"6a3fc393-82e7-e611-af1f-00dbdf9ddb35", title:"Favourite Genre", question:"What type of music would you like to hear today?", answerCount:4, totalVotes:10, startDate:"2017-01-31T08:00:00Z", endDate:"2017-01-31T17:00:00Z", thanksMessage:"Thanks for your feedback!", closedMessage:"The Genre Poll is now Closed!", websiteForSharing:"https://www.yfm.co.za/", author: "DJ John"};
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
	// Dummy content for now. Here is where the the API request will be made.
	var data = [{pollStatus:"Closed", pollID:"cd5f4e71-0637-4839-93fa-78cd3d598dda", title:"Favourite Vegetable", description:"Poll to determine the most favourite vegetable.", question:"What is your favourite veggie?", answerCount:3, totalVotes:20, endDate:"2017-01-15T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite Vegetable Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"www.google.com", author: "DJ John"}, {pollStatus:"Open", pollID:"57fc2f6d-82e7-e611-af1f-00dbdf9ddb35", title:"Favourite Fruit", description:"Poll to find out what is the most favourite fruit.", question:"What is your favourite fruit?", answerCount:3, totalVotes:20, endDate:"2017-02-19T16:30:00Z", thanksMessage:"Thanks for participating in the Favourite fruit Poll!!", closedMessage:"The poll is now closed", websiteForSharing:"https://www.yfm.co.za", author: "DJ John"}];
	
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