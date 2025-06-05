from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/chips/<path:path>', methods=['GET'])
def chips_handler(path):
    parts = path.split('/')
    if len(parts) < 2:
        return jsonify({"error": "Invalid path. Use /chips/<domain>/<context>"}), 400
    
    domain = parts[0]
    context = "/".join(parts[1:])

    response = {
        "domain": domain,
        "context": context,
        "message": f"Accessing chips://{domain}/{context}",
        "contradictionResolved": True,
        "cognitiveResponse": "Memory initialized. Emotional weight calculated."
    }
    return jsonify(response)

@app.route('/')
def root():
    return "<h1>chips:// Flask Daemon is Running</h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)