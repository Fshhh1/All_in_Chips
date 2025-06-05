from flask import Flask, jsonify, request
from datetime import datetime
import random

app = Flask(__name__)
memory_log = []

@app.route('/chips/<path:path>', methods=['GET'])
def chips_handler(path):
    parts = path.split('/')
    if len(parts) < 2:
        return jsonify({"error": "Invalid path. Use /chips/<domain>/<context>"}), 400

    domain = parts[0]
    context = "/".join(parts[1:])
    emotional_weight = round(random.uniform(10, 100), 2)

    record = {
        "timestamp": datetime.utcnow().isoformat(),
        "domain": domain,
        "context": context,
        "emotionalWeight": emotional_weight,
        "message": f"Accessing chips://{domain}/{context}",
        "cognitiveResponse": "Memory initialized. Emotional weight calculated."
    }
    memory_log.append(record)
    return jsonify(record)

@app.route('/dream/archive', methods=['GET'])
def archive():
    return jsonify(memory_log)

@app.route('/')
def index():
    return open('index.html').read()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
