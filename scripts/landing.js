  //Selects the element with class name point
  var pointsArray = document.getElementsByClassName('point');
  //changes the styles in the CSS file to the styles below.
  var revealPoint = function(point) {
    point.style.opacity = 1;
    point.style.transform = 'scaleX(1) translateY(0)';
    point.style.msTransform = 'scaleX(1) translateY(0)';
    point.style.WebkitTransform = 'scaleX(1) translateY(0)';
  };
  //Animates the point element
  var animatePoints = function(points){
    //loops through the elements with the class name point and applies the revealPoint CSS styles
    forEach(points, revealPoint);
  };
  // When the page loads and user scroll to the seliingPoints, animatePoints is executed
  window.onload = function() {
    //Automatically animate the points on a tall screen where scrolling can't trigger the animation.
    if (window.innerHeight > 950) {
      animatePoints(pointsArray);
    };

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener("scroll", function(event) {
      if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
        animatePoints(pointsArray);
      }
    });
  };
