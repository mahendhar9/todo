var todoApp = angular.module('todoApp',['firebase', 'ngRoute', 'ui.sortable']);

todoApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'todoController'
  })

  .when('/register', {
    templateUrl: 'pages/register.html',
    controller: 'registerController'
  })
  
  .when('/login', {
    templateUrl: 'pages/login.html',
    controller: 'loginController'
  })
});

todoApp.service('firebaseService', function() {
  this.fireData = new Firebase('https://dazzling-torch-2041.firebaseio.com');

});


todoApp.controller('todoController', ['$scope', '$firebaseArray', 'firebaseService', function($scope, $firebaseArray, firebaseService){
  var datafire = firebaseService.fireData;
  $scope.tasks = $firebaseArray(datafire);

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

//Register Controller
todoApp.controller('registerController', ['$scope', 'firebaseService', function($scope, firebaseService){
  var userData = firebaseService.fireData;
  $scope.registerUser = function() {
    userData.createUser({
      email    : $scope.email,
      password : $scope.password
    }, function(error, userData) {
      if (error) {
        $scope.message = "" + error;
      } else {
        $scope.message = "You have successfully Signed Up!";      
      }
    });
    $scope.email = '';
    $scope.password = '';
  };
}]);

todoApp.controller('loginController', ['$scope', 'firebaseService', function($scope, firebaseService) {
  var loginData = firebaseService.fireData;
  $scope.loginUser = function() {
    loginData.authWithPassword({
      email    : $scope.loginEmail,
      password : $scope.loginPassword
      }, function(error, authData) {
      if (error) {
        $scope.loginMessage = error;
      } else {
        $scope.loginMessage = "You are successfully logged in";
      }
    });
   $scope.loginEmail = '';
   $scope.loginPassword = '';
  }
}]);



