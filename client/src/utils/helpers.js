export function money(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;
}

export function getSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
