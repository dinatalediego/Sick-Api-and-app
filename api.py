# api.py
!pip install flask
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Configuración de la API de DeepL
DEEPL_API_KEY = '10e6f75b-937a-4e2f-b7eb-1f1121be028d:fx'  # Reemplaza con tu propia API Key de DeepL
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    texto = data.get('text')
    source_lang = data.get('source_lang', 'EN')
    target_lang = data.get('target_lang', 'DE')

    params = {
        'auth_key': DEEPL_API_KEY,
        'text': texto,
        'source_lang': source_lang,
        'target_lang': target_lang
    }

    try:
        response = requests.post(DEEPL_API_URL, data=params)
        response.raise_for_status()
        result = response.json()
        translated_text = result['translations'][0]['text']
        return jsonify({"translated_text": translated_text})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
