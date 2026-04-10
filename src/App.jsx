import { useState } from "react"
import BottomNav from "./components/BottomNav"
import Navbar from "./components/Navbar"
import { mockUser } from "./data/mockData"
import ChatPage from "./pages/ChatPage"
import EligibleSchemesPage from "./pages/EligibleSchemesPage"
import ExplorePage from "./pages/ExplorePage"
import ProfilePage from "./pages/ProfilePage"

export default function App() {
  const [activeTab, setActiveTab] = useState("explore")
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [highlightedSchemeId, setHighlightedSchemeId] = useState(null)

  const handleCheckEligibility = (schemeId) => {
    setHighlightedSchemeId(schemeId)
    setActiveTab("eligible")
  }

  return (
    <div className="app-shell flex h-screen flex-col bg-[#f5f5f3] text-gray-900">
      <Navbar activeTab={activeTab} user={currentUser} />

      <main className="flex-1 overflow-hidden px-0 pb-24 pt-[var(--app-header-height)]">
        <div className="mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden">
          <div key={activeTab} className="page-transition flex-1 overflow-y-auto">
            {activeTab === "explore" && <ExplorePage onCheckEligibility={handleCheckEligibility} />}
            {activeTab === "eligible" && (
              <EligibleSchemesPage
                currentUser={currentUser}
                highlightedSchemeId={highlightedSchemeId}
                onUserLoaded={setCurrentUser}
              />
            )}
            {activeTab === "assistant" && <ChatPage currentUser={currentUser} />}
            {activeTab === "profile" && <ProfilePage user={currentUser} onUserUpdate={setCurrentUser} />}
          </div>
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
