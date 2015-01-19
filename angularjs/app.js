angular.module("SocialFeeds", [])
.constant("instagramUrl", "https://api.instagram.com/v1/tags/paleo/media/recent" +
	"?count=30&client_id=2aafa51114a14efda303e22ffa48c6e2&callback=JSON_CALLBACK")
.controller("InstagramCtrl", function($scope, $http, instagramUrl, $interval) {
	var max_tag_id = 0;

	var compare = function() {
		if ($scope.pics.length == 0) {
			$scope.pics = $scope.new_pics;
			return;
		}
		for (var i = 0; i < 30; i++) {
			if ($scope.new_pics[i].id == $scope.pics[0].id) {
				$scope.new_pics = $scope.new_pics.slice(0, i);
				$scope.new_count = i;
				return;
			}
		}	
	}

	var getPics = function() {
		$http.jsonp(instagramUrl).then(function(resp) {
			$scope.new_pics = resp.data.data;
			max_tag_id = max_tag_id || resp.data.pagination.next_max_tag_id;
			compare();
		});
	};

	$scope.pics = [];

	$scope.loadedAllPosts = false;

	$scope.loadNewPosts = function() {
		$scope.pics = $scope.new_pics.concat($scope.pics);
		$scope.new_count = 0;
	};

	$scope.loadOldPosts = function() {
		$http.jsonp(instagramUrl + "&max_tag_id=" + max_tag_id).then(function(resp) {
			var old_pics = resp.data.data;
			max_tag_id = resp.data.pagination.next_max_tag_id;
			$scope.pics = $scope.pics.concat(old_pics);
			if (max_tag_id == undefined) {
				$scope.loadedAllPosts = true;
			}
		});
	};

	getPics();
	$interval(getPics, 10000);
});