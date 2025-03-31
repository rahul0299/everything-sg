from flask import Flask
from flask_jwt_extended import JWTManager, jwt_required, get_jwt


from auth import auth

app = Flask(__name__)

app.config["JWT_SECRET_KEY"]="everything-sg"
jwt = JWTManager(app)


app.register_blueprint(auth, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)



