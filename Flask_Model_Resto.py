from flask import Flask, request, make_response
import pandas as pd
import numpy as np
import os

# Untuk pemodelan
import tensorflow as tf
from tensorflow import keras
# !pip install tensorflow.keras
from tensorflow.keras import layers

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

query1 = "SELECT id as 'resto_id', category FROM restaurant"
cursor.execute(query1)
result1 = cursor.fetchall()


query2 = "SELECT * FROM user_new"
cursor.execute(query2)
result2 = cursor.fetchall()


cursor.execute("SELECT * FROM resto_rating")
result3 = cursor.fetchall()


rating = pd.DataFrame(result3, columns=['user_id', 'resto_id','place_ratings'])
place = pd.DataFrame(result1, columns=['resto_id', 'category'])
user = pd.DataFrame(result2, columns=['user_id', 'location','age'])

rating = pd.merge(rating, place[['resto_id','category']], how='right', on='resto_id')

user = pd.merge(user, rating[['user_id']], how='right', on='user_id').drop_duplicates().sort_values('user_id')

new = pd.merge(user[['user_id','age']], rating, how='right', on='user_id').drop_duplicates().sort_values('user_id')

df = new.copy()

def dict_encoder(col, data=df):

  # Mengubah kolom suatu dataframe menjadi list tanpa nilai yang sama
  unique_val = data[col].unique().tolist()

  # Melakukan encoding value kolom suatu dataframe ke angka
  val_to_val_encoded = {x: i for i, x in enumerate(unique_val)}

  # Melakukan proses encoding angka ke value dari kolom suatu dataframe
  val_encoded_to_val = {i: x for i, x in enumerate(unique_val)}
  return val_to_val_encoded, val_encoded_to_val

# Encoding User_Id
user_to_user_encoded, user_encoded_to_user = dict_encoder('user_id')

# Mapping User_Id ke dataframe
df['user'] = df['user_id'].map(user_to_user_encoded)

# Encoding Place_Id
place_to_place_encoded, place_encoded_to_place = dict_encoder('resto_id')

# Mapping Place_Id ke dataframe place
df['resto'] = df['resto_id'].map(place_to_place_encoded)

# Encoding category
category_to_category_encoded, category_encoded_to_category = dict_encoder('category')

# Mapping category ke dataframe place
df['category_new'] = df['category'].map(category_to_category_encoded)

# Encoding age
age_to_age_encoded, age_encoded_to_age = dict_encoder('age')

# Mapping age ke dataframe place
df['age_new'] = df['age'].map(age_to_age_encoded)

# Mendapatkan jumlah user, place, ages, category
num_users, num_place, num_ages, num_category = len(user_to_user_encoded), len(place_to_place_encoded), len(age_to_age_encoded), len(category_to_category_encoded)

# Mengacak dataset
df = df.sample(frac=1, random_state=42)

# Membuat variabel x untuk mencocokkan data user dan place menjadi satu value
x = df[['age_new']].values

# Membuat variabel y untuk membuat rating dari hasil
y = df['category_new'].values

# Membagi menjadi 80% data train dan 20% data validasi
train_indices = int(0.8 * df.shape[0])
x_train, x_val, y_train, y_val = (
    x[:train_indices],
    x[train_indices:],
    y[:train_indices],
    y[train_indices:]
)

y_train_encoded = keras.utils.to_categorical(y_train, num_category)
y_val_encoded = keras.utils.to_categorical(y_val, num_category)

# Membuat model
def create_model(num_category):
    model = keras.Sequential()
    model.add(layers.Dense(64, activation='relu', input_shape=(1,)))
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(32, activation='relu'))
    model.add(layers.Dense(32, activation='relu'))
    model.add(layers.Dense(16, activation='relu'))
    model.add(layers.Dense(16, activation='relu'))
    model.add(layers.Dense(num_category, activation='softmax'))  # Ganti num_categories dengan jumlah kategori tempat wisata yang ada
    return model
# Menginisialisasi model
model = create_model(num_category)

# Mengompilasi model
model.compile(optimizer=keras.optimizers.SGD(learning_rate=0.00001, momentum=0.9), loss='categorical_crossentropy', metrics=[tf.keras.metrics.RootMeanSquaredError()])


class myCallback(tf.keras.callbacks.Callback):
  def on_epoch_end(self, epoch, logs={}):
    if(logs.get('val_root_mean_squared_error')<0.25):
      print('Metriks validasi done')
      self.model.stop_training = True

# Memulai training

history = model.fit(
    x = x_train,
    y = y_train_encoded,
    epochs = 100,
    validation_data = (x_val, y_val_encoded),
    callbacks = [myCallback()]
)

@app.route('/predict_resto', methods=['GET'])
def predict_resto():

    # Menyiapkan dataframe
    place_df = place[['resto_id','category']]
    place_df.columns = ['id','category']
    user_age = request.args.get('user_age')
    user_age = int(user_age)

    # Mengambil top 9 recommendation
    category_recomm = model.predict([[user_age]]).flatten()
    print(category_recomm)

    category_recomm2 = np.array(category_recomm)
    category_recomm2.sort()

    i=9
    highest1 = 0
    highest2 = 0
    highest3 = 0
    while i>=0:
      if category_recomm[i]==category_recomm2[9]:
        highest1 = i
      elif category_recomm[i]==category_recomm2[8]:
        highest2 = i
      elif category_recomm[i]==category_recomm2[7]:
        highest3 = i
      i-=1
    print(highest1,highest2,highest3)

    cat_name1 = category_encoded_to_category.get(highest1)
    cat_name2 = category_encoded_to_category.get(highest2)
    cat_name3 = category_encoded_to_category.get(highest3)
    print(cat_name1,cat_name2,cat_name3)


    cat1 = place_df[place_df.category == cat_name1]
    suggest1 = cat1.head(15)
    if len(suggest1)>2:
      suggest1 = suggest1.sample(2)
    else:
      suggest1 = suggest1.sample(len(suggest1))


    cat2 = place_df[place_df.category == cat_name2]
    suggest2 = cat2.head(15)
    if len(suggest2)>2:
      suggest2 = suggest2.sample(2)
    else:
      suggest2 = suggest2.sample(len(suggest2))


    cat3 = place_df[place_df.category == cat_name3]
    suggest3 = cat3.head(15)
    len(suggest3)
    if len(suggest3)>2:
      suggest3 = suggest3.sample(2)
    else:
      suggest3 = suggest3.sample(len(suggest3))



    final_suggestion = []
    for i in range(len(suggest1)):
      final_suggestion.append(suggest1['id'].values[i])

    for i in range(len(suggest2)):
      final_suggestion.append(suggest2['id'].values[i])

    for i in range(len(suggest3)):
      final_suggestion.append(suggest3['id'].values[i])

    
    res = '{}'
    data= json.loads(res)
    for i in range( len(final_suggestion)):
      data[i] = str(final_suggestion[i])
    print(final_suggestion)
    jsonString = json.dumps(data)
    response = make_response(jsonString)
    response.headers['Content-Type'] = 'application/json'
    return response
app.run(debug=True, use_reloader=False)