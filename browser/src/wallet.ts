export default async function generateWallet() {
  // Check if SubtleCrypto is available
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("SubtleCrypto is not available in this environment.");
  }

  // Generate a key pair using RSA-PSS
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      modulusLength: 4096,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-256" },
    },
    true,
    ["sign", "verify"]
  );

  // Export the private key in JWK format
  const privateKeyJWK = await crypto.subtle.exportKey(
    "jwk",
    keyPair.privateKey
  );
  const publicKeyJWK = await crypto.subtle.exportKey("jwk", keyPair.publicKey);

  return {
    privateKey: privateKeyJWK,
    publicKey: publicKeyJWK,
  };
}
