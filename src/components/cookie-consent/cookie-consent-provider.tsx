"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence } from "motion/react";
import { CookieBanner } from "./cookie-banner";
import { CookiePreferencesModal } from "./cookie-preferences-modal";

const STORAGE_KEY = "wonka:cookie-consent";
const CONSENT_VERSION = 2;

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

export type ConsentChoice = "essential" | "all" | "rejected";

type ConsentRecord = {
  version: number;
  timestamp: string;
  choice: ConsentChoice;
  categories: ConsentCategories;
};

type CookieConsentContextValue = {
  consent: ConsentRecord | null;
  acceptEssentialOnly: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: ConsentCategories) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isPreferencesOpen: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consent: null,
  acceptEssentialOnly: () => {},
  acceptAll: () => {},
  rejectAll: () => {},
  savePreferences: () => {},
  openPreferences: () => {},
  closePreferences: () => {},
  isPreferencesOpen: false,
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export function allowsTracking(consent: ConsentRecord | null): boolean {
  return consent !== null && consent.choice !== "rejected";
}

/** @deprecated Use allowsTracking — essential and accept-all both enable the pixel. */
export function allowsMetaPixel(consent: ConsentRecord | null): boolean {
  return allowsTracking(consent);
}

function deriveChoice(categories: ConsentCategories): ConsentChoice {
  if (categories.analytics && categories.marketing) return "all";
  if (!categories.analytics && !categories.marketing) return "rejected";
  return "essential";
}

function readStored(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord & { choice?: ConsentChoice };
    if (parsed.version === 1) {
      return {
        version: CONSENT_VERSION,
        timestamp: parsed.timestamp,
        choice: deriveChoice(parsed.categories),
        categories: parsed.categories,
      };
    }
    if (parsed.version !== CONSENT_VERSION || !parsed.choice) return null;
    return parsed;
  } catch {
    return null;
  }
}

function pushConsentUpdate(record: ConsentRecord) {
  if (typeof window === "undefined") return;
  const granted = record.choice !== "rejected";
  const consentState = {
    analytics_storage: granted ? ("granted" as const) : ("denied" as const),
    ad_storage: granted ? ("granted" as const) : ("denied" as const),
    ad_user_data: granted ? ("granted" as const) : ("denied" as const),
    ad_personalization: granted ? ("granted" as const) : ("denied" as const),
  };

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", consentState);
  }
  window.dataLayer?.push({ event: "consent_update", ...consentState });
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    // One-shot mount: read persisted consent, push it to GTM, and decide whether
    // the banner needs to appear. Cascading setState here is intentional — there
    // is no external store to subscribe to.
    const stored = readStored();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(stored);
      pushConsentUpdate(stored);
    } else {
      setBannerVisible(true);
    }
  }, []);

  const persist = useCallback((choice: ConsentChoice, categories: ConsentCategories) => {
    const record: ConsentRecord = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      choice,
      categories,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // localStorage may be unavailable; consent still pushed to GTM for this session
    }
    setConsent(record);
    pushConsentUpdate(record);
  }, []);

  const acceptEssentialOnly = useCallback(() => {
    persist("essential", { analytics: false, marketing: false });
    setBannerVisible(false);
    setIsPreferencesOpen(false);
  }, [persist]);

  const acceptAll = useCallback(() => {
    persist("all", { analytics: true, marketing: true });
    setBannerVisible(false);
    setIsPreferencesOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist("rejected", { analytics: false, marketing: false });
    setBannerVisible(false);
    setIsPreferencesOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (categories: ConsentCategories) => {
      persist(deriveChoice(categories), categories);
      setBannerVisible(false);
      setIsPreferencesOpen(false);
    },
    [persist],
  );

  const openPreferences = useCallback(() => setIsPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        acceptEssentialOnly,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
        isPreferencesOpen,
      }}
    >
      {children}
      <AnimatePresence>{bannerVisible && <CookieBanner key="banner" />}</AnimatePresence>
      <AnimatePresence>
        {isPreferencesOpen && <CookiePreferencesModal key="modal" />}
      </AnimatePresence>
    </CookieConsentContext.Provider>
  );
}
