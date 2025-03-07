from flask import Flask, request, jsonify
import openai
import hashlib
import random
import string

app = Flask(__name__)

openai.api_key = "YOUR_OPENAI_API_KEY"

def generate_subscription_key():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=16))

@app.route('/paraphrase', methods=['POST'])
def paraphrase_text():
    data = request.json
    text = data.get('text', '')

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Paraphrase this academically: {text}"}]
    )

    return jsonify({"paraphrased_text": response['choices'][0]['message']['content']})

@app.route('/plagiarism_check', methods=['POST'])
def check_plagiarism():
    data = request.json
    text = data.get('text', '')

    hash_value = hashlib.sha256(text.encode()).hexdigest()
    
    return jsonify({"score": random.randint(0, 100), "hash": hash_value})

if __name__ == '__main__':
    app.run(debug=True)
