import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Retrieve secrets from .env file
CLINET_ID = os.getenv('CLIENT_ID')
API_KEY = os.getenv('API_KEY')


def business_search(location: str) -> list:
    ENDPOINT = "https://api.yelp.com/v3/businesses/search"
    HEADERS = {'Authorization' : 'bearer %s' % API_KEY}

    # Define Parameters
    PARAMETERS = {'term': 'food',
                'limit': 50,
                'radius': 2000,
                'location': 'Singapore ' + location}

    # Request to Yelp API
    response = requests.get(url = ENDPOINT,
                            params = PARAMETERS,
                            headers = HEADERS)
    
    # Convert to JSON String
    business_data = response.json()

    try:
        return business_data['businesses']
    except:
        return business_data


def get_business_review(business_id: str) -> list:
    HEADERS = {'Authorization' : 'bearer %s' % API_KEY}

    url = "https://api.yelp.com/v3/businesses/" + business_id + "/reviews" 

    # Getting response
    response = requests.get(url = url, 
                            headers = HEADERS)
    
    review_data = response.json()

    return review_data['reviews']