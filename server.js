require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());

const CONTRACT_ADDRESS = "0x4Cfc1aad80F89B37C56a0703f8ef0d1D1B4306c2";
const CONTRACT_ABI = require("./ConsentManagerABI.json"); // Load the ABI
const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// Upload Consent Artifact
app.post("/upload-consent", async (req, res) => {
    try {
        const { 
            consentArtifactId, 
            consentCollector, 
            dataPrincipalIDType, 
            dataPrincipalIDNumber, 
            aip, 
            purpose, 
            datasetInfo, 
            frequency, 
            expiry, 
            consentCollectorSignature 
        } = req.body;

        // Ensure all values exist
        if (!consentArtifactId || !consentCollector || !dataPrincipalIDType || !dataPrincipalIDNumber || 
            !aip || !purpose || !datasetInfo || !frequency || !expiry || !consentCollectorSignature) {
            throw new Error("Missing required fields");
        }

        const tx = await contract.uploadConsent(
            consentArtifactId, 
            consentCollector, 
            dataPrincipalIDType, 
            dataPrincipalIDNumber, 
            aip, 
            purpose, 
            datasetInfo, 
            frequency, 
            expiry, 
            consentCollectorSignature
        );

        // Ensure transaction is awaited properly
        const receipt = await tx.wait();

        res.json({ success: true, message: "Consent uploaded successfully", txHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Validate Consent
app.get("/validate-consent/:id", async (req, res) => {
    try {
        const isValid = await contract.validateConsent(req.params.id);
        res.json({ success: true, valid: isValid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Download Consent
app.get("/download-consent/:id", async (req, res) => {
    try {
        const consent = await contract.downloadConsent(req.params.id);
        res.json({
            success: true,
            consent: {
                consentArtifactId: consent[0],
                consentCollector: consent[1],
                dataPrincipalIDType: consent[2],
                dataPrincipalIDNumber: consent[3],
                aip: consent[4],
                purpose: consent[5],
                datasetInfo: consent[6],
                frequency: consent[7],
                expiry: consent[8].toString(),
                createdAt: consent[9].toString(),
                consentCollectorSignature: consent[10],
                active: consent[11]
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Revoke Consent
app.post("/revoke-consent", async (req, res) => {
    try {
        const { id } = req.body;
        const tx = await contract.revokeConsent(id);
        await tx.wait();
        res.json({ success: true, message: "Consent revoked successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Fetch Consent Logs
app.get("/consent-logs", async (req, res) => {
    try {
        console.log("Fetching consent logs...");
        
        const logs = await contract.getConsentLogs();

        const formattedLogs = logs.map(log => ({
            id: log.id,
            action: log.action,
            actor: log.actor,
            timestamp: log.timestamp.toString(),
        }));

        console.log("Formatted Logs:", formattedLogs);
        res.json({ success: true, logs: formattedLogs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ success: false, error: error.reason || error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));