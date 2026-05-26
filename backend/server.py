import os, sqlite3, json, uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, send_file
from werkzeug.utils import secure_filename

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'profit.db')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            address TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT NOT NULL,
            svc_name TEXT,
            sub_name TEXT,
            description TEXT,
            image_path TEXT,
            user_name TEXT,
            phone TEXT,
            address TEXT,
            status TEXT DEFAULT 'pending',
            created_at TEXT DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS prices (
            service_id TEXT PRIMARY KEY,
            price TEXT
        );
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data'}), 400
    conn = get_db()
    try:
        conn.execute('INSERT INTO users (full_name, email, phone, password, address) VALUES (?,?,?,?,?)',
                     (data['fullName'], data['email'], data.get('phone',''), data['password'], data.get('address','')))
        conn.commit()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (data['email'],)).fetchone()
        conn.close()
        return jsonify(dict(user)), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'error': 'Email already exists'}), 409

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (data['email'],)).fetchone()
    conn.close()
    if not user:
        return jsonify({'error': 'Email not found'}), 404
    if user['password'] != data['password']:
        return jsonify({'error': 'Wrong password'}), 401
    return jsonify(dict(user))

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db()
    users = conn.execute('SELECT id, full_name, email, phone, address, created_at FROM users ORDER BY id DESC').fetchall()
    conn.close()
    return jsonify([dict(u) for u in users])

@app.route('/api/requests', methods=['GET'])
def get_requests():
    conn = get_db()
    reqs = conn.execute('SELECT * FROM requests ORDER BY id DESC').fetchall()
    conn.close()
    return jsonify([dict(r) for r in reqs])

@app.route('/api/requests', methods=['POST'])
def create_request():
    desc = request.form.get('description', '')
    svc_name = request.form.get('svcName', '')
    sub_name = request.form.get('subName', '')
    user_name = request.form.get('userName', '')
    phone = request.form.get('phone', '')
    address = request.form.get('address', '')
    user_email = request.form.get('userEmail', '')

    image_path = ''
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename:
            ext = file.filename.rsplit('.', 1)[-1] if '.' in file.filename else 'jpg'
            fname = str(uuid.uuid4()) + '.' + ext
            file.save(os.path.join(UPLOAD_DIR, fname))
            image_path = fname

    conn = get_db()
    conn.execute('''INSERT INTO requests
        (user_email, svc_name, sub_name, description, image_path, user_name, phone, address)
        VALUES (?,?,?,?,?,?,?,?)''',
        (user_email, svc_name, sub_name, desc, image_path, user_name, phone, address))
    conn.commit()
    req = conn.execute('SELECT * FROM requests ORDER BY id DESC LIMIT 1').fetchone()
    conn.close()
    return jsonify(dict(req)), 201

@app.route('/api/prices', methods=['GET'])
def get_prices():
    conn = get_db()
    rows = conn.execute('SELECT * FROM prices').fetchall()
    conn.close()
    prices = {r['service_id']: r['price'] for r in rows}
    return jsonify(prices)

@app.route('/api/prices', methods=['POST'])
def save_prices():
    data = request.get_json()
    conn = get_db()
    for sid, price in data.items():
        conn.execute('REPLACE INTO prices (service_id, price) VALUES (?,?)', (str(sid), str(price)))
    conn.commit()
    conn.close()
    return jsonify({'saved': True})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_DIR, filename)

FRONTEND_DIR = os.path.dirname(BASE_DIR)

@app.route('/')
def serve_index():
    return send_file(os.path.join(FRONTEND_DIR, 'index.html'))

@app.route('/admin')
def serve_admin():
    return send_file(os.path.join(FRONTEND_DIR, 'admin.html'))

@app.route('/app.js')
def serve_appjs():
    return send_file(os.path.join(FRONTEND_DIR, 'app.js'))

@app.route('/style.css')
def serve_style():
    return send_file(os.path.join(FRONTEND_DIR, 'style.css'))

@app.route('/home.css')
def serve_home():
    return send_file(os.path.join(FRONTEND_DIR, 'home.css'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
