// Creates a fieldset for each poll.
app.directive("singlePoll", function() {
    return {
		restrict: "E",
		scope:{
			poll: "=",
			total_votes: "="
		},
        templateUrl: "templates/poll-template.html",
		link: function(scope, elem, attrs){
		}
    };
});
// Go to the results page
app.directive("viewResults", function($state) {
    return {
		restrict: "E",
		scope:{
			id: "="
		},
        templateUrl: "templates/btnResult.html",
		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				localStorage.setItem("resultGUID", scope.id);
				$state.go("results");
			});
		}
    };
});
// Closed a poll.
app.directive("closePoll", function(myFactory){
	return{
		restrict: "E",
		scope:{
			id: "="
		},
		templateUrl: "templates/closed-poll.html",
		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				var poll_id = scope.id;
				var confirmClose = confirm("Are you sure that you want to close this poll?");
				if(confirmClose){
					// Get the poll details for the specific poll that we want to close.
					myFactory.funcSpecificPoll(function(response){
					if(response.status >= 200 && response.status < 300){
						// Successful Callback.
						// Get the data.
						var pollDetails = response.data;
						// Set the status = 3 : closes the poll.
						pollDetails.status = 3;
						var tennantID = "98b6b223-6849-4c3b-8c50-1f42f26946ed";
						// Execute the PUT.
						myFactory.funcClosePoll(function(response){
							if(response.status >= 200 && response.status < 300){
								toastr.success(pollDetails.poll_title+" closed!");								
								$state.go('home', {}, { reload: true });
							} else {
								toastr.error("Unable to closed the poll. Please try again.");
							}
						}, poll_id, pollDetails, tennantID);
					} else{
						toastr.error("Unable to closed the poll. Please try again.");
					}
				}, poll_id);
				}
			});
		}
	};
});
app.directive("deletePoll", function(myFactory, $state) {
    return {
		restrict: "E",
		scope:{
			id: "="
		},
        templateUrl: "templates/delete-poll.html",
		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				var confirmDelete = confirm("Are you sure that you want to delete this poll?");
				if(confirmDelete){
					var poll_id = scope.id;
					var obj = {
						id: poll_id,
						tennantID: "98b6b223-6849-4c3b-8c50-1f42f26946ed"
					};
					// Execute the DELETE.
					myFactory.funcDeletePoll(function(response){
						if(response.status >= 200 && response.status < 300){
							toastr.success("Poll is deleted!");
							$state.go('home', {}, { reload: true });
						}
					}, poll_id, obj);
				}
			});
		}
    };
});
app.directive("copyCode", function(){
	return{
		restrict: "E",
		scope:{
			id: "=",
			name: "="
		},
		templateUrl: "templates/copy-code.html",
		link: function(scope, elem, attrs){
			scope.codeToCopy = "<iframe src='http://widget.margaret.dx.am/index.html#/firstState/"+scope.id+"' width='400' height='500' style='background-color: #FFF;font-family: Lato, sans-serif;'></iframe>"
			elem.bind('click', function(){
				toastr.success("Embeddable code for your "+scope.name+" poll has been copied to your clipboard!");
			});
		}
	}
});
app.directive("copyNewCode", function(){
	return{
		restrict: "E",
		templateUrl: "templates/copy-new-code.html",
		link: function(scope, elem, attrs){
			var embeddableCode = localStorage.getItem("embeddableCode");
			scope.embedCodeToCopy = embeddableCode;
			var poll = JSON.parse(localStorage.getItem("poll"));
			elem.bind('click', function(){
				toastr.success("Embeddable code for your "+poll.title+" poll has been copied to your clipboard!");
			});
		}
	}
});