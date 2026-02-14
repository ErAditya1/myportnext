import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const getSecret = () => process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

const sign = (value) =>
  crypto.createHmac("sha256", getSecret()).update(value).digest("hex");

const buildToken = (payload) => {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
};

const verifyToken = (token) => {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  if (sign(encoded) !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!payload?.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};

export const createAdminSession = async () => {
  const payload = {
    role: "admin",
    exp: Date.now() + MAX_AGE_SECONDS * 1000,
  };
  const token = buildToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
};

export const clearAdminSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
};

export const requireAdminSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = verifyToken(token);
  return Boolean(payload?.role === "admin");
};
