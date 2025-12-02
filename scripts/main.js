/* ============================================================
   📘 ShriVidya शुद्ध–वाणी Live Quiz System
   🕉️ संयोजक: ShriVidya – श्रीविद्या
   ------------------------------------------------------------
   📄 फ़ाइल नाम: main.js
   🎯 उद्देश्य:
      यह फ़ाइल "ShriVidya शुद्ध–वाणी Live Quiz System" के
      मुख्य लॉजिक इंजन का संचालन करती है — जिसमें प्रश्न लोडिंग,
      उत्तर चयन, स्कोरिंग, परिणाम निर्माण, और व्याख्या मॉड्यूल के
      लिए आधार कोड सम्मिलित है।

      यह Version 3.0 Hybrid Blueprint पर आधारित है।
   ------------------------------------------------------------
   ⚙️ मुख्य कार्य:
      • प्रश्न और विकल्प लोड करना
      • सही/गलत उत्तर पहचानना
      • स्कोरिंग प्रणाली लागू करना (+4 / -1 / +1)
      • परिणाम व्याख्या Placeholder तैयार करना
      • भविष्य में Voice Engine (voiceEngine.js) से लिंक हेतु हुक जोड़ना
   ------------------------------------------------------------
   📅 निर्माण तिथि: दिसंबर 2025
   🧾 संस्करण: 3.0 Hybrid
   ============================================================ */


/* ========== 1️⃣ प्रश्न डेटा (Demo Placeholder) ========== */
// भविष्य में इसे Google Sheets से लोड किया जाएगा
const quizData = [
  {
    question: "‘विद्या’ शब्द का धातु क्या है?",
    options: ["वेद", "विद्", "वद्", "वन्द्"],
    correct: 1,
    explanation:
      "‘विद्या’ शब्द संस्कृत धातु ‘विद्’ से बना है जिसका अर्थ है ‘जानना’। (स्रोत: Wikipedia / Shabdkosh)"
  },
  {
    question: "‘गुरु’ शब्द का अर्थ क्या है?",
    options: [
      "प्रकाशक",
      "जो अंधकार हटाए",
      "जो वेद पढ़ाए",
      "जो शिक्षण करे"
    ],
    correct: 1,
    explanation:
      "‘गुरु’ का अर्थ है जो अज्ञान का अंधकार हटाकर ज्ञान का प्रकाश फैलाए। (स्रोत: संस्कृतकोश)"
  },
  {
    question: "‘ॐ’ किसका प्रतीक है?",
    options: [
      "त्रिदेव",
      "एकत्व",
      "प्रकृति",
      "सृष्टि"
    ],
    correct: 0,
    explanation:
      "‘ॐ’ त्रिदेव (ब्रह्मा, विष्णु, महेश) का प्रतीक है और यह ब्रह्म का मूल नाद माना गया है।"
  }
];


/* ========== 2️⃣ DOM एलिमेंट चयन ========== */
const languageSelector = document.getElementById("language-selector");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const finalScore = document.getElementById("final-score");
const explanationBox = document.getElementById("explanation-box");

/* ========== 3️⃣ प्रारंभिक मान ========== */
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

/* ========== 4️⃣ भाषा चयन लॉजिक ========== */
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    languageSelector.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  });
});

/* ========== 5️⃣ प्रश्न लोड करने का कार्य ========== */
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionText.textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => selectOption(index);
    optionsBox.appendChild(btn);
  });
}

/* ========== 6️⃣ उत्तर चयन लॉजिक ========== */
function selectOption(index) {
  selectedOption = index;
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => btn.disabled = true);

  if (index === quizData[currentQuestion].correct) {
    score += 4;
    allOptions[index].style.backgroundColor = "#4caf50";
  } else {
    score -= 1;
    allOptions[index].style.backgroundColor = "#e53935";
    allOptions[quizData[currentQuestion].correct].style.backgroundColor = "#43a047";
  }
}

/* ========== 7️⃣ अगला प्रश्न बटन ========== */
nextBtn.addEventListener("click", () => {
  if (selectedOption === null) {
    alert("कृपया पहले उत्तर चुनें।");
    return;
  }

  currentQuestion++;
  selectedOption = null;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

/* ========== 8️⃣ परिणाम प्रदर्शित करना ========== */
function showResults() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const totalQuestions = quizData.length;
  finalScore.textContent = `आपका स्कोर: ${score} / ${totalQuestions * 4}`;

  explanationBox.innerHTML = "";
  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("explanation-item");
    div.innerHTML = `
      <h3>प्रश्न ${i + 1}: ${q.question}</h3>
      <p><b>सही उत्तर:</b> ${q.options[q.correct]}</p>
      <p><b>व्याख्या:</b> ${q.explanation}</p>
      <hr/>
    `;
    explanationBox.appendChild(div);
  });
}

/* ========== 9️⃣ पुनः प्रारंभ ========== */
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  selectedOption = null;
  resultContainer.classList.add("hidden");
  languageSelector.classList.remove("hidden");
});

/* ========== 🔟 भविष्य एकीकरण हेतु Voice Hook ========== */
// Voice Engine Module (voiceEngine.js) इस फ़ंक्शन को ओवरराइड कर सकेगा
window.playVoiceForQuestion = function (text) {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1.0;
    window.speechSynthesis.speak(speech);
  }
};

// हर प्रश्न पर स्वचालित वाचन
questionText.addEventListener("DOMSubtreeModified", () => {
  window.playVoiceForQuestion(questionText.textContent);
});
