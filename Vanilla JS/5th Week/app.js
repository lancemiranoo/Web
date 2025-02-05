$(document).ready(function(){
    // When a question is clicked, toggle the answer
    $(".faq-item h3").click(function(){
        // $(this).next(".answer").slideToggle(400, "easeOutBounce");
        $(this).next(".answer").slideToggle(400);
    });

    // Toggle the visibility of images in the gallery
    $("#toggleGallery").click(function(){
        $(".image-gallery img").fadeToggle(500);
    });

    // Expand/contract menu using custom animations
    $("#expandMenu").click(function(){
        $(".menu-content").animate(
            {
                height: "toggle",
                opacity: "toggle",
            },
            600
        );
    });
});
