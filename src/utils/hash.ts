import argon2 from "argon2";

export async function Hash(text: string): Promise<string> {
  return await argon2.hash(text);
}

export async function VerifyHash(
  digest: string,
  hash: string
): Promise<boolean> {
  return await argon2.verify(digest, hash);
}
