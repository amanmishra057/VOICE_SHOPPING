from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from models import init_db, get_all_items, add_item, remove_item, update_item, search_items, get_suggestions

app = Flask(__name__)
CORS(app)
init_db()

QUANTITY_RE = re.compile(r"(?P<qty>\d+)\s*(?P<unit>pieces|pcs|bottles|kg|g|liters|l|s)?\s*(of)?\s*(?P<item>.+)", re.I)

@app.route('/api/items', methods=['GET'])
def list_items():
    return jsonify(get_all_items())

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.json or {}
    name = data.get('name')
    qty = data.get('quantity', 1)
    category = data.get('category')
    note = data.get('note')
    item = add_item(name=name, quantity=qty, category=category, note=note)
    return jsonify(item), 201

@app.route('/api/items/<int:item_id>', methods=['PUT'])
def modify_item(item_id):
    data = request.json or {}
    item = update_item(item_id, data)
    if item:
        return jsonify(item)
    return jsonify({'error':'not found'}), 404

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    ok = remove_item(item_id)
    return (jsonify({'deleted':True}) if ok else (jsonify({'error':'not found'}), 404))

@app.route('/api/parse', methods=['POST'])
def parse_voice():
    payload = request.json or {}
    transcript = payload.get('transcript','')
    lang = payload.get('lang','en')

    t = transcript.strip().lower()

    if t.startswith(('add ', 'i need', 'i want', 'buy ', 'please add', "add to my list")) or 'add' in t or 'buy' in t or 'i need' in t:
        m = QUANTITY_RE.search(t)
        if m:
            qty = int(m.group('qty'))
            item_name = m.group('item')
        else:
            item_name = re.sub(r"(add|i need|i want to buy|i want|buy|please add|to my list|to the list)\s*", '', t)
            qty = 1
        item = add_item(name=item_name.strip(), quantity=qty)
        return jsonify({'action':'add','item':item})

    if t.startswith(('remove','delete', 'remove from my list')) or 'remove' in t or 'delete' in t:
        name_candidate = re.sub(r"(remove|delete|remove from my list|delete from my list)\s*", '', t)
        items = search_items(name_candidate)
        if items:
            ok = remove_item(items[0]['id'])
            return jsonify({'action':'remove','item':items[0]})
        return jsonify({'action':'remove','error':'not found'})

    if t.startswith(('find','search','look for','find me')) or 'find' in t or 'search' in t:
        name_candidate = re.sub(r"(find|search|look for|find me)\s*", '', t)
        res = search_items(name_candidate)
        return jsonify({'action':'search','results':res})

    return jsonify({'action':'unknown','text':transcript})

@app.route('/api/suggestions', methods=['GET'])
def suggestions():
    q = request.args.get('q','')
    s = get_suggestions(q)
    return jsonify(s)

if __name__ == '__main__':
    app.run(debug=True)
