from flask import Flask, render_template
import json
app = Flask(__name__)
app.debug=True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/eyes')
def eyes():
    data = {}
    with open('data/eyecolors.json') as f:
        raw_data = json.load(f)
        for result in raw_data:
            data[result['eyeColorLabel']] = result['count']
    return render_template('table.html', data=data)

@app.route('/d3_sample')
def d3_sample():
    return render_template('d3_sample.html')

@app.route('/charts')
def charts():
    return render_template('charts.html')


if __name__ == '__main__':
    app.run()