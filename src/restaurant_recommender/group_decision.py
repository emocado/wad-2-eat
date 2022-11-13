def group_choice(choices: dict) -> str:
    # Returns most liked restaurant with the least number of dislikes.
    # Only applicable in group setting.


    '''
    Sample Input:   {
                        "Maxwell Food Centre": {"index": 1, "likes": [1]},
                        "Holycrab": {"index": 2, "likes": [1]},
                        "Lau Pa Sat": {"index": 4, "likes": [1, 2]},
                        "Jacob's Cafe": {"index": 3, "likes": [2]},
                        "Zhong Guo La Mian Xiao Long Bao": {"index": 8, "likes": [2, 3]},
                        "Three Good Guys": {"index": 9, "likes": [3]},
                        "Tai Hwa Pork Noodle": {"index": 10, "likes": [3]}
                    }
    
    Sample Output:  "Zhong Guo La Mian Xiao Long Bao"
    '''
    return sorted(choices, key=lambda x: (len(choices[x]["likes"]), choices[x]["index"]), reverse=True)[0]

