var recipe = { id: 1, ingredients: [{ amt: '1', name: 'egg' }, { amt: '1 1/4 cups', name: 'vegetable oil' }, { amt: '2 cups', name: 'white sugar' }, { amt: '2 teaspoons', name: 'vanilla extract' }, { amt: '2 cups', name: 'all-purpose flour' }, { amt: '2 teaspoons', name: 'baking soda' }, { amt: '2 teaspoons', name: 'baking powder' }, { amt: '1/2 teaspoon', name: 'salt' }, { amt: '2 teaspoons', name: 'ground cinnamon' }, { amt: '3 cups', name: 'grated carrots' }, { amt: '1 cup', name: 'chopped pecans' }, { amt: '1/2 cup', name: 'butter, softened' }, { amt: '8 ounces', name: 'cream cheese, softened'}, { amt: '4 cups', name: "confectioners' sugar" }], directions: ['Preheat oven to 350 degrees F (175 degrees C).', 'Grease and flour a 9x13 inch pan.', 'In a large bowl, beat together eggs, oil, white sugar and 2 teaspoons vanilla.', 'Mix in flour, baking soda, baking powder, salt and cinnamon.', 'Stir in carrots.', 'Fold in pecans.', 'Pour into prepared pan.', 'Bake in the preheated oven for 40 to 50 minutes, or until a toothpick inserted into the center of the cake comes out clean.', 'Let cool in pan for 10 minutes, then turn out onto a wire rack and cool completely.', "To Make Frosting: In a medium bowl, combine butter, cream cheese, confectioners' sugar and 1 teaspoon vanilla.", 'Beat until the mixture is smooth and creamy.', 'Stir in chopped pecans.', 'Frost the cooled cake.'] };

var currentStep = 0;

var incrementStep = function() {
  currentStep++;
};

var findStep = function() {
  return recipe.directions[currentStep];
};

var findIngredient = function(inputIngredient) {
  console.log(inputIngredient)
  var ingredients = recipe.ingredients;
  for (var i = 0; i < ingredients.length; i++) {
    if (ingredients[i].name.toLowerCase().indexOf(inputIngredient.toLowerCase()) >= 0) {
      return ingredients[i].amt + ' ' + ingredients[i].name;
      break;
    }
  }
};

var activateCaesar = function(str) {
  setTextArea(str);
  triggerCaesar();
};

var setTextArea = function(str) {
  $('#textToSpeech p').text(str);
  $('#textToSpeech textarea').text(str);
};

var triggerCaesar = function() {
  $('#textToSpeech input').trigger('click');
};

var startCaesar = function() {
  activateCaesar("caesar here, at your service. let's begin. your first step is: " + findStep());
};

if (annyang) {
  var commands = {
    // basic commands
    'hey caesar': function() {
      activateCaesar('caesar here, at your service');
      // possible need to restart annyang here
    },
    'caesar': function() {
      activateCaesar('caesar here, at your service');
    },
    'thank you caesar': function() {
      activateCaesar("you're quite welcome");
    },
    'thank you': function() {
      activateCaesar("you're quite welcome");
    },
    'thanks caesar': function() {
      activateCaesar("you're quite welcome");
    },
    'thanks': function() {
      activateCaesar("you're quite welcome");
    },

    // step commands
    'caesar next step': function() {
      incrementStep();
      activateCaesar(findStep());
    },
    'next step': function() {
      incrementStep();
      activateCaesar(findStep());
    },
    'caesar repeat step': function() {
      activateCaesar(findStep());
    },
    'repeat step': function() {
      activateCaesar(findStep());
    },

    // ingredient commands
    'caesar how much *ingredient': function(ingredient) {
      activateCaesar(findIngredient(ingredient));
    },
    'how much *ingredient': function(ingredient) {
      activateCaesar(findIngredient(ingredient));
    },
    'caesar how many *ingredient': function(ingredient) {
      var length = ingredient.length - 1;
      if (ingredient[length] === 's') { ingredient = ingredient.substr(0, length) };
      activateCaesar(findIngredient(ingredient));
    },
    'how many *ingredient': function(ingredient) {
      var length = ingredient.length - 1;
      if (ingredient[length] === 's') { ingredient = ingredient.substr(0, length) };
      activateCaesar(findIngredient(ingredient));
    },

    // timer ingredients
    'caesar set timer for *time minutes': function(minutes) {
      activateCaesar('I have set the timer for ' + minutes + ' minutes');
    },
    'set timer for *time minutes': function(minutes) {
      activateCaesar('I have set the timer for ' + minutes + ' minutes');
    },
    'caesar set a timer for *time minutes': function(minutes) {
      activateCaesar('I have set the timer for ' + minutes + ' minutes');
    },
    'set a timer for *time minutes': function(minutes) {
      activateCaesar('I have set the timer for ' + minutes + ' minutes');
    }
  };

  annyang.addCommands(commands);
  annyang.debug();
  annyang.start();
};