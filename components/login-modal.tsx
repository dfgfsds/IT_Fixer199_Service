// "use client"

// import { useState, useRef, useEffect } from "react"
// import { X, Phone } from "lucide-react"
// import { useAuth } from "@/context/auth-context"

// export function LoginModal() {
//   const { showLoginModal, setShowLoginModal, login } = useAuth()
//   const [step, setStep] = useState<"phone" | "otp" | "success">("phone")
//   const [phone, setPhone] = useState("")
//   const [otp, setOtp] = useState(["", "", "", ""])
//   const [loading, setLoading] = useState(false)
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([])

//   useEffect(() => {
//     if (!showLoginModal) {
//       setStep("phone")
//       setPhone("")
//       setOtp(["", "", "", ""])
//     }
//   }, [showLoginModal])

//   const handleSendOtp = () => {
//     if (phone.length >= 10) {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         setStep("otp")
//         setTimeout(() => inputRefs.current[0]?.focus(), 100)
//       }, 1000)
//     }
//   }

//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) return
//     const newOtp = [...otp]
//     newOtp[index] = value
//     setOtp(newOtp)
//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus()
//     }
//     if (newOtp.every((d) => d !== "")) {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         setStep("success")
//         setTimeout(() => {
//           login(phone)
//         }, 1200)
//       }, 800)
//     }
//   }

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus()
//     }
//   }

//   if (!showLoginModal) return null

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
//       <div className="relative w-full max-w-sm animate-slide-up rounded-3xl border border-border bg-card p-8 shadow-2xl">
//         <button
//           onClick={() => setShowLoginModal(false)}
//           className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//           aria-label="Close login modal"
//         >
//           <X className="h-4 w-4" />
//         </button>

//         {step === "phone" && (
//           <div className="text-center">
//             <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
//               <Phone className="h-6 w-6 text-primary" />
//             </div>
//             <h2 className="mb-2 text-xl font-bold text-foreground">Welcome Back</h2>
//             <p className="mb-6 text-sm text-muted-foreground">Enter your phone number to continue</p>
//             <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
//               <span className="text-sm font-medium text-muted-foreground">+91</span>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
//                 placeholder="Enter phone number"
//                 className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
//                 maxLength={10}
//               />
//             </div>
//             <button
//               onClick={handleSendOtp}
//               disabled={phone.length < 10 || loading}
//               className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </div>
//         )}

//         {step === "otp" && (
//           <div className="text-center">
//             <h2 className="mb-2 text-xl font-bold text-foreground">Verify OTP</h2>
//             <p className="mb-6 text-sm text-muted-foreground">
//               Enter the 4-digit code sent to +91 {phone}
//             </p>
//             <div className="mb-6 flex justify-center gap-3">
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => { inputRefs.current[i] = el }}
//                   type="text"
//                   inputMode="numeric"
//                   value={digit}
//                   onChange={(e) => handleOtpChange(i, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(i, e)}
//                   maxLength={1}
//                   className="h-14 w-14 rounded-xl border-2 border-border bg-background text-center text-xl font-bold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
//                 />
//               ))}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {"Didn't receive? "}
//               <button className="font-medium text-primary">Resend OTP</button>
//             </p>
//           </div>
//         )}

