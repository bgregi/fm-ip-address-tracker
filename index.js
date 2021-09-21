const api_key = "at_rYoNfJQaPsngkRDwrhwT6RhscJWkU";

$("button").on("click", function () {
    let ip = $("#div-input").val()

    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: {
            apiKey: api_key,
            ipAddress: ip
        },
        success: function (data) {
            // console.log("deu boa")

            let ipAddress = JSON.stringify(data, "", 2)
            let ip2 = JSON.parse(ipAddress)

            console.log(ipAddress)
            console.log(typeof(ipAddress))
            console.log(ip2)
            console.log(typeof(ip2))
            console.log("data is a " + typeof(data))
            console.log(data)


            // $("body").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");
            // console.log(data)
        }
    })
})