// "use client"

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
//   Popup,
// } from "react-leaflet"
// import "leaflet/dist/leaflet.css"
// import { useEffect, useState } from "react"

// interface LiveMapProps {
//   agentLat?: number
//   agentLng?: number
//   customerLat?: number
//   customerLng?: number
//   technicianName?: string
// }

// export function LiveMap({
//   agentLat,
//   agentLng,
//   customerLat,
//   customerLng,
//   technicianName,
// }: LiveMapProps) {
//   const [agentPosition, setAgentPosition] = useState<[number, number] | null>(null)

//   // ✅ smooth movement
//   useEffect(() => {
//     if (!agentLat || !agentLng) return

//     setAgentPosition((prev) => {
//       if (!prev) return [agentLat, agentLng]

//       const newLat = prev[0] + (agentLat - prev[0]) * 0.2
//       const newLng = prev[1] + (agentLng - prev[1]) * 0.2

//       return [newLat, newLng]
//     })
//   }, [agentLat, agentLng])

//   if (!customerLat || !customerLng) {
//     return <p className="text-center p-4">No location available</p>
//   }

//   const center = agentPosition || [customerLat, customerLng]

//   return (
//     <div className="h-72 w-full rounded-xl overflow-hidden">
//       <MapContainer center={center as any} zoom={15}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* 🏠 Customer Marker */}
//         <Marker position={[customerLat, customerLng]}>
//           <Popup>Your Location</Popup>
//         </Marker>

//         {/* 🛵 Agent Marker */}
//         {agentPosition && (
//           <Marker position={agentPosition}>
//             <Popup>{technicianName || "Technician"}</Popup>
//           </Marker>
//         )}

//         {/* 📍 Route line */}
//         {agentPosition && (
//           <Polyline
//             positions={[
//               agentPosition,
//               [customerLat, customerLng],
//             ]}
//           />
//         )}
//       </MapContainer>
//     </div>
//   )
// }
"use client"

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import Bike from "../public/images/bike.png";
import Home from "../public/images/home.png"
// ✅ Fix default marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl

// 🏠 Customer icon
// const homeIcon = L.icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
//   iconSize: [36, 36],
//   iconAnchor: [18, 36],
// })

const homeIcon = L.divIcon({
  html: `
    <div style="position: relative">
      <img src="${Home.src}" style="width:42px;height:42px"/>
      <span style="
        position:absolute;
        top:50%;
        left:50%;
        width:42px;
        height:42px;
        background:rgba(255,165,0,0.3);
        border-radius:50%;
        transform:translate(-50%,-50%);
        animation:pulse 1.5s infinite;
      "></span>
    </div>
  `,
  className: "",
  iconSize: [42, 42],
})

// 🛵 Agent icon
// const bikeIcon = L.icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995507.png",
//   iconSize: [42, 42],
//   iconAnchor: [21, 42],
// })

const bikeIcon = L.divIcon({
  html: `
    <div style="position: relative">
      <img src="${Bike.src}" style="width:42px;height:42px"/>
      <span style="
        position:absolute;
        top:50%;
        left:50%;
        width:42px;
        height:42px;
        background:rgba(255,165,0,0.3);
        border-radius:50%;
        transform:translate(-50%,-50%);
        animation:pulse 1.5s infinite;
      "></span>
    </div>
  `,
  className: "",
  iconSize: [42, 42],
})


// ✅ Resize fix (modal issue)
function ResizeMap() {
  const map = useMap()

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    }, 300)
  }, [])

  return null
}

// ✅ Auto zoom
function FitBounds({ points }: any) {
  const map = useMap()

  useEffect(() => {
    if (!points.length) return
    map.fitBounds(points)
  }, [points])

  return null
}

export function LiveMap({
  agentLat,
  agentLng,
  customerLat,
  customerLng,
  technicianName,
}: any) {
  const [agentPosition, setAgentPosition] = useState<any>(null)
  const [route, setRoute] = useState<any[]>([])

  // ✅ Smooth agent movement
  useEffect(() => {
    if (!agentLat || !agentLng) return

    setAgentPosition((prev: any) => {
      if (!prev) return [agentLat, agentLng]

      return [
        prev[0] + (agentLat - prev[0]) * 0.2,
        prev[1] + (agentLng - prev[1]) * 0.2,
      ]
    })
  }, [agentLat, agentLng])

  // ✅ Fetch road route
  useEffect(() => {
    if (!agentLat || !agentLng || !customerLat || !customerLng) return

    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${agentLng},${agentLat};${customerLng},${customerLat}?overview=full&geometries=geojson`
        )

        const data = await res.json()

        const coords = data.routes[0].geometry.coordinates.map(
          ([lng, lat]: any) => [lat, lng]
        )

        setRoute(coords)
      } catch (err) {
        console.error("Route error", err)
      }
    }

    fetchRoute()
  }, [agentLat, agentLng, customerLat, customerLng])

  if (!customerLat || !customerLng) {
    return <p className="text-center p-4">No location available</p>
  }

  const center = agentPosition || [customerLat, customerLng]

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <ResizeMap />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🏠 Customer */}
      <Marker position={[customerLat, customerLng]} icon={homeIcon} />

      {/* 🛵 Agent */}
      {agentPosition && (
        <Marker position={agentPosition} icon={bikeIcon} />
      )}

      {/* 🛣️ Route */}
      {route.length > 0 && (
        <>
          <Polyline positions={route} color="blue" weight={5} />
          <FitBounds points={route} />
        </>
      )}
    </MapContainer>
  )
}