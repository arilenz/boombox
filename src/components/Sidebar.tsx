import { useState } from "react";
import { Hash, Volume2, ChevronDown, Plus, Signal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Room {
  id: string;
  name: string;
  users: { id: string; name: string; avatar?: string; muted?: boolean }[];
}

const MOCK_ROOMS: Room[] = [
  {
    id: "1",
    name: "General",
    users: [
      { id: "u1", name: "Alex", muted: false },
      { id: "u2", name: "Jordan", muted: true },
    ],
  },
  {
    id: "2",
    name: "Gaming",
    users: [{ id: "u3", name: "Sam" }],
  },
  {
    id: "3",
    name: "Music",
    users: [],
  },
  {
    id: "4",
    name: "AFK",
    users: [],
  },
];

interface SidebarProps {
  activeRoom: string | null;
  onRoomSelect: (roomId: string) => void;
}

export function Sidebar({ activeRoom, onRoomSelect }: SidebarProps) {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);

  return (
    <div className="flex h-full w-60 flex-col bg-card">
      {/* Server header */}
      <div className="flex h-12 items-center border-b px-4">
        <h2 className="truncate text-sm font-semibold">Boombox</h2>
        <ChevronDown className="ml-auto size-4 text-muted-foreground" />
      </div>

      {/* Room list */}
      <ScrollArea className="flex-1 px-2">
        <div className="py-3">
          <div className="mb-1 flex items-center px-1">
            <ChevronDown className="mr-0.5 size-3 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Voice Rooms
            </span>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="ghost" size="icon-xs" className="ml-auto" />
                }
              >
                <Plus className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="right">Create Room</TooltipContent>
            </Tooltip>
          </div>

          {rooms.map((room) => (
            <div key={room.id}>
              <button
                onClick={() => onRoomSelect(room.id)}
                className={`group flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
                  activeRoom === room.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <Volume2 className="size-4 shrink-0" />
                <span className="truncate">{room.name}</span>
              </button>

              {/* Users in room */}
              {room.users.length > 0 && (
                <div className="ml-5 space-y-0.5 py-0.5">
                  {room.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground"
                    >
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-xs">{user.name}</span>
                      {user.muted && (
                        <span className="ml-auto text-destructive">
                          <svg
                            className="size-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .87-.16 1.71-.46 2.49" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="mx-1" />

        <div className="py-3">
          <div className="mb-1 flex items-center px-1">
            <ChevronDown className="mr-0.5 size-3 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Soundboard
            </span>
          </div>
          <button className="group flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
            <Hash className="size-4 shrink-0" />
            <span className="truncate">My Sounds</span>
          </button>
          <button className="group flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
            <Hash className="size-4 shrink-0" />
            <span className="truncate">Favorites</span>
          </button>
        </div>
      </ScrollArea>

      {/* Connection info - shows when in a room */}
      {activeRoom && (
        <div className="border-t bg-card/80 px-3 py-2">
          <div className="flex items-center gap-2">
            <Signal className="size-4 text-green-500" />
            <div className="flex-1">
              <p className="text-xs font-medium text-green-500">
                Voice Connected
              </p>
              <p className="text-[11px] text-muted-foreground">
                {MOCK_ROOMS.find((r) => r.id === activeRoom)?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
