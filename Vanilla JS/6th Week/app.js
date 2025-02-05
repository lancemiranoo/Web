// ---------------------------------------------------------
// jQuery ready() Method
//   Ensures Fully Loaded DOM (document object model)
//   before calling functions for the different sections
// ---------------------------------------------------------
$(document).ready(function(){
  toggleMenu();
  animateHome();
  toggleGallery();
  toggleFAQ();
});

// ---------------------------------------------------------
// Function Name: toggleMenu
//   Handles the features for the Navigation Menu.
//   1. Show/hide (toggle) animation
//   2. Smooth scroll animation with swing easing effect
// ---------------------------------------------------------
function toggleMenu() {
  // Show/hide animation for the navigation menu
  $("#expandMenu").click(function(){
    $('.menuContent').toggle(500);
  });

  // Smooth scroll functionality for navigation menu sections
  $('#navigationMenu a').click(function(event) {
    // Prevent default anchor behavior
    event.preventDefault();

    // Get the target section ID
    const target = $(this).attr('href');

    // Get the vertical position of the target
    const offsetTop = $(target).offset().top; 

    // Smoothly animate the scroll to the target section
    $('html, body').animate(
      { scrollTop: offsetTop },
      1000,
      'swing' // Easing effects for swing
    ); 
  });
}

// ---------------------------------------------------------
// Function Name: animateHome
//   Handles the features for the Home Section.
//   1. Custom animation that resizes the heading element
//   2. Applies stop() method when mouse enters the element
// ---------------------------------------------------------
function animateHome() {
  // Custom animation for resizing heading element on loop
  animateHeading();
  function animateHeading() {
    $('.bannerHead')
        // Decrease size
        .animate({ fontSize: '3.5em' }, 2000)
        // Increase size and loop animateHeading
        .animate({ fontSize: '5em' }, 2000, animateHeading);
  }
  
  // Stop animation when mouse enters the heading element
  $('.bannerHead').mouseenter(function() {
    $(this).stop(); // Stop animation
  });
}

// ---------------------------------------------------------
// Function Name: toggleGallery
//   Handles the features for the Product Gallery Section.
//   1. Toggles visibility of products based on category
//   2. Shows description by fade-in effect on hover
// ---------------------------------------------------------
function toggleGallery() {
  // Toggle visibility for filtering products based on category
  $(".filterBtn").click(function() {
    // Get the target data to filter
    const filter = $(this).attr("data-filter");

    if (filter === "all") {
      // Show all products
      $(".productItem").show();
    } else {
      // Hide all products and show only the filtered ones
      $(".productItem").hide();
      $("." + filter).show();
    }
  });

  // Show brief description by Fade-in effect when hovered
  $('.productItem').hover(
    function() {
      $(this).find('.description').fadeIn(200);
      $(this).find('.description').css("display", "flex");
      $(this).find('img').fadeOut(200);
      $(this).find('.productName').fadeOut(200);
      $(this).find('.productPrice').fadeOut(200);
    },
    function() {
      $(this).find('.description').fadeOut(200);
      $(this).find('img').fadeIn(200);
      $(this).find('.productName').fadeIn(200);
      $(this).find('.productPrice').fadeIn(200);
    }
  );
}

// ---------------------------------------------------------
// Function Name: toggleFAQ
//   Handles the features for the FAQ Section Section.
//   1. Slides down/up when question is clicked
// ---------------------------------------------------------
function toggleFAQ() {
  // Slide down/up answers when a question is clicked
  $(".faqItem h3").click(function(){
    $(this).next(".answer").slideToggle(400);
  });
}
