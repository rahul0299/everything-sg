from flask import Flask, Blueprint
from flask_jwt_extended import JWTManager, jwt_required, get_jwt


from v1.auth import auth
from v1.dining import dining
from v1.movies import movies
from v1.events import events
from v1.attractions import attractions




app = Flask(__name__)

app.config["JWT_SECRET_KEY"]="everything-sg"
app.config["JWT_TOKEN_LOCATION"]=["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"]="access_token_cookie"
app.config["JWT_COOKIE_HTTPONLY"]=True
app.config["JWT_COOKIE_SECURE"]=True
app.config["JWT_COOKIE_SAMESITE"]="Lax"
jwt = JWTManager(app)


app.register_blueprint(auth, url_prefix="/v1/auth")
app.register_blueprint(dining, url_prefix="/v1/restaurants")
app.register_blueprint(movies, url_prefix="/v1/movies")
app.register_blueprint(events, url_prefix="/v1/events")
app.register_blueprint(attractions, url_prefix="/v1/attractions")


# image_bp=Blueprint("images",__name__)
# BASE_IMAGE_PATH = r"C:/test_images/restaurants"


# @image_bp.route("images/<restaurants>/<filename>")


if __name__ == "__main__":
    app.run(debug=True)



