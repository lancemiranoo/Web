$(document).ready(function(){
    //  Initialize Add Contact button as jQuery UI button
    $("#add-contact").button().click(function(){
        $("#contact-dialog").dialog("open");
    });

    //  Initialize dialog for adding contacts
    $("#contact-dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Add Contact": function() {
                const name = $("#name").val();
                const email = $("#email").val();
                const phone = $("#phone").val();

                //  Create a new contact element

                const ContactItem = `<div class="contact-item ui-widget-content ui-corner-all">
                <p><strong>${name}</strong><br>Email: ${email}<br>Phone: ${phone}</p>
                </div>`;
                $("#contact-list").append(ContactItem);
                
                $(this).dialog("close");
            },
            Cancel: function(){
                $(this).dialog("close");
            }
        }
    });

    //  Make contact items draggable and sortable
    $(".contact-item").draggable();
    $("#contact-list").sortable();
});
    