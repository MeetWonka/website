/** Legacy self-serve signup URL — do not link to this from marketing CTAs. */
export const WONKA_TRIAL_REGISTER_URL = "https://wonka.chat/register";

export const WONKA_TRIAL_REGISTER_PATTERN = /wonka\.chat\/register/i;

export function isWonkaTrialRegisterUrl(href: string | null | undefined): boolean {
  return Boolean(href && WONKA_TRIAL_REGISTER_PATTERN.test(href));
}