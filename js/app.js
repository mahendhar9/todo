var todoApp = angular.module('todoApp', ['ngStorage','ui.sortable']);

todoApp.controller('todoController', ['$scope', '$localStorage', function($scope, $localStorage){

  $scope.tasks = [];
  $scope.data = $localStorage.tasksList;


  $scope.addTodo = function() {
    var newTodo = {
      done: false,
      text: $scope.newTodoText
    };
    $scope.data.push(newTodo);
    // $localStorage.tasksList = $scope.tasks;
    $scope.newTodoText = '';
  };

  $scope.deleteTask = function(start) {
    $scope.data.splice(start, 1);
  };

  $scope.sortableOptions= {
    handle: '.handle'
  };

  // $scope.$watch("data", function(newVal, oldVal){
  //   if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
  //     $scope.data.push(angular.toJson(newVal));
  //   }
  // });

}]);


