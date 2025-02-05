$(document).ready(function(){
    // Initialize Add Task Button
    $("#add-task-btn").button().click(function(){
        $("#add-task-dialog").dialog("open");
    });

    // Initialize Dialog
    $("#add-task-dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Add Task": addTask,
            "Cancel": function() { $(this).dialog("close");}
        }
    });

    // Initialize Date Picker
    $("#task-date").datepicker();

    // Initialize Slider
    $("#task-priority").slider({
        min: 1,
        max: 5,
        value: 3,
        slide: function(event, ui) {
            $("#task-priority-label").text("Priority: " + ui.value);
        }
    });

    // Function to Add Task
    function addTask(){
        let taskName = $("#task-name").val();
        let taskDate = $("#task-date").val();
        let taskPriority = $("#task-priority").slider("value");

        if (taskName){
            let taskItem = $("<div class='task-item'></div>").text(taskName);
            taskItem.append("<br>Due Date: " + taskDate);
            taskItem.append("<br>Priority: " + taskPriority);
            
            // Add Progress bar for task completion
            let progressBar = $("<div class='task-progress'></div>");
            progressBar.progressbar({value:0});
            taskItem.append(progressBar);

            // Add to task list and make draggable
            $("#task-list").append(taskItem);
            taskItem.draggable({containment: "#completed-task"});

            $("#add-task-dialog").dialog("close");
            $("#task-form")[0].reset();
        }
    } 

    // Droppable Area for completed tasks
    $("#completed-tasks").droppable({
        accept: ".task-item",
        drop: function(event, ui){
            ui.draggable.addClass("completed").detach().appendTo($(this));
        }
    });

    // Make task list sortable
    $("#task-list").sortable();
})