from flask import Flask
from flask_jwt_extended import JWTManager, jwt_required, get_jwt


from v1.auth import auth


app = Flask(__name__)

app.config["JWT_SECRET_KEY"]="everything-sg"
app.config["JWT_TOKEN_LOCATION"]=["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"]="access_token_cookie"
app.config["JWT_COOKIE_HTTPONLY"]=True
app.config["JWT_COOKIE_SECURE"]=True
app.config["JWT_COOKIE_SAMESITE"]="Lax"
jwt = JWTManager(app)


app.register_blueprint(auth, url_prefix="/v1/api")

if __name__ == "__main__":
    app.run(debug=True)



