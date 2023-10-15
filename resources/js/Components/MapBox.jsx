import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function MapboxMap({
    api_token,
    setDataLat = null,
    setDataLng = null,
    setDataCityName,
    setIsLoading,
    usageFor = "Node",
    dataNode = null,
    dataTitikMulai = null,
    dataTitikTujuan = null,
    setDistance,
}) {
    const [data, setData] = useState("");
    useEffect(() => {
        mapboxgl.accessToken = api_token;
        const map = new mapboxgl.Map({
            container: "map", // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: "mapbox://styles/mapbox/streets-v12", // style URL
            center: [107.610112, -6.9107712], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                // Saat aktif, peta akan menerima pembaruan ke lokasi perangkat saat berubah.
                trackUserLocation: true,
                // Gambar panah di sebelah titik lokasi untuk menunjukkan arah yang dituju perangkat.
                showUserHeading: true,
            })
        );
        var marker;
        if (usageFor === "Node") {
            map.on("click", function (e) {
                if (marker) {
                    marker.remove();
                }
                // console.log("map", e);
                marker = new mapboxgl.Marker({
                    color: "#7d000c",
                })
                    .setLngLat(e.lngLat)
                    .addTo(map);

                const lat = e.lngLat.lat;
                const lng = e.lngLat.lng;
                setIsLoading(true);
                axios
                    .get(
                        `http://localhost:8000/api/location_info?lat=${lat}&lng=${lng}`
                    )

                    .then((response) => {
                        // Dapatkan data dari respons API jika perlu
                        // setDataCityName(null)
                        const addressData =
                            response?.data?.results?.[0]?.address_line2;
                        // setData(addressData);
                        setIsLoading(false);
                        setDataCityName(addressData);
                        setDataLat(e.lngLat.lat);
                        setDataLng(e.lngLat.lng);
                    })
                    .catch((error) => {
                        setData(error);
                        console.error("Error fetching address data", error);
                    });
                // console.log("Address data", data);
            });
        } else if (usageFor === "Graph") {
            const lineCoordinates = [
                [dataTitikMulai?.lng, dataTitikMulai?.lat],
                [dataTitikTujuan?.lng, dataTitikTujuan?.lat],
            ];
            map.on("load", function () {
                map.addSource("line", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: lineCoordinates,
                        },
                    },
                });

                map.addLayer({
                    id: "line",
                    type: "line",
                    source: "line",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "cyan", // Warna garis
                        "line-width": 4, // Lebar garis dalam piksel
                    },
                });
            });
            if (dataTitikMulai !== null && dataTitikTujuan !== null) {
                var from = turf.point([
                    dataTitikMulai?.lng,
                    dataTitikMulai?.lat,
                ]);
                var to = turf.point([
                    dataTitikTujuan?.lng,
                    dataTitikTujuan?.lat,
                ]);
                var options = { units: "kilometers" };

                var distance = turf.distance(from, to, options);

                setDistance(distance.toFixed(2));
            }
            // console.log("dataTitikTujuan", dataTitikTujuan);
            dataNode.forEach((value) => {
                const marker = new mapboxgl.Marker({ color: "#7d000c" })
                    .setLngLat([value?.lng, value?.lat])
                    .addTo(map);
                // Buat konten popup berdasarkan node.name
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>${value?.name}</h3>`
                );

                // Tampilkan popup saat marker di klik
                marker.setPopup(popup);
            });
        }
    }, [api_token, dataTitikMulai, dataTitikTujuan]); // Pastikan untuk menambahkan api_token sebagai dependensi

    return (
        <>
            <div id="map"></div>
        </>
    );
}

export default MapboxMap;
