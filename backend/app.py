import logging
import os

from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", "5000"))
APP_ENV = os.getenv("APP_ENV", "development")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

logger = logging.getLogger(__name__)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "success",
        "message": "Flask backend is running"
    })


@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json(silent=True) or {}

    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")

    logger.info("Form submitted for email: %s", email)

    return jsonify({
        "status": "success",
        "message": "Form submitted successfully!",
        "data": {
            "name": name,
            "email": email,
            "message": message
        }
    })


if __name__ == "__main__":
    logger.info("Starting Flask backend in %s mode on port %s", APP_ENV, PORT)
    app.run(host="0.0.0.0", port=PORT, debug=False)
