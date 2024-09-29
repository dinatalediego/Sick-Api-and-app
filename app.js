// app.js
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const userText = userInput.value;

    // Mostrar el texto del usuario en inglés
    chatBox.innerHTML += `<p><strong>Tú (en inglés):</strong> ${userText}</p>`;

    // Petición a la API de traducción
    const response = await fetch('https://tu_api_flask_desplegada.com/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: userText,
            source_lang: 'EN',
            target_lang: 'DE'
        })
    });

    const data = await response.json();
    const translatedText = data.translated_text;

    // Mostrar el texto traducido al alemán
    chatBox.innerHTML += `<p><strong>Tú (en alemán):</strong> ${translatedText}</p>`;

    // Generar respuesta aleatoria del "amigo en alemán"
    const friendResponses = [
        "Das ist interessant!",
        "Ich finde das toll.",
        "Das verstehe ich.",
        "Was denkst du darüber?",
        "Kannst du mehr darüber erzählen?"
    ];
    const randomResponse = friendResponses[Math.floor(Math.random() * friendResponses.length)];
    chatBox.innerHTML += `<p><strong>Amigo (en alemán):</strong> ${randomResponse}</p>`;

    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight; // Desplazar el chat hacia abajo
}
