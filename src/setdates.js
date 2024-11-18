function getFormattedDate() {
  const now = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = dayNames[now.getDay()];
  const month = monthNames[now.getMonth()];
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits for minutes

  const formattedDate = `${hours}:${minutes} - ${day}, ${now.getDate()} ${month} ${now.getFullYear()}`;
  return formattedDate;
}

document.getElementById("date").innerHTML = getFormattedDate();
