angular.module("SocialFeeds", [])
.constant("instagramUrl", "https://api.instagram.com/v1/tags/gopro/media/recent?client_id=2aafa51114a14efda303e22ffa48c6e2&callback=JSON_CALLBACK")
.controller("InstagramCtrl", function($scope, $http, instagramUrl) {
	$scope.pics = [];
	$scope.getPics = function() {
		$http.jsonp(instagramUrl).then(function(resp) {
			$scope.pics = resp.data.data;
			console.log($scope.pics);
		});
	};
});