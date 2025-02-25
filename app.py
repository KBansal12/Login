from flask import Flask, render_template, request
import gspread
from google.oauth2.service_account import Credentials
import pandas as pd
import json
import os


app = Flask(__name__)

# Google Sheets API Setup
scope = ["https://spreadsheets.google.com/feeds", 
         "https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive.file", 
         "https://www.googleapis.com/auth/drive"]

# Load credentials from environment variable
creds_json = os.getenv("GOOGLE_CREDENTIALS")  # Read JSON from env variable

if not creds_json:
    raise ValueError("Missing GOOGLE_CREDENTIALS environment variable!")

creds_dict = json.loads(creds_json)  # Convert string to dictionary
creds = Credentials.from_service_account_info(creds_dict, scopes=scope)
client = gspread.authorize(creds)
sheet = client.open("SignUp").sheet1  # Open your Google Sheet

# Route for Signup Page
@app.route('/')
def signup_page():
    return render_template('login_page.html')

# Handle Signup
@app.route('/SignUp', methods=['POST'])
def signup():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    password = request.form['password']

    # Read existing data from Google Sheets
    data = sheet.get_all_records()
    df = pd.DataFrame(data)

    # Check if email exists
    if not df.empty and email in df["email"].values:
        return "Email already registered. Try another."

    # Save new user to Google Sheets
    new_user = [first_name, last_name, email, password]
    
    print(df.head())  # Check what’s inside the DataFrame
    print("Appending new user:", new_user)
    sheet.append_row(new_user)
    return "Signup Successful! You can now log in."

@app.route('/oauth2callback')
def oauth2callback():
    return render_template("index.html")  # Redirects to a new page after login


if __name__ == '__main__':
    port = int(os.getenv("PORT", 10000))  # Default to port 10000 if not set
    app.run(host='0.0.0.0', port=port, debug=True)
    
   
