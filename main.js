window.onload = init

function init(){


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Stamen_TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 19,
	ext: 'png'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });
/**
 * Marker cluster
 */
 var markerCluster = L.markerClusterGroup(); 
    
 /* var geoJsonLayer = L.geoJson(BeeData, {
     
    onEachFeature: function (feature, layer) {
        var popupcontent =
            '<h4 class = "text-primary">Bee Info </h4>' +
            '<div class="container"><table class="table table-striped">' +
            "<thead><tr><th>Properties</th><th>Value</th></tr></thead>" +
            "<tbody><tr><td> Genus </td><td>" +
            feature.properties.Genus +
            "</td></tr>" +
            "<tr><td> Year </td><td>" +
            feature.properties.Date +
            "</td></tr>" +
            "<tr><td> Size </td><td>" +
            feature.properties.Size +
            "</td></tr>" +
            "<tr><td> Rareness </td><td>" +
            feature.properties.Rareness +
            "</td></tr>" +
            "<tr><td> Taxonomy Family </td><td>" +
            feature.properties['Taxonomy Family'] +
            "</td></tr>"+
            "<tr><td> Taxonomy Tribe </td><td>" +
            feature.properties['Taxonomy Tribe'] +
            "</td></tr>"+
            "<tr><td> Sex </td><td>" +
            feature.properties.Sex +
            "</td></tr>" +
            "<tr><td> Collecting Method </td><td>" +
            feature.properties['Collecting Method'] +
            "</td></tr>" +
            "<tr><td> Host Plant </td><td>" +
            feature.properties['Host Plant'] +
            "</td></tr>" +
            "<tr><td> Collector </td><td>" +
            feature.properties.Collector +
            "</td></tr>";

            layer.bindPopup(popupcontent);
    }
});  */

var beeIcon = L.icon({
    iconUrl: 'bee.png',
    iconSize: [32, 37],
});

// Using fetch to get the data
var beeHeat = L.geoJson(BeeData, {
    pointToLayer: function(feature, layer){

    }
});
console.log(beeHeat.feature)

var bees = L.geoJson(BeeData, {
    pointToLayer: function(feature, layer){
        var marker = L.marker(layer, {icon: beeIcon});
        var popupcontent =
            '<h4 class = "text-primary">Bee Info </h4>' +
            '<div class="container"><table class="table table-striped">' +
            "<thead><tr><th>Properties</th><th>Value</th></tr></thead>" +
            "<tbody><tr><td> Genus </td><td>" +
            feature.properties.Genus +
            "</td></tr>" +
            "<tr><td> Year </td><td>" +
            feature.properties.Date +
            "</td></tr>" +
            "<tr><td> Size </td><td>" +
            feature.properties.Size +
            "</td></tr>" +
            "<tr><td> Rareness </td><td>" +
            feature.properties.Rareness +
            "</td></tr>" +
            "<tr><td> Taxonomy Family </td><td>" +
            feature.properties['Taxonomy Family'] +
            "</td></tr>"+
            "<tr><td> Taxonomy Tribe </td><td>" +
            feature.properties['Taxonomy Tribe'] +
            "</td></tr>"+
            "<tr><td> Sex </td><td>" +
            feature.properties.Sex +
            "</td></tr>" +
            "<tr><td> Collecting Method </td><td>" +
            feature.properties['Collecting Method'] +
            "</td></tr>" +
            "<tr><td> Host Plant </td><td>" +
            feature.properties['Host Plant'] +
            "</td></tr>" +
            "<tr><td> Collector </td><td>" +
            feature.properties.Collector +
            "</td></tr>";
        marker.bindPopup(popupcontent);
    return marker;
    
    }
});


//markerCluster.addLayer(geoJsonLayer);
markerCluster.addLayer(bees);



// Map layer
var map = L.map('L-map', {
    center: [ 8.964844, -1.373291],
	zoom: 9, //use 7 for production
    minZoom: 7, 
    //layers: [ CartoDB_DarkMatter, CumCases, markers]
    layers: [ OpenStreetMap_Mapnik, markerCluster, OpenTopoMap]
})


/**
* LAYER GROUP 
*/

var baseLayers = {
    "Open Street Map": OpenStreetMap_Mapnik,
    "Esri_Imagery": Esri_WorldImagery,
    "Terrain": Stamen_TerrainBackground,
    "OpenTopo": OpenTopoMap
};

var overlays = {
		"Bees": markerCluster,
        
};

L.control.layers(baseLayers, overlays).addTo(map);

 // create the sidebar instance and add it to the map
 var sidebar = L.control.sidebar({ container: 'sidebar' }).addTo(map).open('home');

// leaflet search
L.Control.geocoder().addTo(map);

}