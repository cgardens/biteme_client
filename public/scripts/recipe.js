angular.module('recipe.controllers', [])

  .controller('RecipeCtrl', function($scope, $http, $stateParams, $interval, $timeout) {
    // get request
    $http.get('http://localhost:3000/recipes/' + $stateParams.recipeId)
    .success(function(data) { $scope.recipe = data; })
    .error(function(data) { console.log('Error: ' + data); })

    // $scope.ingredients = $scope.formatIngredients();

    // $scope.formatIngredients = function() {
    //   var formattedIngredients = [];
    //   var ingredients = $scope.recipe.ingredientsVerbose;
    //   for (i = 0; i < ingredients.length; i++) {
    //     var quantity = Ratio.parse(ingredients[i].Quantity).simplify().toLocaleString().trim();
    //     var unitType = ingredients[i].Unit || '';
    //     var name = ingredients[i].Name.toLowerCase().trim();
    //     formattedIngredients.push(quantity + ' ' + unitType.trim() + ' ' + name);
    //   }
    //   return formattedIngredients;
    // };

    // start/stop functions
    $scope.inProgress = false;

    $scope.startCaesar = function() {
      $scope.inProgress = true;
      $scope.activateCaesar('caesar here, at your service.');
      $timeout( function(){ $scope.activateCaesar("let's begin."); }, 2800);
      $timeout( function(){ $scope.activateCaesar('your first step is:'); }, 4400);
      $timeout( function(){ $scope.activateCaesar($scope.findStep()); }, 6000);
      annyang.start();
    };

    $scope.stopCaesar = function() {
      $scope.inProgress = false;
      $scope.activateCaesar('');
      annyang.stop();
    };

    // recipe queries
    $scope.currentStep = 0;

    $scope.incrementStep = function() {
      $scope.currentStep++;
    };

    $scope.findStep = function() {
      return $scope.recipe.instructions[$scope.currentStep]
    };

    $scope.findIngredient = function(inputIngredient) {
      var ingredients = $scope.recipe.ingredients;
      for (var key in ingredients) {
        if (ingredients[key].toLowerCase().indexOf(inputIngredient.toLowerCase()) >= 0) {
          return ingredients[key];
          break;
        }
      }
      $scope.activateCaesar("I'm sorry. I do not see " + inputIngredient + ' in this recipe');
    };

    // caesar response functions
    $scope.caesarSpeech = '';

    $scope.activateCaesar = function(str) {
      $scope.setTextArea(str);
      $scope.$apply();
      $scope.triggerCaesar();
    };

    $scope.setTextArea = function(str) {
      $scope.caesarSpeech = str;
    };

    $scope.triggerCaesar = function() {
      $('#textToSpeech input').trigger('click');
    }; // put into angular speak

    // set timer
    $scope.setTimer = function(time) {
      $scope.seconds = time * 60;

      function runTimer() {
        if ($scope.seconds === 0) {
          $interval.cancel(startTimer)
        } else {
          $scope.seconds--
        };
      }

      startTimer = $interval(runTimer, 1000);
    };

    // caesar commands
    if (annyang) {
      var commands = {
        // basic commands
        'hey caesar': function() {
          $scope.activateCaesar('caesar here, at your service');
          // possible need to restart annyang here
        },
        'caesar': function() {
          $scope.activateCaesar('caesar here, at your service');
        },
        'thank you caesar': function() {
          $scope.activateCaesar("you're quite welcome");
        },
        'thank you': function() {
          $scope.activateCaesar("you're quite welcome");
        },
        'thanks caesar': function() {
          $scope.activateCaesar("you're quite welcome");
        },
        'thanks': function() {
          $scope.activateCaesar("you're quite welcome");
        },

        // step commands
        'caesar next step': function() {
          $scope.incrementStep();
          $scope.activateCaesar($scope.findStep());
        },
        'next step': function() {
          $scope.incrementStep();
          $scope.activateCaesar($scope.findStep());
        },
        'caesar repeat step': function() {
          $scope.activateCaesar($scope.findStep());
        },
        'repeat step': function() {
          $scope.activateCaesar($scope.findStep());
        },

        // ingredient commands
        'caesar how much *ingredient': function(ingredient) {
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },
        'how much *ingredient': function(ingredient) {
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },
        'caesar how many *ingredient': function(ingredient) {
          var length = ingredient.length - 1;
          if (ingredient[length] === 's') {
            ingredient = ingredient.substr(0, length);
            if (ingredient[length - 1] === 'e') {
              ingredient = ingredient.substr(0, length - 1);
            };
          };
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },
        'how many *ingredient': function(ingredient) {
          var length = ingredient.length - 1;
          if (ingredient[length] === 's') { ingredient = ingredient.substr(0, length) };
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },

        // timer ingredients
        'caesar set timer for *time minutes': function(minutes) {
          $scope.setTimer(minutes);
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        },
        'set timer for *time minutes': function(minutes) {
          $scope.setTimer(minutes);
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        },
        'caesar set a timer for *time minutes': function(minutes) {
          $scope.setTimer(minutes);
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        },
        'set a timer for *time minutes': function(minutes) {
          $scope.setTimer(minutes);
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        }
      };

      annyang.addCommands(commands);
    };
  })