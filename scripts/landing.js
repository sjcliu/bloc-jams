// Update the styles set in the CSS file to the new styles in the script.
  var animatePoints = function() {
    // gets the elements with the class name point
    var points = document.getElementsByClassName('point');
    //changes the styles in the CSS file to the styles below.
    var revealFirstPoint = function() {
      points[0].style.opacity = 1;
      points[0].style.transform = 'scaleX(1) translateY(0)';
      points[0].style.msTransform = 'scaleX(1) translateY(0)';
      points[0].style.WebkitTransform = 'scaleX(1) translateY(0)';
    };

    var revealSecondPoint = function() {
      points[1].style.opacity = 1;
      points[1].style.transform = 'scaleX(1) translateY(0)';
      points[1].style.msTransform = 'scaleX(1) translateY(0)';
      points[1].style.WebkitTransform = 'scaleX(1) translateY(0)';
    };

    var revealThirdPoint = function() {
      points[2].style.opacity = 1;
      points[2].style.transform = 'scaleX(1) translateY(0)';
      points[2].style.msTransform = 'scaleX(1) translateY(0)';
      points[2].style.WebkitTransform = 'scaleX(1) translateY(0)';
    };

    revealFirstPoint();
    revealSecondPoint();
    revealThirdPoint();
  };
