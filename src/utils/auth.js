
import { jwtVerify } from "jose";

export function getJwtSecret() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("No JWT secret set in the environment variable");
  }

  const encoder = new TextEncoder();

  const secretUint8Array = encoder.encode(String(secret));

  return secretUint8Array;
}

export async function verifyJwtToken(token) {
  const secret = getJwtSecret();
  try {
    const decodedToken = await jwtVerify(
      token,
      secret,
    );
    console.log("token VERİFYYYY")
    return decodedToken;
  } catch (error) {
    console.error(error, "ERRORR");
  }
}
