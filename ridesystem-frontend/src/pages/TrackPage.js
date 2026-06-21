import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiaGFyc2hpbmktMjEiLCJhIjoiY21wd3h3c3oxMDBsajJwcGUwZHBxcTVnMyJ9.H_FVGtO5eALCFfU0I6OfUw";

function TrackPage({ data, onBack }) {
  const mapRef = useRef(null);

  const { ride } = data;

  useEffect(() => {
    // ✅ FIX 1: safe check
    if (!ride || !ride.pickupCoords || !ride.dropCoords) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [ride.pickupCoords.lon, ride.pickupCoords.lat],
      zoom: 14,
      pitch: 60,
      bearing: -20
    });

    map.on("load", async () => {

      /* 🔥 GET ROUTE */
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${ride.pickupCoords.lon},${ride.pickupCoords.lat};${ride.dropCoords.lon},${ride.dropCoords.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      // ✅ FIX 2: renamed variable (avoid conflict)
      const resData = await query.json();
      const route = resData.routes[0].geometry.coordinates;

      /* 🔥 DRAW ROUTE */
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route
          }
        }
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#e11d48",
          "line-width": 6
        }
      });

      /* ✅ FIX 3: pickup marker added */
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([ride.pickupCoords.lon, ride.pickupCoords.lat])
        .addTo(map);

      /* 📍 DROP MARKER */
      new mapboxgl.Marker({ color: "red" })
        .setLngLat([ride.dropCoords.lon, ride.dropCoords.lat])
        .addTo(map);

      /* 🚗 CAR */
      const car = document.createElement("img");
      car.src = "https://cdn-icons-png.flaticon.com/512/744/744465.png";
      car.style.width = "40px";

      const marker = new mapboxgl.Marker(car)
        .setLngLat(route[0])
        .addTo(map);

      /* 🕒 TIME */
      const totalDuration = resData.routes[0].duration * 1000;
      const steps = route.length;
      const intervalTime = totalDuration / steps;

      let i = 0;

      function animate() {
        if (i >= route.length) return;

        marker.setLngLat(route[i]);

        // ✅ FIX 4: rotation
        const prev = route[i - 1];
        const curr = route[i];

        if (prev && curr) {
          const angle =
            (Math.atan2(curr[1] - prev[1], curr[0] - prev[0]) * 180) / Math.PI;
          car.style.transform = `rotate(${angle}deg)`;
        }

        map.easeTo({
          center: route[i],
          duration: intervalTime,
          easing: (t) => t
        });

        i++;
        setTimeout(animate, intervalTime);
      }

      marker.setLngLat(route[0]);
      animate();
    });

    // ✅ FIX 5: safe cleanup
    return () => {
      if (map) map.remove();
    };

  }, [ride]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>

      <button
        onClick={onBack}
        style={{
          position: "absolute",
          zIndex: 1000,
          top: "20px",
          left: "20px",
          background: "#e11d48",
          color: "#fff",
          padding: "10px",
          borderRadius: "8px",
          border: "none"
        }}
      >
        ← Back
      </button>

      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
      />

      <button
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#16a34a",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none"
        }}
        onClick={onBack}
      >
        End Trip
      </button>

    </div>
  );
}

export default TrackPage;