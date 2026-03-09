import { useState } from "react";
import { Mic, Volume2, Keyboard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [inputVolume, setInputVolume] = useState([80]);
  const [outputVolume, setOutputVolume] = useState([100]);
  const [soundboardVolume, setSoundboardVolume] = useState([70]);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [pushToTalk, setPushToTalk] = useState(false);
  const [globalKeybinds, setGlobalKeybinds] = useState(true);
  const [playInChannel, setPlayInChannel] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your audio, keybinds, and preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="audio" className="mt-2">
          <TabsList>
            <TabsTrigger value="audio">
              <Mic className="size-3.5" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="soundboard">
              <Volume2 className="size-3.5" />
              Soundboard
            </TabsTrigger>
            <TabsTrigger value="keybinds">
              <Keyboard className="size-3.5" />
              Keybinds
            </TabsTrigger>
          </TabsList>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-1">
            <SettingRow label="Input Device">
              <select className="h-7 rounded-md border bg-muted/50 px-2 text-xs outline-none">
                <option>Default Microphone</option>
                <option>USB Microphone</option>
              </select>
            </SettingRow>
            <Separator />
            <SettingRow label="Input Volume">
              <div className="w-32">
                <Slider
                  value={inputVolume}
                  onValueChange={(v) =>
                    setInputVolume(Array.isArray(v) ? [...v] : [v])
                  }
                  max={100}
                />
              </div>
            </SettingRow>
            <Separator />
            <SettingRow label="Output Device">
              <select className="h-7 rounded-md border bg-muted/50 px-2 text-xs outline-none">
                <option>Default Speakers</option>
                <option>Headphones</option>
              </select>
            </SettingRow>
            <Separator />
            <SettingRow label="Output Volume">
              <div className="w-32">
                <Slider
                  value={outputVolume}
                  onValueChange={(v) =>
                    setOutputVolume(Array.isArray(v) ? [...v] : [v])
                  }
                  max={100}
                />
              </div>
            </SettingRow>
            <Separator />
            <SettingRow
              label="Noise Suppression"
              description="Reduce background noise"
            >
              <ToggleSwitch
                checked={noiseSuppression}
                onChange={setNoiseSuppression}
              />
            </SettingRow>
            <Separator />
            <SettingRow
              label="Push to Talk"
              description="Hold a key to transmit"
            >
              <ToggleSwitch checked={pushToTalk} onChange={setPushToTalk} />
            </SettingRow>
            {pushToTalk && (
              <div className="pb-2 pl-1">
                <Button variant="outline" size="sm" className="text-xs">
                  <Keyboard className="size-3" />
                  Set Keybind
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Soundboard Settings */}
          <TabsContent value="soundboard" className="space-y-1">
            <SettingRow
              label="Soundboard Volume"
              description="Volume of sound effects"
            >
              <div className="w-32">
                <Slider
                  value={soundboardVolume}
                  onValueChange={(v) =>
                    setSoundboardVolume(Array.isArray(v) ? [...v] : [v])
                  }
                  max={100}
                />
              </div>
            </SettingRow>
            <Separator />
            <SettingRow
              label="Play in Voice Channel"
              description="Others can hear your sounds"
            >
              <ToggleSwitch
                checked={playInChannel}
                onChange={setPlayInChannel}
              />
            </SettingRow>
            <Separator />
            <SettingRow
              label="Sound Files"
              description="Manage your uploaded sounds"
            >
              <Button variant="outline" size="sm" className="text-xs">
                Manage
              </Button>
            </SettingRow>
          </TabsContent>

          {/* Keybinds Settings */}
          <TabsContent value="keybinds" className="space-y-1">
            <SettingRow
              label="Global Keybinds"
              description="Keybinds work even when app is not focused"
            >
              <ToggleSwitch
                checked={globalKeybinds}
                onChange={setGlobalKeybinds}
              />
            </SettingRow>
            <Separator />

            <div className="py-2">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Sound Keybinds
              </p>
              <div className="space-y-1.5">
                {[
                  { sound: "Air Horn", key: "F1" },
                  { sound: "Sad Trombone", key: "F2" },
                  { sound: "Drum Roll", key: "F3" },
                  { sound: "Rimshot", key: "F4" },
                  { sound: "Vine Boom", key: "F5" },
                  { sound: "Bonk", key: "F6" },
                ].map((bind) => (
                  <div
                    key={bind.sound}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                  >
                    <span className="text-xs">{bind.sound}</span>
                    <Button
                      variant="outline"
                      size="xs"
                      className="font-mono text-[10px]"
                    >
                      {bind.key}
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full text-xs"
              >
                <Keyboard className="size-3" />
                Add Keybind
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
