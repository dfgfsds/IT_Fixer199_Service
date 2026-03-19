// "use client"

// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
// import { useState } from "react"
// import L from "leaflet"

// // ✅ FIX MARKER ICON
// delete (L.Icon.Default.prototype as any)._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// })

// // 🔥 CLICK HANDLER COMPONENT
// function MapClickHandler({ setPosition }: any) {
//   useMapEvents({
//     click(e) {
//       console.log("clicked:", e.latlng) // 🔥 debug
//       setPosition({
//         lat: e.latlng.lat,
//         lng: e.latlng.lng,
//       })
//     },
//   })
//   return null
// }

// export default function LocationModal({ onClose }: any) {
//   const [position, setPosition] = useState({
//     lat: 13.0827,
//     lng: 80.2707,
//   })

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
//       <div className="bg-white p-4 rounded w-[600px]">

//         <h2 className="mb-2 font-semibold">Select Location</h2>

//         <MapContainer
//           center={position}
//           zoom={15}
//           style={{ height: "400px", width: "100%" }}
//           scrollWheelZoom={true}
//         >
//           <TileLayer
//             attribution="&copy; OpenStreetMap"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* 🔥 CLICK HANDLER */}
//           <MapClickHandler setPosition={setPosition} />

//           {/* 🔥 MARKER */}
//           <Marker position={position} />
//         </MapContainer>

//         <button
//           onClick={() => {
//             console.log("FINAL:", position)
//             onClose()
//           }}
//           className="mt-3 bg-primary text-white w-full py-2"
//         >
//           Confirm Location
//         </button>

//       </div>
//     </div>
//   )
// }

"use client"

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"
import { useLocation } from "@/context/location-context"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const defaultCenter = {
  lat: 13.0827,
  lng: 80.2707,
}

export default function LocationModal({ onClose }: any) {
  const { setLocation } = useLocation()

  const [position, setPosition] = useState(defaultCenter)

  // ✅ load script properly
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  })

  const handleMapClick = (e: any) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    })
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-5 rounded">Loading Map...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-4 rounded w-[650px]">

        <h2 className="mb-2 font-semibold">Select Location</h2>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={15}
          onClick={handleMapClick}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          <Marker
            position={position}
            draggable
            onDragEnd={(e: any) => {
              setPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              })
            }}
          />
        </GoogleMap>

        <button
          onClick={() => {
            setLocation({
              lat: position.lat,
              lng: position.lng,
              city: "Selected",
              state: "",
              pincode: "",
              address: "Custom location",
            })
            onClose()
          }}
          className="mt-4 bg-primary text-white w-full py-2"
        >
          Confirm Location
        </button>

      </div>
    </div>
  )
}