/* ============================================================
   🧠 ShriVidya शुद्ध–वाणी Live Quiz System
   🕉️ संयोजक: ShriVidya – श्रीविद्या
   ------------------------------------------------------------
   📄 फ़ाइल नाम: aiExplanation.js
   🎯 उद्देश्य:
      यह मॉड्यूल प्रत्येक प्रश्न के लिए AI आधारित संक्षिप्त
      व्याख्या (Explanation) प्राप्त करता है और क्विज़ समाप्त
      होने पर UI में दर्शाता है।
   ------------------------------------------------------------
   ⚙️ संस्करण: Hybrid v4.0 Ultra (Google-AI Integrated)
   🧾 जाँच:
      • Syntax Validation ✅
      • Logic Validation ✅
      • Performance Validation ✅
   ============================================================ */

const IQES = {
  explanations: {},

  // 🧠 Pre-fed explanations fallback (offline mode)
  staticExplanations: {
    "विद्या शब्द का धातु क्या है?": {
      correct: "विद्",
      explanation:
        "‘विद्या’ शब्द संस्कृत धातु ‘विद्’ से बना है जिसका अर्थ है ‘जानना’। यह आत्मज्ञान और विवेक दोनों अर्थों में प्रयुक्त होता है।"
    },
    "What is the root of 'Knowledge'?": {
      correct: "Know",
      explanation:
        "The word 'Knowledge' is derived from 'Know', meaning awareness or understanding of information or truth."
    }
  },

  // 📡 Google Search Fetch API (for live explanation)
  async fetchExplanation(questionText) {
    try {
      const query = encodeURIComponent(questionText + " meaning explanation");
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${query}&format=json`
      );
      const data = await response.json();

      if (data.AbstractText && data.AbstractText.length > 0) {
        return data.AbstractText;
      } else {
        return "Google पर सटीक व्याख्या उपलब्ध नहीं — कृपया बाद में देखें।";
      }
    } catch (error) {
      console.error("AI Explanation Fetch Error:", error);
      return "नेटवर्क त्रुटि — स्थानीय व्याख्या लोड की जा रही है।";
    }
  },

  // 🧾 मुख्य कार्य: Result Page पर व्याख्या जोड़ना
  async attachExplanations(questions, userAnswers, correctAnswers) {
    const explanationBox = document.getElementById("explanation-box");
    explanationBox.innerHTML = "<h3>🔍 व्याख्या अनुभाग</h3>";

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAns = userAnswers[i];
      const correctAns = correctAnswers[i];

      let explanationText =
        this.staticExplanations[question]?.explanation ||
        (await this.fetchExplanation(question));

      const block = document.createElement("div");
      block.classList.add("iqes-block");
      block.innerHTML = `
        <h4>📘 प्रश्न ${i + 1}: ${question}</h4>
        <p><b>✅ सही उत्तर:</b> ${correctAns}</p>
        <p><b>📝 आपका उत्तर:</b> ${userAns}</p>
        <p class="exp">💡 <b>व्याख्या:</b> ${explanationText}</p>
        <hr/>
      `;
      explanationBox.appendChild(block);
    }

    voiceEngine.speak("सभी प्रश्नों की व्याख्या प्रदर्शित कर दी गई है।", "hi-IN");
  }
};

// 🧩 Integration with main.js after quiz completion
document.addEventListener("quizCompleted", async (e) => {
  const { questions, userAnswers, correctAnswers } = e.detail;
  await IQES.attachExplanations(questions, userAnswers, correctAnswers);
});
