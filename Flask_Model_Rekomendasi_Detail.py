from flask import Flask, request, make_response
import pandas as pd
import mysql.connector
import os


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

app = Flask(__name__)
@app.route("/")
def loadPage():
  return ("THIS IS SPARTA")

db_connection = mysql.connector.connect(
    host="34.101.229.141" or os.environ['DB_HOST'],
    user="admin" or os.environ['DB_USER'],
    password="admin123" or os.environ['DB_PASS'],
    database="tripgenius" or os.environ['DB_NAME']
)

if db_connection.is_connected():
    print("Berhasil terhubung ke database MySQL")
else:
    print("Gagal terhubung ke database MySQL")

cursor = db_connection.cursor()

query1 = "SELECT id as 'place_id', city, category, rating, place_name FROM tempat_wisata"
cursor.execute(query1)
result1 = cursor.fetchall()

query2 = "SELECT * FROM user_new"
cursor.execute(query2)
result2 = cursor.fetchall()

cursor.execute("SELECT * FROM tourism_rating")
result3 = cursor.fetchall()

# cursor.fetchall()

rating = pd.DataFrame(result3, columns=['user_id', 'place_id','place_ratings'])
place = pd.DataFrame(result1, columns=['place_id', 'city','category','rating','place_name'])
user = pd.DataFrame(result2, columns=['user_id', 'location','age'])

place = place[place['city']=='Bandung']

@app.route('/simmilar', methods=['GET'])
def simmilar_pred():
    # new_place = place.copy()
    
    CountV = CountVectorizer()
    CountV.fit(place['category'])
    CountV_matrix = CountV.transform(place['category'])
    CountV_df = pd.DataFrame(
        CountV_matrix.todense(),
        columns=list(CountV.vocabulary_.keys()),
        index=place.place_name
    )
    cosine_sim = cosine_similarity(CountV_matrix)
    cosine_sim_df = pd.DataFrame(cosine_sim, index=place['place_name'], columns=place['place_name'])

    def simmilar_place_recommendations(place_input, csim=cosine_sim_df, param=place[['place_id', 'place_name', 'category']], k=5):
        index = csim.loc[:, place_input].values.argpartition(range(-1, -k, -1))
        res = csim.columns[index[-1:-(k+2):-1]].tolist()
        if place_input in res:
            res.remove(place_input)
        result = param['place_name'].isin(res)
        result = param[result].head(2)
        return result['place_id'].values

    place_id = request.args.get('place_id')
    place_id = int(place_id)
    # recommendation = place.loc[place['place_id'] == place_id, 'place_name'].iloc[0]
    query2 = "SELECT place_name FROM tempat_wisata WHERE id = {}".format(place_id)
    cursor.execute(query2)
    result = cursor.fetchone()
    # return simmilar_place_recommendations(result[0])
    suggest = simmilar_place_recommendations(result[0])
    suggest1 = str(suggest[0])
    suggest2 = str(suggest[1])
    suggest = '{}'
    data= json.loads(suggest)
    data[0] = suggest1
    data[1] = suggest2
    jsonString = json.dumps(data)
    response = make_response(jsonString)
    response.headers['Content-Type'] = 'application/json'

    return response

app.run(debug=True, use_reloader=False)