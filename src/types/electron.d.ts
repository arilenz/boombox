export {};

declare global {
  interface Window {
    electronAPI?: {
      onPlaySound: (callback: () => void) => void;
    };
  }
}
