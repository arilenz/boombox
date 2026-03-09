import { useState } from "react";
import { Mic, MicOff, Headphones, HeadphoneOff, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserControlsProps {
  onSettingsOpen: () => void;
}

export function UserControls({ onSettingsOpen }: UserControlsProps) {
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);

  return (
    <div className="flex items-center gap-1 border-t bg-card/60 px-2 py-1.5">
      {/* User info */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
            Y
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">You</p>
          <p className="truncate text-[10px] text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant={muted ? "destructive" : "ghost"}
                size="icon-xs"
                onClick={() => setMuted(!muted)}
              />
            }
          >
            {muted ? (
              <MicOff className="size-3.5" />
            ) : (
              <Mic className="size-3.5" />
            )}
          </TooltipTrigger>
          <TooltipContent>{muted ? "Unmute" : "Mute"}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant={deafened ? "destructive" : "ghost"}
                size="icon-xs"
                onClick={() => setDeafened(!deafened)}
              />
            }
          >
            {deafened ? (
              <HeadphoneOff className="size-3.5" />
            ) : (
              <Headphones className="size-3.5" />
            )}
          </TooltipTrigger>
          <TooltipContent>{deafened ? "Undeafen" : "Deafen"}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-xs" onClick={onSettingsOpen} />
            }
          >
            <Settings className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
