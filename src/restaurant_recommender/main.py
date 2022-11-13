import group_decision as gd
from flask import Flask, request, Response
from recommender_api import recommended_restaurants as rr

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def home():
    return "Welcome to WAD-2-EAT super secret site!"


@app.route("/recommendations", methods=['POST'])
def get_recommendation():
    
    if request.method == "POST":
        try:
            liked = request.get_json()['liked']
        except:
            return "Bad Request: Invalid Body Request", 404
        
        try:
            resp = rr.give_recommendations(liked)
            return Response(response = resp, status=200, mimetype='application/json')
        except:
            return "Internal Server Error", 500

    return "Method Not Allowed", 405


@app.route("/decision", methods=['POST'])
def get_decision():

    if request.method == "POST":
        try:
            choices = request.get_json()
        except:
            return "Bad Request: Invalid Body Request", 404

        try:
            resp = gd.group_choice(choices)
            return Response(response = resp, status=200, mimetype="application/json")
        except:
            return "Internal Server Error", 500

    return "Method Not Allowed", 405


if __name__ == "__main__":
    app.run(debug=False)