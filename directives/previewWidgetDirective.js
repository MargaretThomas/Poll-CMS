// Creates a button for each answers of the poll.
app.directive("answers", function($state) {
    return {
		restrict: "E",
        templateUrl: "templates/btnVote.html",
		scope:{
			data: "="
		}
    };
});
// Creates a directive for the time remaining.
app.directive('timeLeft', ['$interval', 'dateFilter', '$state', function($interval, dateFilter, $state) {
  return {
	restrict: "E",
	link: function (scope, elem, attrs) {
		var format = "dd/MM/yyyy h:mm:ss a";
		var timeoutId;
		
		var endDate = new Date(localStorage.getItem("ending"));
		function updateTime() {
			var currentDate = new Date();
			var extraHours = Math.abs(currentDate.getTimezoneOffset()/60);
			currentDate.setHours(currentDate.getHours() + extraHours);
			// Calculate the difference in milliseconds
			var difference_ms = endDate.getTime() - currentDate.getTime();
			if(difference_ms > 1){
				//take out milliseconds
				difference_ms = difference_ms/1000;
				var seconds = Math.floor(difference_ms % 60);
				difference_ms = difference_ms/60; 
				var minutes = Math.floor(difference_ms % 60);
				difference_ms = difference_ms/60; 
				var hours = Math.floor(difference_ms % 24);  
				var days = Math.floor(difference_ms/24);
				elem.text(days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds');
			}
		}
	
		elem.on('$destroy', function() {
			$interval.cancel(timeoutId);
		});
	
		// start the UI update process; save the timeoutId for canceling
		timeoutId = $interval(function() {
			updateTime(); // update DOM
		}, 1000);
	}
  };
}]);