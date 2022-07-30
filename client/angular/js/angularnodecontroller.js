'use strict';
var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

function DataViewer($scope, $http, $templateCache) {


  // var method = 'POST';
  // var inserturl = 'http://localhost:1212/insertmolecule';
  // $scope.codeStatus = "";
  // $scope.save = function() {
  //   var formData = {
  //     'username': this.username,
  //     'password': this.password,
  //     'email': this.email
  //   };
  //   this.username = '';
  //   this.password = '';
  //   this.email = '';
  //
  //
  //   var jdata = 'mydata=' + JSON.stringify(formData);
  //
  //   $http({
  //     method: method,
  //     url: inserturl,
  //     data: jdata,
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     cache: $templateCache
  //   }).
  //   success(function(response) {
  //     console.log("success");
  //     $scope.codeStatus = response.data;
  //     console.log($scope.codeStatus);
  //
  //   }).
  //   error(function(response) {
  //     console.log("error");
  //     $scope.codeStatus = response || "Request failed";
  //     console.log($scope.codeStatus);
  //   });
  //    $scope.list();
  // $scope.showContent();
  // //   return false;
  // // };
  // //

  $scope.list = function() {
    var url = 'http://localhost:1212/getcontent';
    $http.get(url).success(function(data) {
      $scope.users = data;
    });
  };

  $scope.showContent = function(dataid) {
    var url = 'http://localhost:1212/getcontent';
    $http.get(url).success(function(data) {
    let contentId = data.find(x => x.ID === dataid);
    $scope.message = JSON.stringify(contentId.structure);
    });
  };



  $scope.list();
}
