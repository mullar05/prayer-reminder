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