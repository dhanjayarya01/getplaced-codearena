from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# In-memory user database
users = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
        
    if username in users:
        return jsonify({"error": "User already exists"}), 400

    # BUG 1: The password is being stored in plain text!
    # TODO: Use generate_password_hash() to store a secure hash instead
    users[username] = password

    return jsonify({"message": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username not in users:
        return jsonify({"error": "Invalid credentials"}), 401

    # BUG 2: This code assumes the password was stored as a hash. 
    # If you fix the register route, this might work, but it's currently broken!
    stored_hash = users.get(username)
    
    # TODO: Fix this condition to properly verify the password hash
    if stored_hash == password: 
        return jsonify({"message": "Login successful", "token": "fake-jwt-token"}), 200
        
    return jsonify({"error": "Invalid credentials"}), 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
