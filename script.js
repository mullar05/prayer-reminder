const silenceButton = document.getElementById("silenceButton");
const countdown = document.getElementById("countdown");

silenceButton.addEventListener("click", function () {
    alert("🔕 Reminder: Please switch your phone to Silent Mode before entering the Masjid.");
});

function updateCountdown() {
    const now = new Date();

    // Example: next prayer at 12:30 PM
    const prayer = new Date();

    prayer.setHours(12);
    prayer.setMinutes(30);
    prayer.setSeconds(0);
    prayer.setMilliseconds(0);

    // If 12:30 PM has already passed, use tomorrow
    if (now >= prayer) {
        prayer.setDate(prayer.getDate() + 1);
    }

    const difference = prayer - now;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    countdown.textContent =
        `Time remaining: ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();

setInterval(updateCountdown, 1000);