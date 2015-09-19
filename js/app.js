var todoApp = angular.module('todoApp',[]);

todoApp.controller('todoController', ['$scope', function($scope){
  $scope.todos = [
  {done: false, text: "First Todo"},
  {done: false, text: "Second Todo"}
  ];

  $scope.addTodo = function() {
    var newTodo = {
      done: false,
      text: $scope.newTodoText
    };
    $scope.todos.push(newTodo);
    $scope.newTodoText = '';
  };

  $scope.deleteTask = function(start) {
    $scope.todos.splice(start, 1);
  };

  $scope.moveDown = function(index) {
    var downItem = $scope.todos[index];
    $scope.todos.splice(index + 2, 0, downItem);
    $scope.todos.splice(index, 1);
  };

}]);