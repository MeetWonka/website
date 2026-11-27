interface Window {
  trackingFunctions?: {
    onLoad: (config: { appId: string }) => void;
  };
}
