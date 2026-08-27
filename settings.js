const masjidName = document.getElementById("masjidName");
const distance = document.getElementById("distance");
const masjidReminder = document.getElementById("masjidReminder");
const prayerReminder = document.getElementById("prayerReminder");
const saveSettings = document.getElementById("saveSettings");

saveSettings.addEventListener("click", function () {

    localStorage.setItem("masjidName", masjidName.value);
    localStorage.setItem("reminderDistance", distance.value);
    localStorage.setItem(
        "masjidReminder",
        masjidReminder.checked
    );
    localStorage.setItem(
        "prayerReminder",
        prayerReminder.checked
    );

    alert("✅ Settings saved successfully!");
});