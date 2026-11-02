let drivers = {};
let selectedDriverCode = null;

async function loadDrivers() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/drivers"
        );

        drivers = await response.json();

        console.log("Driver data received:", drivers);
        selectDriver("SAI");

    } catch (error) {

        console.error(
            "Could not connect to backend:",
            error
        );

    }
}

function selectDriver(driverCode) {
    selectedDriverCode = driverCode;
    const driver = drivers[driverCode];

    if (!driver) {
        console.error("Driver not found:", driverCode);
        return;
    }

    document.getElementById("driver-name").textContent =driver.name;
    document.getElementById("position").textContent =driver.position;
    document.getElementById("speed").textContent =driver.speed + " km/h";
    document.getElementById("lap").textContent =driver.lap;
    document.getElementById("gap").textContent = "+" + driver.gap.toFixed(3) + "s";

    const video = document.getElementById("driver-video");
    const videoPath = "videos/" + driverCode + ".mp4";

    if (video.getAttribute("src") !== videoPath) {
        video.src = videoPath;
        video.load();

        video.play().catch(error => {
            console.log("Press play to start the video.", error);
        });
    }
    
    console.log("Selected driver:", driver.name);
}



async function updateTelemetry() {
    try {
        const response = await fetch("http://127.0.0.1:8000/telemetry");

        if (!response.ok) {
            throw new Error("Failed to fetch telemetry");
        }

        const telemetry = await response.json();

        for (let code in telemetry){
            if (drivers[code]) {
                drivers[code].speed = telemetry[code].speed;
                drivers[code].position = telemetry[code].position;
                drivers[code].lap = telemetry[code].lap;
                drivers[code].gap = telemetry[code].gap;
            }
        }

        if (!selectedDriverCode ||!telemetry[selectedDriverCode]) {
            return;
        }

        const driver = drivers[selectedDriverCode];

        document.getElementById("driver-name").textContent = driver.name;
        document.getElementById("position").textContent = driver.position;
        document.getElementById("speed").textContent = driver.speed + " km/h";
        document.getElementById("lap").textContent =driver.lap;
        document.getElementById("gap").textContent = "+" + driver.gap.toFixed(3) + "s";

    } catch (error) {
        console.error("Telemetry update failed:", error);
    }
}

loadDrivers();
setInterval(updateTelemetry, 1000);