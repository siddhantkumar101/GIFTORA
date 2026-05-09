export async function api(path, options = {}) {
  let baseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");
  
  // Ensure /api is present if hitting a remote server directly
  if (baseUrl.startsWith("http") && !baseUrl.endsWith("/api") && !path.startsWith("/api")) {
    baseUrl += "/api";
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${cleanPath}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    credentials: "include", // Required for cookies
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `Server error: ${response.status} ${response.statusText}` }));
    throw new Error(error.message || `Request to ${path} failed`);
  }

  return response.json();
}
