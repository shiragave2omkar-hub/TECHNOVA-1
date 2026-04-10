import { useEffect, useMemo, useRef, useState } from "react"
import ProfileCard from "../components/ProfileCard"
import { recentActivity } from "../data/mockData"

const activityIcons = {
  eligibility: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M9 11 12 14 22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  application: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5v5l3 1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M12 16V8" strokeLinecap="round" />
      <path d="m8.5 11.5 3.5-3.5 3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17.5h10" strokeLinecap="round" />
    </svg>
  ),
}

const activityIconStyles = {
  eligibility: "bg-[#EAF3DE] text-[#3D6B1F]",
  application: "bg-[#FAEEDA] text-[#854F0B]",
  document: "bg-[#E6F1FB] text-[#185FA5]",
}

const verificationIcons = {
  udid: (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-gray-500">
      <path d="M8 1.5 13 3.4v4.38c0 3.08-2.14 5.94-5 6.72-2.86-.78-5-3.64-5-6.72V3.4l5-1.9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m5.9 7.9 1.35 1.35L10.4 6.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-gray-500">
      <path d="M5.1 1.8h1.34c.3 0 .55.22.6.52l.28 1.7a.63.63 0 0 1-.18.56l-.96.96a10.1 10.1 0 0 0 4.2 4.2l.96-.96a.63.63 0 0 1 .56-.18l1.7.28c.3.05.52.3.52.6v1.34c0 .35-.28.63-.63.63h-.84A10.89 10.89 0 0 1 2.57 3.27v-.84c0-.35.28-.63.63-.63Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-gray-500">
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="m3 5 5 3.9L13 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const documentAccept = "image/*,application/pdf"

const demoIncomeResult = {
  status: "verified",
  income_detected: 180000,
  income_formatted: "₹1,80,000",
  category: "EWS",
  confidence: "high",
  raw_text_snippet: "Demo mode — OCR unavailable",
}

function formatIndianCurrency(value) {
  if (typeof value !== "number") return ""
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

function buildPreview(file) {
  if (!file) return null
  const isPdf = file.type === "application/pdf"
  return {
    name: file.name,
    type: file.type,
    url: isPdf ? null : URL.createObjectURL(file),
    isPdf,
  }
}

export default function ProfilePage({ user, onUserUpdate }) {
  const passportInputRef = useRef(null)
  const incomeInputRef = useRef(null)

  const [otpTarget, setOtpTarget] = useState(null)
  const [otpValue, setOtpValue] = useState("")
  const [passportPreview, setPassportPreview] = useState(null)
  const [incomePreview, setIncomePreview] = useState(null)
  const [incomeMeta, setIncomeMeta] = useState(
    user.incomeAmount
      ? {
          amount: user.incomeAmount,
          formatted: formatIndianCurrency(user.incomeAmount),
          category: user.incomeCategory,
          confidence: user.income_verified ? "high" : "low",
          snippet: "",
        }
      : null,
  )
  const [incomeStatus, setIncomeStatus] = useState(user.incomeStatus || "not_uploaded")

  useEffect(() => {
    setIncomeStatus(user.incomeStatus || "not_uploaded")
    setIncomeMeta(
      user.incomeAmount
        ? {
            amount: user.incomeAmount,
            formatted: formatIndianCurrency(user.incomeAmount),
            category: user.incomeCategory,
            confidence: user.income_verified ? "high" : "low",
            snippet: "",
          }
        : null,
    )
  }, [user.incomeAmount, user.incomeCategory, user.incomeStatus, user.income_verified])

  useEffect(() => {
    return () => {
      if (passportPreview?.url) URL.revokeObjectURL(passportPreview.url)
      if (incomePreview?.url) URL.revokeObjectURL(incomePreview.url)
    }
  }, [incomePreview, passportPreview])

  const isProcessing = incomeStatus === "processing"

  const verificationRows = useMemo(
    () => [
      { key: "udid", icon: verificationIcons.udid, label: "UDID Number", value: "UDID-MH-2024-0198", status: "Verified" },
      { key: "phone", icon: verificationIcons.phone, label: "Phone Number", value: "+91 98765 43210", status: "Verify now" },
      { key: "email", icon: verificationIcons.email, label: "Email Address", value: "priya@example.com", status: "Verify now" },
    ],
    [],
  )

  const syncUserIncome = (resultStatus, resultAmount, resultCategory) => {
    onUserUpdate((current) => ({
      ...current,
      incomeStatus: resultStatus,
      incomeAmount: resultAmount,
      incomeCategory: resultCategory || current.incomeCategory,
      income_verified: resultStatus === "verified",
      income_amount: resultAmount || 0,
    }))
  }

  const handleStandardUpload = (event, setter) => {
    const file = event.target.files?.[0]
    if (!file) return

    setter((current) => {
      if (current?.url) URL.revokeObjectURL(current.url)
      return buildPreview(file)
    })
  }

  const resetIncome = () => {
    if (incomePreview?.url) URL.revokeObjectURL(incomePreview.url)
    setIncomePreview(null)
    setIncomeMeta(null)
    setIncomeStatus("not_uploaded")
    syncUserIncome("not_uploaded", null, user.incomeCategory)
    if (incomeInputRef.current) incomeInputRef.current.value = ""
  }

  const handleIncomeUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (incomePreview?.url) URL.revokeObjectURL(incomePreview.url)
    setIncomePreview(buildPreview(file))
    setIncomeStatus("processing")
    setIncomeMeta(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/verify-income", {
        method: "POST",
        body: formData,
      })

      const result = response.ok ? await response.json() : demoIncomeResult
      const nextAmount = typeof result.income_detected === "number" ? result.income_detected : null
      const nextStatus = result.status || "flagged"
      const nextCategory = result.category || user.incomeCategory

      setIncomeStatus(nextStatus)
      setIncomeMeta({
        amount: nextAmount,
        formatted: result.income_formatted || (nextAmount ? formatIndianCurrency(nextAmount) : ""),
        category: nextCategory,
        confidence: result.confidence || "low",
        snippet: result.raw_text_snippet || "",
      })
      syncUserIncome(nextStatus, nextAmount, nextCategory)
    } catch {
      setIncomeStatus(demoIncomeResult.status)
      setIncomeMeta({
        amount: demoIncomeResult.income_detected,
        formatted: demoIncomeResult.income_formatted,
        category: demoIncomeResult.category,
        confidence: demoIncomeResult.confidence,
        snippet: demoIncomeResult.raw_text_snippet,
      })
      syncUserIncome(demoIncomeResult.status, demoIncomeResult.income_detected, demoIncomeResult.category)
    }
  }

  const renderIncomeStatus = () => {
    if (incomeStatus === "processing") {
      return (
        <div className="flex items-center gap-2 text-sm font-semibold text-[#854F0B]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#854F0B]/25 border-t-[#854F0B]" />
          Verifying...
        </div>
      )
    }

    if (incomeStatus === "verified") {
      return (
        <div className="text-right">
          <span className="inline-flex rounded-full bg-[#EAF3DE] px-3 py-1 text-[11px] font-semibold text-[#3B6D11]">
            Verified - EWS
          </span>
          {incomeMeta?.amount ? <p className="mt-2 text-xs text-gray-500">{incomeMeta.formatted} / year</p> : null}
          <button type="button" className="mt-1 text-xs font-semibold text-[#185FA5]">
            View document
          </button>
        </div>
      )
    }

    if (incomeStatus === "flagged") {
      return (
        <div className="text-right">
          <span className="inline-flex rounded-full bg-[#FAEEDA] px-3 py-1 text-[11px] font-semibold text-[#854F0B]">
            Pending Review
          </span>
          <p className="mt-2 text-xs text-gray-500">Our team will verify within 24hrs</p>
        </div>
      )
    }

    if (incomeStatus === "rejected") {
      return (
        <div className="text-right">
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600">
            Not EWS Eligible
          </span>
          {incomeMeta?.amount ? <p className="mt-2 text-xs text-gray-500">{incomeMeta.formatted} / year</p> : null}
          <button type="button" onClick={resetIncome} className="mt-1 text-xs font-semibold text-[#185FA5]">
            Upload different document
          </button>
        </div>
      )
    }

    return (
      <button
        type="button"
        onClick={() => incomeInputRef.current?.click()}
        disabled={isProcessing}
        className="rounded-full border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Upload
      </button>
    )
  }

  return (
    <section className="space-y-4 px-4 pb-6 pt-3">
      <ProfileCard user={user} />

      <div className="rounded-2xl border border-[#e5e5e3] bg-white p-5" style={{ borderWidth: "0.5px" }}>
        <div className="divide-y divide-[#e5e5e3]">
          {verificationRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-4 py-[14px] first:pt-0 last:border-b-0 last:pb-0">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">{row.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{row.label}</p>
                  <p className="truncate text-sm text-gray-500">{row.value}</p>
                </div>
              </div>

              {row.status === "Verified" ? (
                <span className="shrink-0 rounded-full bg-[#EAF3DE] px-3 py-1 text-[11px] font-semibold text-[#3B6D11]">
                  Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setOtpTarget(row.key)}
                  className="shrink-0 rounded-full bg-[#FAEEDA] px-3 py-1 text-[11px] font-semibold text-[#854F0B]"
                >
                  Verify now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#e5e5e3] bg-white p-5" style={{ borderWidth: "0.5px" }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">My Documents</p>

        <div className="mt-3 divide-y divide-[#e5e5e3]">
          <DocumentRow
            label="Aadhaar Card"
            statusContent={
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#EAF3DE] px-3 py-1 text-[11px] font-semibold text-[#3B6D11]">Uploaded</span>
                <button type="button" className="text-xs font-semibold text-[#185FA5]">
                  View
                </button>
              </div>
            }
          />
          <DocumentRow
            label="Disability Certificate (UDID)"
            statusContent={
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#EAF3DE] px-3 py-1 text-[11px] font-semibold text-[#3B6D11]">Uploaded</span>
                <button type="button" className="text-xs font-semibold text-[#185FA5]">
                  View
                </button>
              </div>
            }
          />
          <DocumentRow
            label="Income Certificate"
            subContent={
              incomePreview ? (
                <DocumentPreview preview={incomePreview} fallbackText={incomeMeta?.snippet || "Income proof selected"} />
              ) : null
            }
            statusContent={renderIncomeStatus()}
          />
          <DocumentRow
            label="Passport Photo"
            subContent={passportPreview ? <DocumentPreview preview={passportPreview} fallbackText="Profile photo selected" /> : null}
            statusContent={
              passportPreview ? (
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#EAF3DE] px-3 py-1 text-[11px] font-semibold text-[#3B6D11]">Uploaded</span>
                  <button type="button" className="text-xs font-semibold text-[#185FA5]">
                    View
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => passportInputRef.current?.click()}
                  disabled={isProcessing}
                  className="rounded-full border border-gray-300 px-3 py-1 text-[11px] font-semibold text-gray-700 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Upload
                </button>
              )
            }
          />
        </div>

        <input
          ref={passportInputRef}
          type="file"
          accept={documentAccept}
          className="hidden"
          onChange={(event) => handleStandardUpload(event, setPassportPreview)}
        />
        <input
          ref={incomeInputRef}
          type="file"
          accept={documentAccept}
          className="hidden"
          onChange={handleIncomeUpload}
        />
      </div>

      <div className="rounded-2xl border border-[#e5e5e3] bg-white p-5" style={{ borderWidth: "0.5px" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Recent Activity</p>
        <div className="mt-4 space-y-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-2xl bg-gray-50 px-4 py-4">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  activityIconStyles[item.type] || "bg-white text-gray-700"
                }`}
              >
                {activityIcons[item.type]}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-500 shadow-sm">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {otpTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.22)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Verification</p>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              Verify {otpTarget === "phone" ? "Phone Number" : "Email Address"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Enter the 6-digit OTP sent to {otpTarget === "phone" ? "+91 98765 43210" : "priya@example.com"}.
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otpValue}
              onChange={(event) => setOtpValue(event.target.value)}
              placeholder="Enter OTP"
              className="mt-4 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-300 focus:bg-white"
            />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setOtpTarget(null)
                  setOtpValue("")
                }}
                className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtpTarget(null)
                  setOtpValue("")
                }}
                className="flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function DocumentRow({ label, statusContent, subContent }) {
  return (
    <div className="py-[14px] first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <div className="shrink-0">{statusContent}</div>
      </div>
      {subContent ? <div className="mt-3">{subContent}</div> : null}
    </div>
  )
}

function DocumentPreview({ preview, fallbackText }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-3 py-3">
      {preview.isPdf ? (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-semibold text-gray-500">
          PDF
        </div>
      ) : (
        <img src={preview.url} alt={preview.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-gray-800">{preview.name}</p>
        <p className="truncate text-xs text-gray-500">{fallbackText}</p>
      </div>
    </div>
  )
}
