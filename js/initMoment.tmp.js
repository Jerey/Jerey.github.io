
$(document).ready(function() {
    var time = moment().tz("Europe/Vienna").format("HH:mm");
    $("#time").html(time);
})
