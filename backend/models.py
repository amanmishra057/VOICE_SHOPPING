import sqlite3
from sqlite3 import Connection
from pathlib import Path

DB_PATH = Path(__file__).parent / 'db.sqlite3'

SCHEMA = '''
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    category TEXT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''

def get_conn() -> Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    cur = conn.cursor()
    cur.executescript(SCHEMA)
    conn.commit()
    conn.close()

def add_item(name, quantity=1, category=None, note=None):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute('INSERT INTO items (name, quantity, category, note) VALUES (?,?,?,?)', (name, quantity, category, note))
    item_id = cur.lastrowid
    cur.execute('INSERT INTO history (name) VALUES (?)', (name,))
    conn.commit()
    cur.execute('SELECT * FROM items WHERE id=?', (item_id,))
    row = cur.fetchone()
    conn.close()
    return dict(row)

def get_all_items():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute('SELECT * FROM items ORDER BY created_at DESC')
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def remove_item(item_id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute('DELETE FROM items WHERE id=?', (item_id,))
    ok = cur.rowcount > 0
    conn.commit()
    conn.close()
    return ok

def update_item(item_id, data: dict):
    fields = []
    values = []
    for k in ('name','quantity','category','note'):
        if k in data:
            fields.append(f"{k}=?")
            values.append(data[k])
    if not fields:
        return None
    values.append(item_id)
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"UPDATE items SET {', '.join(fields)} WHERE id=?", values)
    conn.commit()
    cur.execute('SELECT * FROM items WHERE id=?', (item_id,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def search_items(query):
    q = f"%{query.strip()}%"
    conn = get_conn()
    cur = conn.cursor()
    cur.execute('SELECT * FROM items WHERE name LIKE ? ORDER BY created_at DESC', (q,))
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_suggestions(prefix=''):
    q = f"%{prefix.strip()}%"
    conn = get_conn()
    cur = conn.cursor()
    cur.execute('SELECT name, COUNT(*) as cnt FROM history WHERE name LIKE ? GROUP BY name ORDER BY cnt DESC LIMIT 10', (q,))
    rows = cur.fetchall()
    conn.close()
    return [r['name'] for r in rows]
