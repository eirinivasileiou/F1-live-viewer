from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import copy

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DRIVERS = {
    "NOR": {
        "name": "Lando Norris",
        "position": 1,
        "speed": 312,
        "lap": 42, 
        "gap": 0.0
    },

    "LEC": {
        "name": "Charles Leclerc",
        "position": 2,
        "speed": 305,
        "lap": 42,
        "gap": 0.9
    },

    "SAI": {
        "name": "Carlos Sainz",
        "position": 3,
        "speed": 309,
        "lap": 42,
        "gap": 1.7
    },

    "VER": {
        "name": "Max Verstappen",
        "position": 4,
        "speed": 294,
        "lap": 42,
        "gap": 5.8
    },

    "RIC": {
        "name": "Daniel Ricciardo",
        "position": 5,
        "speed": 299,
        "lap": 42,
        "gap": 7.1
    }
}

drivers = copy.deepcopy(DRIVERS)

@app.get("/")
def home():
    return {
        "message": "F1 Live Viewer is running!"
    }

@app.get("/drivers")
def get_drivers():
    return drivers

@app.get("/telemetry")
def get_telemetry():
    telemetry = {}
    for code, driver in drivers.items():
        speed_change = random.randint(-5, 5)
        speed = max(80, min(350, driver["speed"] + speed_change))
        driver["speed"] = speed
        if driver["position"] == 1:
            driver["gap"] = 0.0
        else:
            gap_change = random.randint(-20, 20) / 100.0
            driver["gap"] = max(0.1, round(driver["gap"] + gap_change, 2))
        telemetry[code] = {
            "name": driver["name"],
            "position": driver["position"],
            "speed": speed,
            "lap": driver["lap"],
            "gap": driver["gap"]
        }
    return telemetry

@app.post("/reset")
def reset_telemetry():
    global drivers
    drivers = copy.deepcopy(DRIVERS)
    return {"message": "Telemetry reset to initial values"}