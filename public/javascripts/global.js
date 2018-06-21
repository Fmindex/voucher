// Userlist data array for filling in info box
var voucherListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#voucherList table tbody').on('click', 'td a.linkshowuser', showVoucherInfo);

    // Add User button click
    $('#btnAddVoucher').on('click', addVoucher);
    $('#btnEditVoucher').on('click', editVoucher);
    $('#btnBuyVoucher').on('click', buyVoucher);
    $('#btnUseVoucher').on('click',useVoucher);
    // Delete User link click
    $('#voucherList table tbody').on('click', 'td a.linkdeleteuser', deleteVoucher);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/voucher/voucherList/', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        voucherListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.name + '" myid="' + this._id + '" myimg="' + this.img + '" myclick="' + this.click + '" myclick2="' + this.click2 + '" title="Show Details">' + this.name + '</a></td>';
            tableContent += '<td>' + this.last_update + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#voucherList table tbody').html(tableContent);
    });
};

// Show User Info
var thisVoucherName, thisVoucherId, thisVoucherImg, thisVoucherClick;
function showVoucherInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    thisVoucherName = $(this).attr('rel');
    thisVoucherId = $(this).attr('myid');
    thisVoucherImg = $(this).attr('myimg');
    thisVoucherClick = $(this).attr('myclick');
    thisVoucherClick2 = $(this).attr('myclick2');
    console.log(thisVoucherId);
    // Get Index of object based on id value
    var arrayPosition = voucherListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisVoucherName);

    // Get our User Object
    var thisVoucherObject = voucherListData[arrayPosition];

    //Populate Info Box
    $('#voucherInfoName').text(thisVoucherObject.name);

};

// Add Voucher
function addVoucher(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addVoucher input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newVoucher = {
            'name': $('#addVoucher fieldset input#inputVoucherName').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newVoucher,
            url: '/voucher/addVoucher/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addVoucher fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Buy Vouchuyer
function buyVoucher(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#buyVoucher input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newVoucher = {
            'name': $('#buyVoucher fieldset input#inputVoucherName').val(),
            'value': $('#buyVoucher fieldset input#inputVoucherValue').val(),
            'count': $('#buyVoucher fieldset input#inputVoucherCount').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newVoucher,
            url: '/voucher/buyVoucher/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#buyVoucher fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteVoucher(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
        
        $.ajax({
            type: 'DELETE',
            url: '/voucher/deleteVoucher/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

// Use User
function useVoucher(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
       
            var delName =  $('#useVoucher fieldset input#inputVoucherName').val();
            var delValue = $('#useVoucher fieldset input#inputVoucherValue').val();
        
        $.ajax({
            type: 'DELETE',
            url: '/voucher/useVoucher/' + delName +'/' + delValue
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            $('#useVoucher fieldset input').val('');
            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

//Edit Voucher
function editVoucher(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#editVoucher input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newVoucher = {
            'name': $('#editVoucher fieldset2 input#inputName').val(),
        }
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: newVoucher,
            url: '/voucher/editvoucher/' + thisVoucherId,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            

                // Clear the form inputs
                $('#editVoucher fieldset2 input#inputName').val('');
                $('#voucherInfoName').text(newVoucher.name);

                // Update the table
                populateTable();
            
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};