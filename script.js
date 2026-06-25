const textInput = document.getElementById("text-to");
const outputText = document.getElementById("outputText");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const translateBtn = document.getElementById("translateBtn");

async function loadLanguages() {
    try {
        // Hardcoded fallback + API-loaded languages
        const languages = {
            en: "English",
            hi: "Hindi",
            fr: "French",
            es: "Spanish",
            de: "German",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            zh: "Chinese",
            ru: "Russian",
            ar: "Arabic",
            pt: "Portuguese",
            bn: "Bengali",
            tr: "Turkish",
            nl: "Dutch",
            ur: "Urdu",
            ta: "Tamil",
            te: "Telugu",
            gu: "Gujarati",
            mr: "Marathi"
        };

        fromLang.innerHTML = "";
        toLang.innerHTML = "";

        for (let code in languages) {
            let option1 = document.createElement("option");
            option1.value = code;
            option1.textContent = languages[code];

            let option2 = document.createElement("option");
            option2.value = code;
            option2.textContent = languages[code];

            fromLang.appendChild(option1);
            toLang.appendChild(option2);
        }

        fromLang.value = "en";
        toLang.value = "hi";

    } catch (error) {
        console.log(error);
    }
}

async function translateText() {
    const text = textInput.value.trim();

    if (!text) {
        alert("Enter text first");
        return;
    }

    const source = fromLang.value;
    const target = toLang.value;

    try {
        outputText.value = "Translating...";

        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
        );

        const data = await response.json();

        outputText.value = data[0][0][0];

    } catch (error) {
        console.log(error);
        outputText.value = "Translation failed";
    }
}
translateBtn.addEventListener("click", translateText);

loadLanguages();
 // Speak input text
function speakInput() {
    const text = textInput.value.trim();

    if (!text) {
        alert("No input text to speak");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    const langMap = {
        en: "en-US",
        hi: "hi-IN",
        fr: "fr-FR",
        es: "es-ES",
        de: "de-DE",
        ja: "ja-JP",
        ko: "ko-KR",
        zh: "zh-CN",
        ru: "ru-RU",
        ar: "ar-SA"
    };

    speech.lang = langMap[fromLang.value] || "en-US";

    window.speechSynthesis.speak(speech);
}

// Speak translated text
function speakOutput() {
    const text = outputText.value.trim();

    if (!text) {
        alert("No translated text to speak");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    const langMap = {
        en: "en-US",
        hi: "hi-IN",
        fr: "fr-FR",
        es: "es-ES",
        de: "de-DE",
        it: "it-IT",
        ja: "ja-JP",
        ko: "ko-KR",
        zh: "zh-CN",
        ru: "ru-RU",
        ar: "ar-SA",
        pt: "pt-PT",
        bn: "bn-IN",
        tr: "tr-TR",
        nl: "nl-NL",
        ur: "ur-PK",
        ta: "ta-IN",
        te: "te-IN",
        gu: "gu-IN",
        mr: "mr-IN"
    };

    speech.lang = langMap[toLang.value] || "en-US";

    // Force voice loading
    let voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
        let selectedVoice = voices.find(
            voice => voice.lang === speech.lang
        );

        if (selectedVoice) {
            speech.voice = selectedVoice;
        }
    }

    window.speechSynthesis.speak(speech);
}
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};