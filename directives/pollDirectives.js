// Creates a fieldset for each poll.
app.directive("singlePoll", function() {
    return {
		restrict: "E",
		scope:{
			poll: "=" // Single Poll info.
		},
        templateUrl: "templates/poll-template.html"
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
				//$state.go("results");
				console.log(scope.id);
			});
		}
    };
});