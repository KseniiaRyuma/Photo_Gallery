(function() {

  var client_key = '2777084-eed67528548c3b639943c2a54';
  angular.module('galleryfeed', []);

  angular.module('galleryfeed')
    .factory('GalleryAPI', ['$http', function($http) {
      return {
        fetchPhotos : function(tagName, callback) {
          tagName = tagName || "friends";
          var endpoint = 'https://pixabay.com/api/?key=' + client_key + '&q=' + tagName + '&image_type=photo';
          $http({
            method: 'GET',
            url: endpoint
          }).then(function successCallback(response) {
              callback(response)
            }, function errorCallback(response) {
              console.error('Error fetching feed:');
            });
        }
      }
  }]);

  angular.module('galleryfeed').controller('ShowImages', function($scope, GalleryAPI) {
    $scope.layout = 'grid';
    $scope.data = {};
    $scope.pics = [];
    $scope.fetchPhotos = function (tagName) {
      console.log('I am in' + tagName);
      GalleryAPI.fetchPhotos(tagName, function(response) {
        $scope.pics = response.data.hits;
      });
    };
    $scope.fetchPhotos();
  });
})();

