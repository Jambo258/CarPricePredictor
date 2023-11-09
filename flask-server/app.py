import json
from flask import Flask, request, jsonify
import pickle
import numpy as np
from pandas import DataFrame
import pandas as pd

app = Flask(__name__)

with open('car-model.pickle', 'rb') as f:
    model = pickle.load(f)

with open('car-ct.pickle', 'rb') as f:
    ct = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:

        data = request.get_json(force=True)
        print("data: ",data)
        df = pd.DataFrame([data])
        print(df)

        transformed_data = ct.transform(df)

        prediction = model.predict(transformed_data)

        print(prediction)
        response = {'price_prediction': prediction[0]}
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)