'use strict';



var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

function DataViewer($scope, $http, $templateCache) {

  $scope.list = function() {
    var url = 'http://ec2-34-207-181-245.compute-1.amazonaws.com:1212/getcontent';
    $http.get(url).success(function(data) {
      $scope.molecules = data;
    });
  };

  $scope.showContent = function(dataid) {
    var url = 'http://ec2-34-207-181-245.compute-1.amazonaws.com:1212/getcontent';
    $http.get(url).success(function(data) {
      let contentId = data.find(x => x.ID === dataid);
      $scope.molname = contentId.name;
      chemViewer.setDimension('500px', '400px');
      chemViewer.setRenderType(Kekule.Render.RendererType.R3D);
      chemViewer.setMoleculeDisplayType(Kekule.Render.Molecule3DDisplayType.STICKS);
      chemViewer.setBackgroundColor('transparent');
      Kekule.IO.loadResourceData(contentId.structure, function(mol, success) {
        if (success) {
          chemViewer.setChemObj(mol);
        } else {
          console.log('Loading failed');
        }
      });

    });
  };


  // var method = 'POST';
  // var inserturl = 'http://ec2-34-207-181-245.compute-1.amazonaws.com:1212/insertmolecule';
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


  var chemViewer = new Kekule.ChemWidget.Viewer(document);
  chemViewer.appendToElem(document.getElementById('chemViewer1'));

  $scope.showContent("519320aeb61f7af7b4fa57fe");
  $scope.list();
}
