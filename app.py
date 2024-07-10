from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = '8b575ea21b686245c4705c12c205864e'  # Replace with your OpenWeatherMap API ke

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    city = request.json.get('city')
    if not city:
        return jsonify({'error': 'City name is required'}), 400

    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'City not found'}), 404

    data = response.json()
    weather_data = {
        'city': data['name'],
        'temperature': data['main']['temp'],
        'description': data['weather'][0]['description'],
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind']['speed'],
        'coord': data['coord']
    }
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)