// Utility for generating and persisting a device id for idempotency

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .map((v) => v.split("="))
    .find(([k]) => k === name);
  return match ? decodeURIComponent(match[1]) : null;
}

interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

function setCookie(
  name: string,
  value: string,
  opts: CookieOptions = {}
): void {
  if (typeof document === "undefined") return;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${opts.path || "/"}`,
    `Max-Age=${opts.maxAge || 60 * 60 * 24 * 365}`,
  ];
  if (opts.secure) parts.push("Secure");
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`);
  document.cookie = parts.join("; ");
}

/**
 * Gets or creates an app device ID for the given form name
 * Uses synchronous ID generation to avoid Promise issues
 */
export function getAppDeviceId(formName: string): string | null {
  if (typeof document === "undefined") return null;

  let appDeviceId = getCookie(formName);
  if (!appDeviceId) {
    // Generate a unique ID synchronously using timestamp and random values
    appDeviceId = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${Math.random().toString(36).slice(2)}`;

    setCookie(formName, appDeviceId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
  }
  return appDeviceId;
}

/**
 * Read existing id without creating; returns null if missing
 */
export function readAppDeviceId(formName: string): string | null {
  if (typeof document === "undefined") return null;
  return getCookie(formName);
}

/**
 * Delete the device ID cookie for the given form name
 */
export function deleteAppDeviceId(formName: string): void {
  if (typeof document === "undefined") return;
  // Delete cookie by setting Max-Age=0
  document.cookie = `${formName}=; Max-Age=0; Path=/`;
}
