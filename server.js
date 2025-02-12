const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const connection = new Connection('https://api.mainnet-beta.solana.com');

app.get('/wallet/balance', async (req, res) => {
    const { walletAddress } = req.query;
    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }
    try {
        const publicKey = new PublicKey(walletAddress);
        const balance = await connection.getBalance(publicKey);
        res.json({ balance: balance / 1e9 }); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to get balance' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});