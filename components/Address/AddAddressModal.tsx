// "use client"

// import { useState } from "react"
// import { useLocation } from "@/context/location-context"
// import axiosInstance from "@/configs/axios-middleware"
// import Api from "../../api-endpoints/ApiUrls"

// export default function AddAddressModal({ coords, onClose }: any) {
//   const { setLocation, fetchAddresses } = useLocation()

//   const [form, setForm] = useState({
//     name: "",
//     contact: "",
//     full_address: "",
//     pincode: "",
//     district: "",
//     state: "",
//     lat: coords?.lat,
//     lng: coords?.lng,
//   })

//   const handleSubmit = async () => {
//     const res = await axiosInstance.post(Api?.address, {
//       ...form,
//       lat: form.lat.toString(),
//       lng: form.lng.toString(),
//       is_primary: true,
//     })

//     const saved = res.data

//     setLocation({
//       lat: Number(saved.lat),
//       lng: Number(saved.lng),
//       city: saved.district,
//       state: saved.state,
//       pincode: saved.pincode,
//       address: saved.full_address,
//     })

//     await fetchAddresses()
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//       <div className="bg-white p-5 rounded space-y-3">

//         <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
//         <input placeholder="Phone" onChange={(e)=>setForm({...form,contact:e.target.value})}/>
//         <input placeholder="Address" onChange={(e)=>setForm({...form,full_address:e.target.value})}/>

//         <button onClick={handleSubmit} className="bg-primary text-white w-full py-2">
//           Save
//         </button>

//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useLocation } from "@/context/location-context"
import axiosInstance from "@/configs/axios-middleware"
import Api from "@/api-endpoints/ApiUrls"

export default function AddAddressModal({ coords, onClose }: any) {
  const { setLocation, fetchAddresses } = useLocation()

  const [form, setForm] = useState({
    name: "",
    contact: "",
    full_address: "",
    pincode: "",
    district: "",
    state: "",
    lat: coords?.lat,
    lng: coords?.lng,
  })

  const handleSubmit = async () => {
    const res = await axiosInstance.post(Api?.address, {
      ...form,
      lat: form.lat.toString(),
      lng: form.lng.toString(),
      is_primary: true,
      selected_address: true,
    })

    const saved = res.data

    setLocation({
      lat: Number(saved.lat),
      lng: Number(saved.lng),
      city: saved.district,
      state: saved.state,
      pincode: saved.pincode,
      address: saved.full_address,
    })

    await fetchAddresses()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-5 rounded space-y-3 w-96">

        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Phone" onChange={(e)=>setForm({...form,contact:e.target.value})}/>
        <input placeholder="Address" onChange={(e)=>setForm({...form,full_address:e.target.value})}/>
        <input placeholder="City" onChange={(e)=>setForm({...form,district:e.target.value})}/>
        <input placeholder="State" onChange={(e)=>setForm({...form,state:e.target.value})}/>
        <input placeholder="Pincode" onChange={(e)=>setForm({...form,pincode:e.target.value})}/>

        <button onClick={handleSubmit} className="bg-primary text-white w-full py-2">
          Save Address
        </button>

      </div>
    </div>
  )
}