$(document).ready(function(){
    // Initialize Accordion for Task Categories
    $("#task-accordion").accordion({
        collapsible:true,
        heightStyle: "content"
    });

    // Initialize Datepicker for Due Date
    $("#date-input").datepicker();

    $("#task-form").submit(function(event){
        event.preventDefault();

        // Get task and date input values
        let taskText = $("#task-input").val();
        let dueDate = $("#date-input").val();

        if (taskText){
            // Create new task item with due date
            let newTask = $("<li>" + taskText + " - " + dueDate + "</li>")

            // Append to the appropriate task list
            if (taskText.toLowerCase().includes("work")){
                $("#work-list").append(newTask);
            } 
            else if (taskText.toLowerCase().includes("travel")){
                $("#travel-list").append(newTask);
            }
            else{
                $("#personal-list").append(newTask);
            }


            // Clear input fields
            $("#task-input").val("");
            $("#date-input").val("");
        }
    });

    // Make task lists sortable
    $(".task-list").sortable({
        connectWith: ".task-list"
    }).disableSelection();

    // Mark task as completed
    $(document).on("click", ".task-list li", function(){
        $(this).toggleClass("completed")
    })
});