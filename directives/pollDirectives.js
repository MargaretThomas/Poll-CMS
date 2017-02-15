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
			console.log(scope.total_votes);
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
				console.log(scope.id);
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
						var obj = {
							id: poll_id,
							polls: JSON.stringify(pollDetails),
							tennantID: "98b6b223-6849-4c3b-8c50-1f42f26946ed"
						};
						// Execute the PUT.
						myFactory.funcClosePoll(function(response){
							if(response.status >= 200 && response.status < 300){
								toastr.success(pollDetails.poll_title+" closed!");
							}
						}, poll_id, obj);
					} else{
						toastr.error("Unable to closed the poll. Please try again.");
					}
				}, poll_id);
				}else{
					console.log("no");
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
					console.log(poll_id);
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