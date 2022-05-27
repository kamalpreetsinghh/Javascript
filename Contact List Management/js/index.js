$(function() {
    loadContactList();
    $("#submitButton").on("click", function() {
        submitForm();
        alert("Contact saved successfully");
    });

    $(".deleteContact").on("click", function() {
        deleteContact(this);
    });

    $(".contactDetails").on("click", function() {
        openContactDetails(this);
    });

    $("#createButton").on("click", function() {
        createContact(this);
    });

    $("#other").prop("disabled", true);

    $("#otherCheckbox").change(function() {
        debugger;
        if(this.checked) {
            $("#other").prop("disabled", false);
        }
        else {
            $("#other").prop("disabled", true);
        }
    });

});

class Contact {
    constructor(firstName, lastName, phoneNumber, email, description, gender, hasHobby1, hasHobby2, hasHobby3, hasHobby4, hasHobby5, age, dateOfBirth, hasOther, other){
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.description = description;
        this.gender = gender;
        this.hasHobby1 = hasHobby1;
        this.hasHobby2 = hasHobby2;
        this.hasHobby3 = hasHobby3;
        this.hasHobby4 = hasHobby4;
        this.hasHobby5 = hasHobby5;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
        this.hasOther = hasOther;
        this.other = other;
    }
}

let submitForm = function() {
    if (validateForm()) {
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let phoneNumber = $("#phoneNumber").val();
            let email = $("#email").val();
            let description = $("#description").val();
            let hasHobby1 = false;
            let hasHobby2 = false;
            let hasHobby3 = false;
            let hasHobby4 = false;
            let hasHobby5 = false;

            if ($('#hobby1').is(":checked"))
            {
                hasHobby1 = true; 
            }

            if ($('#hobby2').is(":checked"))
            {
                hasHobby2 = true;
            }

            if ($('#hobby3').is(":checked"))
            {
                hasHobby3 = true;
            }

            if ($('#hobby4').is(":checked"))
            {
                hasHobby4 = true;
            }

            if ($('#hobby5').is(":checked"))
            {
                hasHobby5 = true;
            }
            
            let age = $("#age").val();
            let dateOfBirth = $("#dateOfBirth").val();

            let contact = new Contact(firstName, lastName, phoneNumber, email, description, 
                "male", hasHobby1, hasHobby2, hasHobby3, hasHobby4, hasHobby5, age, dateOfBirth, false, null);
            let contactsList = JSON.parse(localStorage.getItem("contacts"));

            if(contactsList == null){
                contactsList = [];
            }

            contactsList.push(contact);
            localStorage.setItem("contacts", JSON.stringify(contactsList));
    }
}

let validateForm = function() {
    return true;
}

let loadContactList = function() {
    let contactList = JSON.parse(localStorage.getItem("contacts"));
    if (contactList != null) {
        $.each(contactList, function(index, value) {
            var contactDiv = `
                <h1 id="firstNameHeading"> ${value.firstName} </h1>
                <p> Email : ${(value.email === undefined) ? "NA" : value.email } </p>
                <p> Age : ${value.age} </p>
                <p> Gender: ${(value.gender)} </p>
                <p> Date of Birth : ${(value.dateOfBirth)} </p>
                <button id="${(index)}" class="btn contactDetails">View Details</button>
                <button id="${(index)}" class="btn deleteContact">Delete</button>
            `;
            $("#contactsDiv").append(contactDiv);
        });
    }
}

let deleteContact = function(buttonElement) {
    let contactIndex = $(buttonElement).attr("id");
    let contactList = JSON.parse(localStorage.getItem("contacts"));
    contactList.splice(contactIndex, 1);
    localStorage.clear()
    localStorage.setItem("contacts", JSON.stringify(contactList));
    document.location.reload(true);
}

let openContactDetails = function(buttonElement) {
    $("#contactModal").modal("toggle");
    let contactIndex = $(buttonElement).attr("id");
    let contactList = JSON.parse(localStorage.getItem("contacts"));
    if (contactList != null) {
        let contactDetails = contactList[contactIndex];
        $("#firstName").val(contactDetails.firstName).prop( "disabled", true );
        $("#lastName").val(contactDetails.lastName).prop( "disabled", true );
        $("#phoneNumber").val(contactDetails.phoneNumber).prop( "disabled", true );
        $("#email").val(contactDetails.email).prop( "disabled", true );
        $("#description").val(contactDetails.description).prop( "disabled", true );
        $("#age").val(contactDetails.age).prop( "disabled", true );
        $("#dateOfBirth").val(contactDetails.dateOfBirth).prop( "disabled", true );
    }
    
}

let createContact = function() {
    $("#contactModal").modal("show");
    $("#firstName").val("").prop( "disabled", false );
    $("#lastName").val("").prop( "disabled", false );
    $("#phoneNumber").val("").prop( "disabled", false );
    $("#email").val("").prop( "disabled", false );
    $("#description").val("").prop( "disabled", false );
    $("#age").val("").prop( "disabled", false );
    $("#dateOfBirth").val("").prop( "disabled", false );
}