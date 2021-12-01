window.onload = init

function init(){

 var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
   });

   var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


/**
 * Marker cluster
 */
    /*  var markers = L.markerClusterGroup(); 
    
     var geoJsonLayer = L.geoJson(markersD, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.amenity);
        }
    });

    markers.addLayer(geoJsonLayer);
 */
/**
 * Marker cluster
 */
 var markers = L.markerClusterGroup(); 
    
 var geoJsonLayer = L.geoJson(BeeData, {
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
}); 


markers.addLayer(geoJsonLayer);

    // Adding the Geojson Data
   

    // Map layer
    var map = L.map('L-map', {
        center: [ 8.964844, -1.373291],
    
		zoom: 7, //use 7 for production
        minZoom: 6, 
        //layers: [ CartoDB_DarkMatter, CumCases, markers]
        layers: [ OpenStreetMap_Mapnik, markers]
    })
	
	/**
     * LAYER GROUP 
     */

	var baseLayers = {
        "Open Street Map": OpenStreetMap_Mapnik,
        "CartoDB_DarkMatter": CartoDB_DarkMatter, 
        "Esri_WorldGrayCanvas": Esri_WorldGrayCanvas,
        "Stadia_AlidadeSmoothDark": Stadia_AlidadeSmoothDark
	};

	var overlays = {
		 "Bees": markers,
        
	};

	L.control.layers(baseLayers, overlays).addTo(map);
	
}