// Date ko notes ke niche iss format mai "Aug 15, 2026" dikhana

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}