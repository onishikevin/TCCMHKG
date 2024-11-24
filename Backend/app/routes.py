# app/routes.py

from flask import Blueprint, request, jsonify
from .services.query_handler import process_query

# Blueprint para os endpoints
bp = Blueprint('main', __name__)

@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "online"}), 200

@bp.route('/info', methods=['GET'])
def info():
    return jsonify({
        "model": "tcc-multi-hop-question-answering",
        "version": "1.0.0"
    }), 200

@bp.route('/process_query', methods=['POST'])
def handle_query():
    data = request.get_json()
    query = data.get("query")
    if not query:
        return jsonify({"error": "Parâmetro 'query' é obrigatório"}), 400

    result = process_query(query)
    return jsonify(result), 200

@bp.route('/process_bulk', methods=['POST'])
def handle_bulk_query():
    data = request.get_json()
    queries = data.get("queries", [])
    if not queries:
        return jsonify({"error": "Parâmetro 'queries' é obrigatório e deve ser uma lista"}), 400

    results = [process_query(query) for query in queries]
    return jsonify(results), 200

@bp.route('/process_query_first', methods=['POST'])
def handle_query_first():
    data = request.get_json()
    query = data.get("query")
    if not query:
        return jsonify({"error": "Parâmetro 'query' é obrigatório"}), 400

    result = process_query(query)
    print(result)
    first_item = result[0] if result else []
    return jsonify(first_item), 200

@bp.route('/process_query_n', methods=['POST'])
def handle_query_n():
    data = request.get_json()
    query = data.get("query")
    k = data.get("k")
    number_of_hops = data.get("number_of_hops")  

    if not query:
        return jsonify({"error": "Parâmetro 'query' é obrigatório"}), 400
    if k is None:
        return jsonify({"error": "Parâmetro 'n' é obrigatório"}), 400
    if number_of_hops is None:
        return jsonify({"error": "Parâmetro 'number_of_hops' é obrigatório"}), 400

    result = process_query(query,k,number_of_hops)

    result_k = result[:k] if k > 0 else []
    return jsonify(result_k), 200
