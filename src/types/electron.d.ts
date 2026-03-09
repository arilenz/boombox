export {};

declare global {
  interface Window {
    electronAPI?: {
      onKeyPressed: (callback: (keycode: number) => void) => void;
    };
  }
}
