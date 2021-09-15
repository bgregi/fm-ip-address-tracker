var ip = "8.8.8.8";
var api_key = "at_rYoNfJQaPsngkRDwrhwT6RhscJWkU";
$(function () {
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: { apiKey: api_key, ipAddress: ip },
        success: function (data) {
            $("body").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");
        }
    });
});

$("body").css("background-color", "yellow")
