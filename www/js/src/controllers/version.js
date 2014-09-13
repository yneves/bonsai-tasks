/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.controller("VersionController",function($scope,Lang,Data) {
  $scope.versions = Data.getVersions();
  $scope.selected = Data.getSelected();
  $scope.addVersion = function() {
    Data.addVersion($scope.versionNumber);
    $scope.versionNumber = "";
  };
  $scope.selectVersion = function(versionId) {
    Data.selectVersion(versionId);
  };
  $scope.doneVersion = function(checked) {
    Data.doneVersion(checked);
  };
  $scope.deleteVersion = function(versionId) {
    Data.deleteVersion(versionId);
  };
});

// - -------------------------------------------------------------------- - //
