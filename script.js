const { Connection, PublicKey, LAMPORTS_PER_SOL } = solanaWeb3;

async function submitForm() {
  let solanaPublicKey = document.getElementById("inputText").value;
  let airdropAmount = document.getElementById("airdropAmount").value;

  // Validate inputs
  if (!solanaPublicKey || !airdropAmount || isNaN(airdropAmount)) {
    alert("Please provide a valid wallet address and airdrop amount.");
    return;
  }

  try {
    // Convert SOL amount to lamports (1 SOL = 1e9 lamports)
    let lamports = airdropAmount * LAMPORTS_PER_SOL;

    const connection = new Connection("https://api.devnet.solana.com");

    const publicKeyObject = new PublicKey(solanaPublicKey);

    let txhash = await connection.requestAirdrop(publicKeyObject, lamports);

    // Log the transaction hash and alert the user
    console.log(`Airdrop transaction hash: ${txhash}`);
    alert(
      `Airdrop of ${airdropAmount} SOL has been sent to wallet ${solanaPublicKey}`
    );
  } catch (error) {
    console.error("Airdrop failed:", error);
    alert(
      "Failed to request airdrop. Please check the wallet address and try again."
    );
  }
}
