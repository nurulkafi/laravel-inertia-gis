import React, { useEffect } from "react";

function MapboxMap({ api_token }) {
    useEffect(() => {
        mapboxgl.accessToken = api_token;
        const map = new mapboxgl.Map({
            container: "map", // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: "mapbox://styles/mapbox/streets-v9", // style URL
            center: [107.610112, -6.9107712], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });
    }, [api_token]); // Pastikan untuk menambahkan api_token sebagai dependensi

    return <div id="map"></div>;
}

export default MapboxMap;