//         {step === "success" && (
//           <div className="py-4 text-center animate-fade-in">
//             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
//               <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="mb-1 text-xl font-bold text-foreground">Welcome!</h2>
//             <p className="text-sm text-muted-foreground">Login successful. Redirecting...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { X, Phone, Mail, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import axios from "axios"
import Api from '../api-endpoints/ApiUrls';

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useAuth()

  const [mode, setMode] = useState<"otp" | "email" | "register">("otp")
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone")

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!showLoginModal) {
      setStep("phone")
      setPhone("")
      setOtp(["", "", "", "", "", ""])
      setEmail("")
      setPassword("")
      setName("")
      setMode("otp")
    }
  }, [showLoginModal])

  // SEND OTP
  const handleSendOtp = async () => {
    if (phone.length < 10) return


    try {
      setLoading(true)

      await axios.post(Api?.login, {
        login_type: "OTP",
        role: "CUSTOMER",
        mobile_number: phone,
        device_type: "WEB",
        device_id: "web",
        device_name: "browser",
        ip_address: "127.0.0.1"
      })

      setStep("otp")
      setTimeout(() => inputRefs.current[0]?.focus(), 100)

    } catch {
      alert("OTP send failed")
    } finally {
      setLoading(false)
    }


  }

  // VERIFY OTP
  const handleOtpChange = async (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
    if (newOtp.every((d) => d !== "")) {
      const finalOtp = newOtp.join("")
      try {
        setLoading(true)
        const res = await axios.post(Api?.verifyOtp, {
          mobile_number: phone,
          otp: finalOtp,
          login_type: "OTP",
          role: "CUSTOMER",
          device_type: "WEB",
          device_id: "web",
          device_name: "browser",
          ip_address: "127.0.0.1"
        })
        if (res) {
          login(res)
        }
        setStep("success")
        // ✅ 5 sec delay
        setTimeout(() => login(res.data), 1000)

        setTimeout(() => {
          window.location.reload()
        }, 5000)

      } catch {
        alert("Invalid OTP")
      } finally {
        setLoading(false)
      }
    }


  }

  // EMAIL LOGIN
  const handleEmailLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post(Api?.emailLogin, {
        username: email,
        password,
        login_type: "PASSWORD",
        role: "CUSTOMER",
        device_type: "WEB",
        device_id: "web",
        device_name: "browser",
        ip_address: "127.0.0.1"
      })
      if (res) {
        login(res)
      }
    } catch {
      alert("Login failed")
    } finally {
      setLoading(false)
    }


  }

  // REGISTER
  const handleRegister = async () => {
    try {
      setLoading(true)


      await axios.post(Api?.user, {
        name,
        email,
        mobile_number: phone,
        password,
        comments: ""
      })

      alert("Account created successfully")
      setMode("email")

    } catch {
      alert("Registration failed")
    } finally {
      setLoading(false)
    }


  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  if (!showLoginModal) return null

  return (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      onClick={() => setShowLoginModal(false)}
    />


    <div className="relative w-full max-w-sm animate-slide-up rounded-3xl border border-border bg-card p-8 shadow-2xl">

      <button
        onClick={() => setShowLoginModal(false)}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>

      {/* MODE SWITCH */}
      <div className="mb-6 flex rounded-xl bg-muted p-1 mt-4">
        <button
          onClick={() => { setMode("otp"); setStep("phone") }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${mode === "otp" ? "bg-card shadow" : "text-muted-foreground"}`}
        >
          OTP
        </button>
        <button
          onClick={() => setMode("email")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${mode === "email" ? "bg-card shadow" : "text-muted-foreground"}`}
        >
          Email
        </button>
      </div>

      {/* OTP LOGIN */}
      {mode === "otp" && step === "phone" && (
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Phone className="h-6 w-6 text-primary" />
          </div>

          <h2 className="mb-2 text-xl font-bold">Welcome Back</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter your phone number
          </p>

          <div className="mb-4 flex items-center gap-2 rounded-xl border px-4 py-3">
            <span className="text-sm text-muted-foreground">+91</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter phone number"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            onClick={handleSendOtp}
            className="w-full rounded-xl bg-primary py-3 text-white"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <p className="mt-4 text-center text-sm">
            No account?{" "}
            <button
              onClick={() => setMode("register")}
              className="text-primary font-medium"
            >
              Register
            </button>
          </p>
        </div>
      )}

      {/* OTP VERIFY */}
      {mode === "otp" && step === "otp" && (
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold">Verify OTP</h2>

          <div className="mb-6 flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                value={digit}
                maxLength={1}
                inputMode="numeric"
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-14 rounded-xl border text-center text-xl font-bold"
              />
            ))}
          </div>
        </div>
      )}

      {/* EMAIL LOGIN */}
      {mode === "email" && (
        <>
          <div className="mb-4 flex items-center gap-2 rounded-xl border px-4 py-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="mb-4 flex items-center gap-2 rounded-xl border px-4 py-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            onClick={handleEmailLogin}
            className="w-full rounded-xl bg-primary py-3 text-white"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            No account?{" "}
            <button
              onClick={() => setMode("register")}
              className="text-primary font-medium"
            >
              Register
            </button>
          </p>
        </>
      )}

      {/* REGISTER */}
      {mode === "register" && (
        <>
          Create Acccount
          <div className="mb-3 flex items-center gap-2 rounded-xl border px-4 py-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="mb-3 rounded-xl border px-4 py-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="mb-3 rounded-xl border px-4 py-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="mb-4 rounded-xl border px-4 py-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full rounded-xl bg-primary py-3 text-white"
          >
            Create Account
          </button>
        </>
      )}

    </div>
  </div>


  )
}
