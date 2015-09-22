var todoApp = angular.module('todoApp',['firebase', 'ui.sortable']);

todoApp.controller('todoController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){

  var fireData = new Firebase('https://dazzling-torch-2041.firebaseio.com');
  
  $scope.tasks = $firebaseArray(fireData);

  $scope.addTask = function() {
    var length = $scope.tasks.length;
    console.log(length+1);
    var newTodo = {
      position: length+1,
      done: false,
      text: $scope.newTodoText
    };
    
    $scope.tasks.$add(newTodo);
    $scope.newTodoText = '';
  };

  $scope.deleteTask = function(start) {
    $scope.tasks.$remove(start);
  };

  $scope.sortableOptions = {
    handle: '.handle',
    stop: function( event, ui ) {
      var uiArray = [];
      for (var j = 0; j < $scope.tasks.length; j++) {
        uiArray.push($scope.tasks[j].text);
      }
      console.log(uiArray);
      console.log($scope.tasks);
      for (var i = 0; i < $scope.tasks.length; i++) {
        $scope.tasks[i].position = uiArray.indexOf($scope.tasks[i].text) + 1;
        $scope.tasks.$save(i);
      }
      $scope.$apply();
    }
  }

  $scope.updateDone = function(index) {
    console.log(index);
    $scope.tasks.$save(index);
  };
}]);



