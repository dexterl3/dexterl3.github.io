var app = angular.module('app', []);

app
	.factory('score',function(randomScore){
		var points = randomScore();
		return {
			increment: function(){
				return points++;
			},
			getPoints: function(){
				return points;
			}
	};
});

app.value('randomScore', function() {
     return Math.ceil(Math.random() * 10);
  });


/*

app.factory('score',function(randomScore){
     return  {points: randomScore()};
});

*/
/*
app.config(['$controllerProvider',function($controllerProvider){
	$controllerProvider.allowGlobals();
}]);
*/
app
.config(function($provide){
	$provide.decorator('score',function($delegate){
		$delegate.points =100000;
			return $delegate;
	});
});

app.controller('MessageController', function($scope,score,randomScore){
	$scope.message ="This is a model.";
	$scope.score = score;
	$scope.increment = function(){
		$scope.score.increment();
	}
});