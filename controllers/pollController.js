var app = angular.module("pollApp", ["ui.router"])
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");
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
});