import { useState } from "react"
import BottomNav from "./components/BottomNav"
import Navbar from "./components/Navbar"
import { mockUser } from "./data/mockData"
import ChatPage from "./pages/ChatPage"
import EligibleSchemesPage from "./pages/EligibleSchemesPage"
import ExplorePage from "./pages/ExplorePage"
import ProfilePage from "./pages/ProfilePage"
import { pauseSpeaking, repeatLastSpoken, resumeSpeaking, speakText, stopSpeaking } from "./utils/speech"

const tabLabels = {
  explore: "Explore",
  eligible: "Eligible Schemes",
  assistant: "AI Assistant",
  profile: "Profile",
}

export default function App() {
  const [activeTab, setActiveTab] = useState("explore")
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [highlightedSchemeId, setHighlightedSchemeId] = useState(null)
  const [language] = useState("en-IN")

  const selectTab = (tabId) => {
    setActiveTab(tabId)
    speakText(`Selected ${tabLabels[tabId]} tab.`, { lang: language })
  }

  const handleCheckEligibility = (schemeId) => {
    setHighlightedSchemeId(schemeId)
    selectTab("eligible")
  }

  const handleVoiceCommand = (transcript, speechContext = {}) => {
    const command = transcript.trim().toLowerCase().replace(/[.,!?]/g, "")
    const commandLanguage = speechContext.language || language

    if (["go to explore", "open explore"].includes(command)) {
      selectTab("explore")
      return
    }

    if (["go to eligible schemes", "open eligible schemes"].includes(command)) {
      selectTab("eligible")
      return
    }

    if (["go to assistant", "open assistant"].includes(command)) {
      selectTab("assistant")
      return
    }

    if (["go to profile", "open profile"].includes(command)) {
      selectTab("profile")
      return
    }

    if (command === "read page") {
      speakText(speechContext.pageText || speechContext.autoReadText || "No page text is available.", {
        lang: commandLanguage,
      })
      return
    }

    if (command === "read summary") {
      speakText(speechContext.autoReadText || speechContext.pageText || "No page summary is available.", {
        lang: commandLanguage,
      })
      return
    }

    if (command === "repeat") {
      if (!repeatLastSpoken()) {
        speakText("Nothing has been spoken yet.", { lang: commandLanguage })
      }
      return
    }

    if (command === "pause") {
      pauseSpeaking()
      return
    }

    if (command === "resume") {
      resumeSpeaking()
      return
    }

    if (command === "stop") {
      stopSpeaking()
      return
    }

    speakText(
      "Command not recognized. Try: go to explore, go to eligible schemes, go to assistant, go to profile, read page, read summary, repeat, pause, resume, or stop.",
      { lang: commandLanguage },
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[#f5f5f3] text-gray-900">
      <Navbar activeTab={activeTab} user={currentUser} />

      <main className="flex-1 overflow-hidden pb-24 pt-[5.25rem]">
        <div className="mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden">
          <div key={activeTab} className="page-transition flex-1 overflow-y-auto">
            {activeTab === "explore" && (
              <ExplorePage
                language={language}
                onCheckEligibility={handleCheckEligibility}
                onVoiceCommand={handleVoiceCommand}
              />
            )}
            {activeTab === "eligible" && (
              <EligibleSchemesPage
                currentUser={currentUser}
                highlightedSchemeId={highlightedSchemeId}
                language={language}
                onUserLoaded={setCurrentUser}
                onVoiceCommand={handleVoiceCommand}
              />
            )}
            {activeTab === "assistant" && (
              <ChatPage currentUser={currentUser} language={language} onVoiceCommand={handleVoiceCommand} />
            )}
            {activeTab === "profile" && (
              <ProfilePage user={currentUser} language={language} onVoiceCommand={handleVoiceCommand} />
            )}
          </div>
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={selectTab} />
    </div>
  )
}
