export interface TestimonialsHeader {
  eyebrow?: string | null;
  heading?: string | null;
  body?: string | null;
}

export const DEFAULT_TESTIMONIALS_HEADER: TestimonialsHeader = {
  eyebrow: "What clients say",
  heading: "Honest feedback\nfrom valued people.",
  body: "Real feedback from leaders who trusted Wonka to turn AI ambition into a concrete plan their teams could act on.",
};
