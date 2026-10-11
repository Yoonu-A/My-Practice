$(document).ready(function() {
    // add to list of working tasks
    $("#addTaskButton").click(function() {
        var task = $('#taskInput').val();
        if (task) {
            $('#taskList').append('<li>' + task + ' <button class="deleteTask">Delete</button></li>');
            $('#taskInput').val('');
        }

    })



 // delete task from list
    $(document).on('click', '.deleteTask', function() {
        $(this).parent().remove();
    });
});
   