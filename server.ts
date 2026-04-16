import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // EHR Integration API Routes
  
  // 1. Get OAuth URL for EHR Provider
  app.get("/api/auth/ehr-url", (req, res) => {
    const provider = req.query.provider as string;
    const redirectUri = `${req.protocol}://${req.get("host")}/auth/callback`;

    let authUrl = "";
    let clientId = "";
    let scope = "";

    if (provider === "epic") {
      authUrl = process.env.EPIC_AUTH_URL || "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";
      clientId = process.env.EPIC_CLIENT_ID || "";
      scope = "openid fhirUser patient/*.read patient/*.write";
    } else if (provider === "athena") {
      authUrl = process.env.ATHENA_AUTH_URL || "https://api.athenahealth.com/oauth2/v1/authorize";
      clientId = process.env.ATHENA_CLIENT_ID || "";
      scope = "athena/service/Athenanet.API";
    }

    if (!clientId) {
      return res.status(400).json({ error: `Client ID for ${provider} not configured.` });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scope,
      state: provider, // Use state to identify provider in callback
    });

    res.json({ url: `${authUrl}?${params.toString()}` });
  });

  // 2. OAuth Callback Handler
  app.get("/auth/callback", async (req, res) => {
    const { code, state: provider } = req.query;

    if (!code) {
      return res.status(400).send("Authorization code missing.");
    }

    try {
      // In a real app, you would exchange the code for tokens here
      // const tokenResponse = await axios.post(tokenUrl, params);
      // const { access_token, refresh_token } = tokenResponse.data;
      
      // For this demo, we'll simulate a successful exchange
      console.log(`Exchanging code for ${provider} tokens...`);

      // Send success message to parent window and close popup
      res.send(`
        <html>
          <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f8fafc;">
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <h2 style="color: #1e293b; margin-bottom: 1rem;">Authentication Successful</h2>
              <p style="color: #64748b;">Connecting to ${provider}...</p>
              <script>
                if (window.opener) {
                  window.opener.postMessage({ type: 'EHR_AUTH_SUCCESS', provider: '${provider}' }, '*');
                  setTimeout(() => window.close(), 1000);
                } else {
                  window.location.href = '/integrations';
                }
              </script>
            </div>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("OAuth exchange error:", error);
      res.status(500).send("Failed to exchange authorization code.");
    }
  });

  // 3. EHR Data Sync Endpoints (Mocked for demo)
  app.post("/api/ehr/sync", (req, res) => {
    const { provider, patientId, direction } = req.body;
    
    console.log(`Syncing ${direction} with ${provider} for patient ${patientId}...`);
    
    // Simulate processing time
    setTimeout(() => {
      res.json({ 
        status: "success", 
        message: `Data ${direction === "export" ? "exported to" : "imported from"} ${provider} successfully.` 
      });
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
