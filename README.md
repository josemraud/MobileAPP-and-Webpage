# Localiza

Localiza is a marketplace for real estate and vehicles in Honduras. People can browse, publish, and manage properties and cars from a website or a mobile app. Both clients talk to the same Flask API, which stores data in PostgreSQL.

## Repository layout

| Folder | What it is |
| --- | --- |
| `API` | Flask REST API. Listens on port `8080`. |
| `DB` | PostgreSQL schema script and database diagram. |
| `UI_WEB` | React website (Create React App). Development server uses port `3000`. |
| `UI_MOBILE` | React Native app (Android and iOS), version `0.64`. |

## Requirements

- Python 3.9
- PostgreSQL
- Node.js and npm
- For the Android app: Android Studio, an SDK, and a JDK
- For the iOS app: macOS, Xcode, and CocoaPods

Environment files are not in Git. Create the `.env` files below on your machine. Do not commit them.

## Database

Create an empty PostgreSQL database, then load the schema:

```bash
psql -d localizadb -f DB/ScriptLocalizaDB.sql
```

The script creates `sch_seguridad`, `sch_mantenimientos`, `sch_vehiculos`, `sch_bienes`, and `sch_publicidad`. The diagram is `DB/Diagrama_BD.png`.

## API

From `API`:

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

macOS and Linux:

```bash
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

Create `API/.env` before starting the server. `FLASK_ENV` must be `development` or `production`.

```env
FLASK_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/localizadb
SQLALCHEMY_TRACK_MODIFICATIONS=False
DEBUG=True
TESTING=False
JWT_SECRET_KEY=replace-with-a-long-random-string
MAX_CONTENT_LENGTH=16777216
UPLOAD_EXTENSIONS=['.jpg', '.png', '.pdf', '.jpeg']
UPLOAD_FOLDER=uploads
```

The API is available at `http://localhost:8080`. A request to `/` returns a plain-text check. Resource routes live under `/api/v1`:

| Prefix | Area |
| --- | --- |
| `/api/v1/user/auth` | User accounts |
| `/api/v1/user/session` | User login |
| `/api/v1/employee/auth` | Employee accounts |
| `/api/v1/employee/session` | Employee login |
| `/api/v1/role` | Roles |
| `/api/v1/countries` | Countries |
| `/api/v1/region` | Regions |
| `/api/v1/city` | Cities |
| `/api/v1/measurement` | Measurement units |
| `/api/v1/distance` | Distance units |
| `/api/v1/property/type` | Property types |
| `/api/v1/property` | Properties |
| `/api/v1/property/appointment` | Property appointments |
| `/api/v1/property/deals` | Property deals |
| `/api/v1/property/pics` | Property photos |
| `/api/v1/vehicle/type` | Vehicle types |
| `/api/v1/vehicle` | Vehicles |
| `/api/v1/vehicle/appointment` | Vehicle appointments |
| `/api/v1/vehicle/deals` | Vehicle deals |
| `/api/v1/vehicle/pics` | Vehicle photos |
| `/api/v1/ads` | Ads |

## Website

From `UI_WEB`:

```bash
npm install
npm start
```

Open `http://localhost:3000`.

Create `UI_WEB/.env`. Point `REACT_APP_URL` at the API prefix. Restart `npm start` after changing it.

```env
REACT_APP_URL=http://localhost:8080/api/v1
REACT_APP_FIREBASE_KEY=
REACT_APP_FIREBASE_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_SENDER_ID=
REAC_APP_FIREBASE_ID=
```

`REAC_APP_FIREBASE_ID` is spelled that way in the web Firebase setup. Production build:

```bash
npm run build
```

## Mobile app

From `UI_MOBILE`:

```bash
npm install
npm start
```

In a second terminal:

```bash
npm run android
```

On macOS, install pods once, then run iOS:

```bash
cd ios
pod install
cd ..
npm run ios
```

`android/local.properties` is machine-specific and is ignored. Point `sdk.dir` at your Android SDK.

Create `UI_MOBILE/.env`. `REACT_APP_REQ` is the API prefix the screens call.

```env
REACT_APP_REQ=http://localhost:8080/api/v1
REACT_APP_FIREBASE_KEY=
REACT_APP_FIREBASE_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_SENDER_ID=
REAC_APP_FIREBASE_ID=
REAC_APP_FIREBASE_MEASUREMENTID=
```

On a physical Android device, `localhost` is the phone, not your computer. Use your computer's LAN address, or `10.0.2.2` for the Android emulator.

Release signing keys (`*.jks`, `*.keystore` other than the debug keystore, and `*.pepk`) stay out of Git.
