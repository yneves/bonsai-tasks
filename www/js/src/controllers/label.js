/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.controller("LabelController",function($scope,Lang,Data) {
  $scope.labels = Data.getLabels();
  $scope.selected = Data.selected();
  $scope.addLabel = function() {
    Data.addLabel($scope.labelName);
    $scope.labelName = "";
  };
  $scope.selectLabel = function(labelId) {
    Data.selectLabel(labelId);
  };
  $scope.doneLabel = function(checked) {
    Data.doneLabel(checked);
  };
  $scope.deleteLabel = function(labelId) {
    Data.deleteLabel(labelId);
  };
});

// - -------------------------------------------------------------------- - //
