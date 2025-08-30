// "use client";

// import { useEffect, useState } from "react";
// import NeshanMap from "@neshan-maps-platform/leaflet";
// import "leaflet/dist/leaflet.css";
// import "@neshan-maps-platform/leaflet/index.css";

// export default function MyNeshanMap({ apiKey }) {
//   const [center, setCenter] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       pos => setCenter([pos.coords.latitude, pos.coords.longitude]),
//       () => setCenter([29.5918, 52.5836]) // شیراز پیش‌فرض
//     );
//   }, []);

//   if (!center) return <p>در حال دریافت موقعیت...</p>;

//   return (
//     <NeshanMap
//       options={{
//         key: apiKey,
//         maptype: "neshan,traffic,light", // می‌تونی به ترتیب تم‌ها رو جدا کنی
//         poi: true,
//         traffic: true,
//         center,
//         zoom: 14
//       }}
//       onInit={(L, map) => {
//         // افزودن مارکر برای موقعیت کاربر
//         L.marker(center).addTo(map).bindPopup("شما اینجا هستید").openPopup();

//         // کلیک روی نقشه آدرس رو به تو پس می‌ده:
//         map.on("click", e => {
//           fetch(
//             `https://api.neshan.org/v2/reverse?lat=${e.latlng.lat}&lng=${e.latlng.lng}`,
//             {
//               headers: { "Api-Key": apiKey }
//             }
//           )
//             .then(res => res.json())
//             .then(data => {
//               L.popup()
//                 .setLatLng(e.latlng)
//                 .setContent(data.address.friendly)
//                 .openOn(map);
//             });
//         });
//       }}
//     />
//   );
// }
