  // Update the styles set in the CSS file to the new styles in the script.
  var animatePoints = function() {

    //changes the styles in the CSS file to the styles below.
    var revealPoint = function() {
      $(this).css({
        opacity: 1,
        transform: 'scaleX(1) translateY(0)'
      });
    };
    //loops through the elements with the class name point and applies the revealPoint CSS styles
    $.each($('.point'), revealPoint);
    };

  $(window).load(function() {
    // Automatically animate the points on a tall screen where scrolling can't trigger the animation
   if ($(window).height() > 950) {
       animatePoints();
   }

   var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  $(window).scroll(function(event) {
       if ($(window).scrollTop() >= scrollDistance) {
           animatePoints();
       }
     });
   });
