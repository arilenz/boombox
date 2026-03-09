import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import { UserControls } from "@/components/UserControls";
import { VoiceRoom } from "@/components/VoiceRoom";
import { Soundboard } from "@/components/Soundboard";
import { SettingsDialog } from "@/components/SettingsDialog";

const ROOM_NAMES: Record<string, string> = {
  "1": "General",
  "2": "Gaming",
  "3": "Music",
  "4": "AFK",
};

export default function App() {
  const [activeRoom, setActiveRoom] = useState<string | null>("1");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="dark flex h-screen bg-background text-foreground">
      <TooltipProvider>
        {/* Left sidebar */}
        <div className="flex flex-col border-r">
          <Sidebar activeRoom={activeRoom} onRoomSelect={setActiveRoom} />
          <UserControls onSettingsOpen={() => setSettingsOpen(true)} />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Voice room panel (shown when connected) */}
          {activeRoom && (
            <div className="border-b p-4">
              <VoiceRoom
                roomName={ROOM_NAMES[activeRoom] ?? "Room"}
                onDisconnect={() => setActiveRoom(null)}
              />
            </div>
          )}

          {/* Soundboard */}
          <div className="flex-1 overflow-hidden">
            <Soundboard />
          </div>
        </div>

        {/* Settings dialog */}
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </TooltipProvider>
    </div>
  );
}
