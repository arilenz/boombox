import { MicOff, Crown, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoiceUser {
  id: string;
  name: string;
  speaking?: boolean;
  muted?: boolean;
  isHost?: boolean;
}

const MOCK_VOICE_USERS: VoiceUser[] = [
  { id: "u1", name: "Alex", speaking: true, isHost: true },
  { id: "u2", name: "Jordan", muted: true },
  { id: "self", name: "You", speaking: false },
];

interface VoiceRoomProps {
  roomName: string;
  onDisconnect: () => void;
}

export function VoiceRoom({ roomName, onDisconnect }: VoiceRoomProps) {
  return (
    <div className="flex flex-col rounded-xl bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{roomName}</h3>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="destructive"
                size="icon-sm"
                onClick={onDisconnect}
              />
            }
          >
            <PhoneOff className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent>Disconnect</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-wrap gap-4">
        {MOCK_VOICE_USERS.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-2">
            <div
              className={`rounded-full p-0.5 ${
                user.speaking
                  ? "ring-2 ring-green-500 ring-offset-2 ring-offset-card"
                  : ""
              }`}
            >
              <Avatar size="lg">
                <AvatarFallback className="text-sm">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center gap-1">
              {user.isHost && <Crown className="size-3 text-yellow-500" />}
              <span className="text-xs text-muted-foreground">{user.name}</span>
              {user.muted && <MicOff className="size-3 text-destructive" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
