export default function ChatBubble({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-[11px] font-semibold text-white">
          AI
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "rounded-br-md bg-gray-900 text-white"
            : "rounded-bl-md border border-gray-200 bg-white text-gray-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
