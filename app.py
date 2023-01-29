from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import config
import tweepy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'secret_key'
db = SQLAlchemy(app)

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(50))
    score = db.Column(db.Integer)

#Twitter API
auth = tweepy.OAuthHandler(config.consumer_key, config.consumer_secret)
auth.set_access_token(config.access_token, config.access_token_secret)
api = tweepy.API(auth)
#Twitter client
client = tweepy.Client(bearer_token=config.bearer_token,consumer_key=config.consumer_key,consumer_secret= config.consumer_secret,
                access_token=config.access_token,access_token_secret=config.access_token_secret)

def obtener_tweets():
    query = '#ぼっち・ざ・ろっく -is:retweet'
    public_tweets = client.search_recent_tweets(query, max_results=10)
    pages=[]
    for tweet in public_tweets.data:
        pages.append(tweet.id)
    books = []
    for page in pages:
        specefic_tweet = api.get_status(page,tweet_mode='extended')
        books.append(specefic_tweet)
    post= []
    for book in books:
        if 'media' in book._json['entities'] and book._json['entities']['media'][0]['type'] == 'photo':
            objeto = {
                'name': book._json['user']['name'],
                'user': book._json['user']['screen_name'],
                'text': book._json['full_text'],
                'image': book._json['entities']['media'][0]['media_url'],
                'profile_image': book._json['user']['profile_image_url']
            }
            post.append(objeto)
    return post




tweets = obtener_tweets()

@app.route('/', methods=['GET', 'POST'])
def main():
    lista = Score.query.order_by(Score.score.desc())

    return render_template('home.html', scores=lista, tweets=tweets)

@app.route('/new_game', methods=['GET', 'POST'])
def new_game():
    if request.method == 'POST':
        nickname = request.form['nickname']
        score = request.form['score-value']
        if score != '0':
            new_score = Score(nickname=nickname,score=score)
            db.session.add(new_score)
            db.session.commit()
        return redirect(url_for('main'))
    return redirect(url_for('main'))


if __name__ == '__main__':
    app.run(debug=True)