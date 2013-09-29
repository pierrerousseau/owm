function alertUser(msg) {
    var userAlert = $("<div class='alert' />");
    userAlert.append("<button type='button'" +
                     " class='close'" +
                     " data-dismiss='alert'> &times; </button>");
    userAlert.append(msg);
    $(".alerts").append(userAlert);
    userAlert.alert()
}
