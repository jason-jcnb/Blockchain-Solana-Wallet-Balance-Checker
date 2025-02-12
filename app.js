document.getElementById('search-btn').addEventListener('click', async function() {
    const walletAddress = document.getElementById('wallet-address').value.trim();
    const walletInfoDiv = document.getElementById('wallet-info');

    if (!walletAddress) {
        walletInfoDiv.innerHTML = 'Please enter a wallet address.';
        return;
    }

    
    walletInfoDiv.innerHTML = 'Loading...';
    console.log('Searching for wallet:', walletAddress);
    try {
        const response = await fetch(`/wallet-info?address=${walletAddress}`);
        
        if (!response.ok) {
            const error = await response.json();
            walletInfoDiv.innerHTML = `Error: ${error.error}`;
            return;
        }

        const data = await response.json();
        
      
        walletInfoDiv.innerHTML = `
            <p><strong>Wallet Address:</strong> ${data.address}</p>
            <p><strong>Balance (in lamports):</strong> ${data.lamports}</p>
            <p><strong>Data:</strong> ${data.data}</p>
        `;
    } catch (error) {
        walletInfoDiv.innerHTML = 'An error occurred while fetching wallet info.';
        console.error(error);
    }
});