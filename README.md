Formula 1 Live Viewer
A web-based F1 Live Viewer application featuring real-time telemetry simulation, synchronized driver onboard video playback, and dynamic race statistics.


** Tech Stack

* Backend: Python, FastAPI, Uvicorn
* Frontend: HTML, CSS, JavaScript 
* Media & Sync: HTML5 Video API (Autoplay, Loop, Muted)

** Prerequisites
* Make sure you have Python installed along with FastAPI and Uvicorn:

pip install fastapi uvicorn

* Start the server (from your project directory):

python3 -m uvicorn server:app --reload

* Open the frontend:
You can open home.html via Live Server in your browser (typically on port 5500).