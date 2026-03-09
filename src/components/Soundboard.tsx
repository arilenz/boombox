import { useState } from "react";
import {
  Play,
  Plus,
  Search,
  Volume2,
  Star,
  Keyboard,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Sound {
  id: string;
  name: string;
  emoji: string;
  keybind?: string;
  favorite?: boolean;
  duration: string;
}

const MOCK_SOUNDS: Sound[] = [
  { id: "1", name: "Air Horn", emoji: "📯", keybind: "F1", duration: "1.2s" },
  {
    id: "2",
    name: "Sad Trombone",
    emoji: "🎺",
    keybind: "F2",
    favorite: true,
    duration: "2.1s",
  },
  {
    id: "3",
    name: "Drum Roll",
    emoji: "🥁",
    keybind: "F3",
    duration: "3.0s",
  },
  { id: "4", name: "Rimshot", emoji: "🪘", keybind: "F4", duration: "0.8s" },
  {
    id: "5",
    name: "Fart",
    emoji: "💨",
    favorite: true,
    duration: "0.5s",
  },
  { id: "6", name: "Bruh", emoji: "😐", duration: "0.7s" },
  {
    id: "7",
    name: "Vine Boom",
    emoji: "💥",
    keybind: "F5",
    favorite: true,
    duration: "1.0s",
  },
  { id: "8", name: "MLG Horn", emoji: "🔊", duration: "2.5s" },
  { id: "9", name: "Oof", emoji: "😵", duration: "0.4s" },
  { id: "10", name: "Bonk", emoji: "🔨", keybind: "F6", duration: "0.6s" },
  { id: "11", name: "Wow", emoji: "😮", duration: "1.1s" },
  { id: "12", name: "Applause", emoji: "👏", duration: "3.5s" },
  { id: "13", name: "Cricket", emoji: "🦗", duration: "2.0s" },
  { id: "14", name: "Evil Laugh", emoji: "😈", duration: "2.8s" },
  { id: "15", name: "Record Scratch", emoji: "💿", duration: "1.3s" },
  { id: "16", name: "Windows Error", emoji: "🪟", duration: "0.9s" },
];

function SoundCard({
  sound,
  onPlay,
}: {
  sound: Sound;
  onPlay: (id: string) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay(sound.id);
    setTimeout(() => setIsPlaying(false), 300);
  };

  return (
    <button
      onClick={handlePlay}
      className={`group relative flex flex-col items-center justify-center gap-1.5 rounded-xl border bg-card p-3 transition-all hover:bg-accent hover:shadow-md active:scale-95 ${
        isPlaying ? "ring-2 ring-primary" : ""
      }`}
    >
      <span className="text-2xl">{sound.emoji}</span>
      <span className="text-xs font-medium leading-tight text-center">
        {sound.name}
      </span>
      <span className="text-[10px] text-muted-foreground">
        {sound.duration}
      </span>

      {/* Keybind badge */}
      {sound.keybind && (
        <span className="absolute top-1.5 right-1.5 rounded bg-muted px-1 py-0.5 text-[9px] font-mono text-muted-foreground">
          {sound.keybind}
        </span>
      )}

      {/* Favorite indicator */}
      {sound.favorite && (
        <Star className="absolute top-1.5 left-1.5 size-2.5 fill-yellow-500 text-yellow-500" />
      )}

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100">
        <Play className="size-5 fill-primary text-primary" />
      </div>
    </button>
  );
}

export function Soundboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSounds = MOCK_SOUNDS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const favoriteSounds = filteredSounds.filter((s) => s.favorite);

  const handlePlay = (id: string) => {
    // TODO: play sound
    console.log("Playing sound:", id);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-base font-semibold">Soundboard</h2>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline" size="icon-sm" />}
            >
              <Upload className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent>Upload Sound</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline" size="icon-sm" />}
            >
              <Keyboard className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent>Manage Keybinds</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-lg border bg-muted/50 pl-8 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>

      {/* Tabs + Grid */}
      <Tabs defaultValue="all" className="flex-1 overflow-hidden px-4 pt-3">
        <TabsList variant="line">
          <TabsTrigger value="all">
            <Volume2 className="size-3.5" />
            All Sounds
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Star className="size-3.5" />
            Favorites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="overflow-hidden">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 pb-4 pt-1">
              {filteredSounds.map((sound) => (
                <SoundCard key={sound.id} sound={sound} onPlay={handlePlay} />
              ))}
              {/* Add new sound button */}
              <button className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed p-3 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
                <Plus className="size-5" />
                <span className="text-xs">Add Sound</span>
              </button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="favorites" className="overflow-hidden">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 pb-4 pt-1">
              {favoriteSounds.length > 0 ? (
                favoriteSounds.map((sound) => (
                  <SoundCard key={sound.id} sound={sound} onPlay={handlePlay} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
                  No favorite sounds yet. Star a sound to add it here.
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
