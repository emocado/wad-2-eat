import pandas as pd
import numpy as np
import json
from ast import literal_eval
from sklearn.preprocessing import MultiLabelBinarizer

def give_recommendations(liked_restaurants: list) -> object:
    '''
        Returns recommended restaurants based on list of liked restaurants
        Returns json object
    '''
    restaurant_matrix = create_restaurant_matrix()
    user_profile = create_user_profile(liked_restaurants = liked_restaurants, restaurant_matrix = restaurant_matrix)
    weighted_restaurant_matrix = create_weighted_restaurant_matrix(restaurant_matrix = restaurant_matrix, user_profile = user_profile)
    recommendations = recommended_restaurants(weighted_restaurant_matrix=weighted_restaurant_matrix, number_of_recommendations=10).to_json()   
    return recommendations


def create_restaurant_matrix():
    '''
    Returns restaurant matrix as pandas.core.frame.DataFrame
    '''

    data = pd.read_csv("./data/restaurants_singapore_yelp.csv")
    
    # retrieve relevant columns
    features = ['id', 'categories']
    restaurant_matrix = data[features]

    # change categories data type from str -> list
    restaurant_matrix['categories'] = restaurant_matrix['categories'].apply(literal_eval)

    # Perform One-Hot Encoding
    mlb = MultiLabelBinarizer(sparse_output=True)

    restaurant_matrix = restaurant_matrix.join(
                pd.DataFrame.sparse.from_spmatrix(
                    mlb.fit_transform(restaurant_matrix.pop('categories')),
                    index=restaurant_matrix.index,
                    columns=mlb.classes_))

    return restaurant_matrix


def create_user_profile(liked_restaurants: list, restaurant_matrix: object) -> object:
    '''
        Returns User Profile as pandas.core.series.Series object
    '''

    user_matrix = restaurant_matrix.loc[restaurant_matrix['id'].isin(liked_restaurants)]
    user_profile = user_matrix.sum(axis="rows")[1:]

    # converting numpy.int32 -> int
    user_profile = user_profile.apply(lambda x: x.item() if isinstance(x, np.int32) else x)

    # adding weights to each category
    total_score = user_profile.sum()
    user_profile = user_profile.apply(lambda x : x/total_score if isinstance(x, int) else x)
    
    return user_profile


def create_weighted_restaurant_matrix(restaurant_matrix: object, user_profile: object) -> object:
    '''
        Returns weighted restaurant_matrix as pandas.core.frame.DataFrame
    '''

    weighted_restaurant_matrix = restaurant_matrix.copy()
    
    for alias, weight in user_profile.items():
        weighted_restaurant_matrix[alias] = weighted_restaurant_matrix[alias].apply(lambda x : x * user_profile[alias])

    weighted_restaurant_matrix['weighted_average'] = weighted_restaurant_matrix.sum(axis=1)

    return weighted_restaurant_matrix


def recommended_restaurants(weighted_restaurant_matrix: object, number_of_recommendations: int) -> object:
    '''
        Return top 10 recommended restaurants based on user's liked restaurants
    '''

    res = weighted_restaurant_matrix.sort_values("weighted_average", ascending=False)[['id', 'weighted_average']].head(number_of_recommendations)
    return res['id']

    
if __name__ == "__main__":
    liked_restaurants = ['5Z0DVwlOtra6CSx_HWf04Q', 'b-q1UdGaEazAxhCtJeKRKQ', 'M-PobdAR2gJhPyLR_WzMCQ']
    give_recommendations(liked_restaurants)
