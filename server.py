# server.py
from flask import Flask, request, jsonify

app = Flask(__name__)

# Pregunta dinámica
pregunta_actual = "¿Tienes antecedentes de enfermedades crónicas?"

@app.route("/pregunta", methods=["GET"])
def get_pregunta():
    return jsonify({"pregunta": pregunta_actual})

@app.route("/respuesta", methods=["POST"])
def post_respuesta():
    data = request.json
    print("Respuesta recibida:", data)
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(port=5000)

