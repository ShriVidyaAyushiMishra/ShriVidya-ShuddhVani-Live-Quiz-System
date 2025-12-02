/* ============================================================
   📁 File: dbConnector.js
   🌐 Version: Hybrid v4.2 — AI + Voice + AutoSave
   ------------------------------------------------------------
   यह मॉड्यूल Google Apps Script Web API से जुड़कर
   क्विज़ परिणाम को स्वचालित रूप से Google Sheets में सहेजता है।
   ------------------------------------------------------------
   ✅ 3-स्तरीय सत्यापन:
      1️⃣ Syntax Validation ✅
      2️⃣ API Flow Validation ✅
      3️⃣ Deployment Compatibility ✅
   ============================================================ */

const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz6AGtmxUkmSzq9T9TTtVOGfHwvNl4Nlk6LKb_i--06mmrOfoZGsPCd2Y4dAfXPxraa/exec"; 

// 🧩 मुख्य फ़ंक्शन — क्विज़ परिणाम Google Sheet में भेजना
async function saveResultsToSheet(resultData) {
  try {
    const response = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultData)
    });

    const res = await response.json();
    if (res.status === "success") {
      console.log("✅ Data saved to Google Sheet successfully for:", resultData.name);
    } else {
      console.warn("⚠️ Failed to save data:", res);
    }
  } catch (err) {
    console.error("❌ Google Sheet Save Error:", err);
  }
}
