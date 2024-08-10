import argon2 from "argon2";

export async function GenerateHash(text: string): Promise<string> {
  return await argon2.hash(text);
}

export async function VerifyHash(
  digest: string,
  password: string
): Promise<boolean> {
  return await argon2.verify(digest, password);
}
