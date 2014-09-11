/*!
**  bonsai-tasks -- Just another TODO application with AngularJS.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/bonsai-tasks>
*/
// - -------------------------------------------------------------------- - //

app.controller("TaskController",function($scope,Lang,Data) {
  $scope.tasks = Data.getTasks();
  $scope.selected = Data.selected();
  $scope.addTask = function() {
    Data.addTask($scope.taskText);
    $scope.taskText = "";
  };
  $scope.selectTask = function(taskId) {
    Data.selectTask(taskId);
  };
  $scope.doneTask = function(checked) {
    Data.doneTask(checked);
  };
  $scope.deleteTask = function(taskId) {
    Data.deleteTask(taskId);
  };
});

// - -------------------------------------------------------------------- - //
