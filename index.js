// import 

const api_key = "at_rYoNfJQaPsngkRDwrhwT6RhscJWkU";

//GETS THE INFORMATION FROM IPIFY
function getInfo(ipAddress, domainName) {
    $("#ip").text("")
    $("#location").text("")
    $("#timezone").text("")
    $("#isp").text("")
    
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: {
            apiKey: api_key,
            ipAddress: ipAddress,
            domain: domainName
        },
        success: function (data) {
            $("#ip").append(data.ip)
            $("#location").append(`${data.location.city}, ${data.location.region} ${data.location.postalCode}`)
            $("#timezone").append("UTC " + data.location.timezone)
            $("#isp").append(data.isp)

            // console.log(data)
        },
        error: function () {
            alert("Please type a correct IP address or domain name")
        }
    })
}

//GETS USER INFO AT PAGE LOAD
getInfo("", "")

//GETS INFO FROM USER INPUT
$("button").on("click", function () {
    let regExp = /[a-zA-Z]/g
    let input = $("input").val()

    let domainName = ""
    let ipAddress = ""

    regExp.test(input) ? domainName = input : ipAddress = input

    getInfo(ipAddress, domainName)
})


var mymap = L.map('map').setView([51.505, -0.09], 13);