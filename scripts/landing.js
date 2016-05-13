// Update the styles set in the CSS file to the new styles in the script.
  var animatePoints = function() {
    // gets the elements with the class name point
    var points = document.getElementsByClassName('point');
    //changes the styles in the CSS file to the styles below.
    var revealPoint = function(index) {
      points[index].style.opacity = 1;
      points[index].style.transform = 'scaleX(1) translateY(0)';
      points[index].style.msTransform = 'scaleX(1) translateY(0)';
      points[index].style.WebkitTransform = 'scaleX(1) translateY(0)';
    };
    //loops through the elements with the class name point and applies the revealPoint CSS styles
    for(var i=0; i < points.length; i++) {
      revealPoint(i);
    };
  };
