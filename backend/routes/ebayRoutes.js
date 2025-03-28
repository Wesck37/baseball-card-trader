require("dotenv").config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const EbayAuthToken = require("ebay-oauth-nodejs-client");

// const EBAY_API_URL = 'https://api.sandbox.ebay.com';
const CLIENT_ID = process.env.EBAY_CLIENT_ID_PROD;
const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET_PROD;

console.log("🔍 CLIENT_ID:", CLIENT_ID);
console.log("🔍 CLIENT_SECRET:", CLIENT_SECRET ? "Loaded ✅" : "❌ MISSING!");


let tokenData = {
  token: null,
  expiresAt: 0
};

router.post('/ebay/token', async (req, res) => {
  console.log(req.body); 

  if (tokenData.token && Date.now() < tokenData.expiresAt) {
    return res.status(200).json({message: "Token still valid."});
  }
  
  try {
    const ebayAuth = new EbayAuthToken({
      clientId: CLIENT_ID, 
      clientSecret: CLIENT_SECRET,
      env: "PRODUCTION"
    });    

    const tokenResponse = await ebayAuth.getApplicationToken("PRODUCTION");

    // console.log (tokenResponse);
    const { access_token: accessToken, expires_in: expiresIn } = JSON.parse (tokenResponse);

    tokenData.token = accessToken;
    tokenData.expiresAt = Date.now() + (expiresIn * 1000);

    // return res.status(201).json({message: "Token Created"});
    return res.status(201).json({
      message: "Token Created",
      token: accessToken,   // ✅ Send token back to frontend
      expiresAt: tokenData.expiresAt
    });
    

  } catch (error) {

    console.log(error);

    return res.status(401).json ({message: "No Token"});
    
  }
});

router.get("/ebay/search", async (req, res) => {
  try {
    console.log("🔍 Incoming eBay search request:", req.query);

    if (!req.query.q || req.query.q.trim() === "") {
      console.log("❌ ERROR: Missing or empty search query");
      return res.status(400).json({ message: "Missing or empty search query" });
    }

    const search = encodeURIComponent(req.query.q);
    console.log("✅ Search param:", search);

    if (!tokenData.token) {
      console.log("❌ ERROR: Missing eBay API token!");
      return res.status(401).json({ message: "Missing eBay API token" });
    }

    const response = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${search}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ SUCCESS: eBay API Response:", response.data);
    return res.status(200).json(response.data.itemSummaries);

  } catch (error) {
    console.error("❌ ERROR: Failed to fetch from eBay:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      message: "Search failed",
      error: error.response?.data || error.message
    });
  }
});



module.exports = router;
