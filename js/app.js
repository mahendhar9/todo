var todoApp = angular.module('todoApp',['firebase']);

todoApp.controller('todoController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
  
  var fireData = new Firebase('https://dazzling-torch-2041.firebaseio.com');
  
  $scope.todos = $firebaseArray(fireData);

  $scope.addTodo = function() {
    var newTodo = {
      done: false,
      text: $scope.newTodoText
    };
    $scope.todos.$add(newTodo);
    $scope.newTodoText = '';
  };

  $scope.deleteTask = function(start) {
    $scope.todos.$remove(start);
  };

  // $scope.move = function(index, direction) {
  //   if (direction == 'up') {
  //     if (index == 0) {
  //       return;
  //     }
  //     index = index - 1;
  //   }
  //   var moveItem = $scope.todos[index];
  //   $scope.todos.splice(index + 2, 0, moveItem);
  //   $scope.todos.splice(index, 1);
  // };

}]);


