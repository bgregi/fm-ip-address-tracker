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
            
            buildMap(data)
        },
        error: function () {
            alert("Please type a correct IP address or domain name")
        }    
    })
    
}

//CREATES MAP
var myMap = L.map('map')

//GETS USER INFO AT PAGE LOAD
getInfo("", "")

//GET INPUT
function getInput() {
    let regExp = /[a-zA-Z]/g
    let input = $("input").val()
    
    let domainName = ""
    let ipAddress = ""
    
    regExp.test(input) ? domainName = input : ipAddress = input
    
    getInfo(ipAddress, domainName)
}

//GETS INFO FROM USER INPUT
$("button").on("click", function() {
    getInput()
})

$("input").on("keypress", function(e) {
    if (e.which == 13) {
        getInput()
    }
})

//BUILDS THE MAP FROM GIVEN COORDINATES
function buildMap(data) {

    myMap.setView([data.location.lat, data.location.lng], 13);

    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmdyZWdpIiwiYSI6ImNrdHc5NzFqODI1ODIycGxhNHFuNXk0NXAifQ.K4-QeRXSbsP7UDmbHRwGsA'
    }).addTo(myMap);
    
    //CHANGES MARKER ICON
    var myIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    
        iconSize:     [46, 56], // size of the icon
        iconAnchor:   [23, 55], // point of the icon which will correspond to marker's location
    });
    L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(myMap);
    
}