const silenceButton = document.getElementById("silenceButton");
const nextPrayer = document.getElementById("nextPrayer");
const prayerTime = document.getElementById("prayerTime");
const countdown = document.getElementById("countdown");

const prayers = [
    { name: "Fajr", hour: 5, minute: 30 },
    { name: "Dhuhr", hour: 12, minute: 30 },
    { name: "Asr", hour: 15, minute: 45 },
    { name: "Maghrib", hour: 18, minute: 20 },
    { name: "Isha", hour: 19, minute: 35 }
];

function getNextPrayer() {
    const now = new Date();

    for (let prayer of prayers) {
        const prayerDate = new Date();

        prayerDate.setHours(prayer.hour);
        prayerDate.setMinutes(prayer.minute);
        prayerDate.setSeconds(0);
        prayerDate.setMilliseconds(0);

        if (prayerDate > now) {
            return {
                ...prayer,
                date: prayerDate
            };
        }
    }

    // If all prayers have passed, tomorrow's Fajr is next
    const fajrTomorrow = new Date();

    fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
    fajrTomorrow.setHours(5);
    fajrTomorrow.setMinutes(30);
    fajrTomorrow.setSeconds(0);
    fajrTomorrow.setMilliseconds(0);

    return {
        ...prayers[0],
        date: fajrTomorrow
    };
}

function updatePrayer() {
    const next = getNextPrayer();
    const now = new Date();

    const difference = next.date - now;

    const hours = Math.floor(
        difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    nextPrayer.textContent = next.name;

    prayerTime.textContent =
        `${String(next.hour).padStart(2, "0")}:${String(next.minute).padStart(2, "0")}`;

    countdown.textContent =
        `Time remaining: ${hours}h ${minutes}m ${seconds}s`;
}

silenceButton.addEventListener("click", function () {
    alert(
        "🔕 Reminder: Please switch your phone to Silent Mode before entering the Masjid."
    );
});

updatePrayer();

setInterval(updatePrayer, 1000);
const locationButton = document.getElementById("locationButton");
const locationStatus = document.getElementById("locationStatus");

const masjid = {
    latitude: -6.7924,
    longitude: 39.2083
};

const savedDistance =
    parseFloat(localStorage.getItem("reminderDistance")) || 0.2;

const savedMasjidName =
    localStorage.getItem("masjidName") || "the Masjid";

const masjidReminderEnabled =
    localStorage.getItem("masjidReminder") !== "false";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

locationButton.addEventListener("click", function () {

    if (!navigator.geolocation) {
        locationStatus.textContent =
            "❌ Location is not supported by your browser.";
        return;
    }

    locationStatus.textContent =
        "📍 Getting your location...";

    navigator.geolocation.getCurrentPosition(
        function (position) {

            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            const distance = calculateDistance(
                userLatitude,
                userLongitude,
                masjid.latitude,
                masjid.longitude
            );

           if (distance <= savedDistance && masjidReminderEnabled) {
         alert(
    `🕌 MASJID REMINDER\n\nYou are near ${savedMasjidName}.\nPlease switch your phone to Silent Mode.`
);
            } else {
                locationStatus.textContent =
                    `You are ${distance.toFixed(2)} km from the Masjid.`;
            }
        },

        function () {
            locationStatus.textContent =
                "❌ Unable to get your location. Please allow location access.";
        }
    );
});
function monitorMasjidLocation() {

    if (!navigator.geolocation) {
        return;
    }

    navigator.geolocation.watchPosition(
        function (position) {

            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            const distance = calculateDistance(
                userLatitude,
                userLongitude,
                masjid.latitude,
                masjid.longitude
            );

            if (distance <= 0.2) {

                locationStatus.textContent =
                    "🕌 You are near the Masjid! Please switch your phone to Silent Mode.";

                locationStatus.style.fontWeight = "bold";

                alert(
                    "🕌 MASJID REMINDER\n\nPlease switch your phone to Silent Mode."
                );

            } else {

                locationStatus.textContent =
                    `You are ${distance.toFixed(2)} km from the Masjid.`;

                locationStatus.style.fontWeight = "normal";
            }
        },

        function () {

            locationStatus.textContent =
                "❌ Please allow location access for the Masjid reminder.";

        },

        {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        }
    );
}

monitorMasjidLocation();