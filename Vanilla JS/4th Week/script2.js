$ (document).ready(function(){
    $(".question").click(function(){
        $(this).next(".answer").slideToggle(); // Show or hide the answer
    });
});