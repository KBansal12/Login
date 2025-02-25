from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Excel file to store users
EXCEL_FILE = "users.xlsx"

# Check if the file exists, if not, create it
if not os.path.exists(EXCEL_FILE):
    df = pd.DataFrame(columns=["Username", "Password"])
    df.to_excel(EXCEL_FILE, index=False)

def load_users():
    """Load user data from Excel."""
    return pd.read_excel(EXCEL_FILE)

def save_users(df):
    """Save user data to Excel."""
    df.to_excel(EXCEL_FILE, index=False)

@app.route('/register', methods=['POST'])   
def register():
    """Register a new user."""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    df = load_users()

    if username in df["Username"].values:
        return jsonify({"message": "User already exists"}), 400

    df = df.append({"Username": username, "Password": password}, ignore_index=True)
    save_users(df)

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    """Authenticate user."""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    df = load_users()

    user = df[(df["Username"] == username) & (df["Password"] == password)]

    if not user.empty:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)

