import { useEffect, useRef, useState } from "react"
import AccessibilityControls from "../components/AccessibilityControls"
import ChatBubble from "../components/ChatBubble"

const suggestions = [
  "Check my eligibility",
  "What documents do I need?",
  "Show scholarships",
]

export default function ChatPage({ currentUser, language = "en-IN", onVoiceCommand }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = (value) => {
    const message = value || input.trim()
    if (!message) return

    setMessages((current) => [...current, { id: Date.now(), role: "user", text: message }])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", text: getAutoReply(message, currentUser) },
      ])
    }, 900)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const autoReadText = [
    "Selected AI Assistant tab.",
    "AI Assistant page.",
    "Ask for help with scheme eligibility, required documents, scholarships, health support, or next steps.",
    "Use Read Page to hear the current chat and suggested prompts.",
  ].join(" ")
  const pageText = [
    "AI Assistant page. Ask for scheme guidance.",
    `Current profile context: ${currentUser.name}, ${currentUser.state}, ${currentUser.disabilityType}, income category ${currentUser.incomeCategory}.`,
    messages.length === 0
      ? "No chat messages yet. Start with your situation."
      : `Current chat: ${messages
          .map((message) => `${message.role === "user" ? "You" : "Assistant"} said: ${message.text}`)
          .join(" ")}`,
    `Suggested prompts: ${suggestions.join(", ")}.`,
    "Action available: type a question, choose a suggestion, or use Voice Command for navigation and reading.",
  ].join(" ")

  return (
    <section className="flex h-full flex-col overflow-hidden px-4 pb-48 pt-4">
      <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">AI Assistant</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">Ask for scheme guidance</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Tell me about your situation and I'll help you find the right schemes
        </p>
      </div>

      <div className="mt-4 flex-1 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex h-full min-h-[240px] items-center justify-center">
                <div className="max-w-sm rounded-[28px] border border-dashed border-gray-200 bg-gray-50/80 px-6 py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-sm font-semibold text-white">
                    AI
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Start with your situation</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Tell me about your situation and I'll guide you step by step.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-[11px] font-semibold text-white">
                  AI
                </div>
                <div className="flex items-center gap-1 rounded-3xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:240ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                aria-label={`Ask assistant: ${suggestion}`}
                className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 px-4 py-4">
            <div className="flex items-center gap-3 rounded-[24px] bg-gray-50 px-4 py-3">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about eligibility, documents, or support schemes"
                aria-label="Ask about eligibility, documents, or support schemes"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                aria-label="Send message to assistant"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AccessibilityControls
        autoReadText={autoReadText}
        language={language}
        onVoiceCommand={onVoiceCommand}
        pageText={pageText}
      />
    </section>
  )
}

function getAutoReply(message, currentUser) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("eligibility")) {
    return `${currentUser.name.split(" ")[0]}, you are eligible for 3 schemes right now. Upload your income certificate to unlock 2 more and move one application from review to ready.`
  }

  if (lowerMessage.includes("document")) {
    return "You should keep your disability certificate, income certificate, Aadhaar, bank passbook, and address proof ready. Right now, the income certificate is the main missing document blocking additional schemes."
  }

  if (lowerMessage.includes("scholarship")) {
    return "The higher education scholarship is your best fit. It covers tuition and assistive learning support, and your current profile already meets the disability and income criteria."
  }

  if (lowerMessage.includes("health")) {
    return "You appear to fit health-support schemes that cover treatment, rehabilitation, and recurring care costs. If you confirm whether you need recurring therapy or hospital support, I can narrow this to the most actionable option."
  }

  return `I can guide you using ${currentUser.state}, ${currentUser.disabilityType}, and your current income category. Tell me what you need most and I'll turn that into the next best step.`
}
