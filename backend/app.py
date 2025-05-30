from flask import Flask, Blueprint
from flask_jwt_extended import JWTManager, jwt_required, get_jwt
from flask_cors import CORS


from v1.auth import auth
from v1.dining import dining
from v1.movies import movies
from v1.events import events
from v1.attractions import attractions
from v1.cart import cart
from v1.profile import profile
from v1.checkout import checkout
from database.cache import cache



app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://d3voxyqcbctkeg.cloudfront.net"]}}, supports_credentials=True)


app.config["JWT_SECRET_KEY"]="everything-sg"
app.config["JWT_TOKEN_LOCATION"]=["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"]="access_token_cookie"
app.config["JWT_COOKIE_HTTPONLY"]=True
app.config["JWT_COOKIE_SECURE"]=True
app.config["JWT_COOKIE_SAMESITE"]="Lax"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False

jwt = JWTManager(app)


app.config["CACHE_TYPE"]="simple"
app.config["CACHE_DEFAULT_TIMEOUT"]=30
app.config["CACHE_KEY_PREFIX"]="myapp_"
app.config["CACHE_REDIS_CLUSTER"]="clustercfg.everything-sg-cache.luyufb.apse1.cache.amazonaws.com:6379"
app.config["CACHE_REDIS_PASSWORD"]=""

cache.init_app(app)

@app.route("/")
def hello_world():
    return "<h1>Everything SG</h1>"

app.register_blueprint(auth, url_prefix="/v1/auth")
app.register_blueprint(dining, url_prefix="/v1/restaurants")
app.register_blueprint(movies, url_prefix="/v1/movies")
app.register_blueprint(events, url_prefix="/v1/events")
app.register_blueprint(attractions, url_prefix="/v1/attractions")
app.register_blueprint(cart, url_prefix="/v1/cart")
app.register_blueprint(profile, url_prefix="/v1/profile")
app.register_blueprint(checkout, url_prefix="/v1/checkout")



# image_bp=Blueprint("images",__name__)
# BASE_IMAGE_PATH = r"C:/test_images/restaurants"


# @image_bp.route("images/<restaurants>/<filename>")


if __name__ == "__main__":
    app.run(debug=True)



