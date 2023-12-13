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
    dataAlgoritma = null,
    icon,
}) {
    const [data, setData] = useState("");
    useEffect(() => {
        mapboxgl.accessToken = api_token;
        const map = new mapboxgl.Map({
            container: "map", // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: "mapbox://styles/mapbox/streets-v12", // style URL
            center: dataTitikMulai !== null ? [dataTitikMulai?.lng,dataTitikMulai?.lat] : [107.53606, -6.901729], // starting position [lng, lat]
            zoom: 17, // starting zoom
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
            dataNode.forEach((value) => {
                if (value?.type?.toLowerCase() === "kantor") {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.pemadam})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `35px`;
                    el.style.height = `35px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                }
                if (value?.type?.toLowerCase() === "kejadian") {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.kejadian})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `25px`;
                    el.style.height = `25px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                } else {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.dot})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `25px`;
                    el.style.height = `25px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.id} - ${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
            }
            });
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
            dataNode?.forEach((value) => {
                // const marker = new mapboxgl.Marker({ color: "#7d000c" })
                //     .setLngLat([value?.lng, value?.lat])
                //     .addTo(map);
                // // Buat konten popup berdasarkan node.name
                // const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                //     `<h3>${value?.name}</h3>`
                // );

                // // Tampilkan popup saat marker di klik
                // marker.setPopup(popup);
                if (value?.type?.toLowerCase() === "kantor") {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.pemadam})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `35px`;
                    el.style.height = `35px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.id} - ${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                } else if (value?.type?.toLowerCase() === "kejadian") {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.kejadian})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `25px`;
                    el.style.height = `25px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.id} - ${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                } else {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.dot})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `25px`;
                    el.style.height = `25px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.id} - ${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                }
            });
        } else if (usageFor === "Algoritma") {
            function createLineCoordinates(data, color) {
                return data
                    ?.map((item) => [
                        [parseFloat(item.lngStart), parseFloat(item.latStart)],
                        [parseFloat(item.lngEnd), parseFloat(item.latEnd)],
                    ])
                    .flat();
            }

            function addLineToMap(map, id, coordinates, color) {
                map.addSource(id, {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: coordinates,
                        },
                    },
                });

                map.addLayer({
                    id: id,
                    type: "line",
                    source: id,
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": color,
                        "line-width": 4,
                    },
                });
            }

            map.on("load", function () {
                const lineCoordinates = createLineCoordinates(
                    dataAlgoritma?.result_algoritma_shortpath,
                    "green"
                );
                const lineData = dataAlgoritma?.result_all_path;

                // Tambahkan garis dari result_algoritma_shortpath
                if (lineData && Array.isArray(lineData)) {
                    lineData.forEach((data, index) => {
                        const color = "red";
                        const id = `line${index + 2}`;
                        const coordinates = createLineCoordinates(data, color);
                        addLineToMap(map, id, coordinates, color);
                    }); 
                }
                addLineToMap(map, "line1", lineCoordinates, "green");

            });

            dataNode.forEach((value) => {
                if (value?.type?.toLowerCase() === "kantor") {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.pemadam})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `35px`;
                    el.style.height = `35px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                }
                if (value?.type?.toLowerCase() === "kejadian") {
                    let el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage = `url(${icon?.kejadian})`;
                    // el.style.backgroundImage = `url(https://placekitten.com/g/20/20/)`;
                    el.style.width = `25px`;
                    el.style.height = `25px`;
                    el.style.backgroundSize = "100%";
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([value?.lng, value?.lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<h3>${value?.name}</h3>`
                    );

                    marker.setPopup(popup);
                }
            });
            // console.log("data", icon);
        }
    }, [api_token, dataTitikMulai, dataTitikTujuan, dataAlgoritma, dataNode]); // Pastikan untuk menambahkan api_token sebagai dependensi

    return (
        <>
            <div id="map"></div>
        </>
    );
}

export default MapboxMap;
