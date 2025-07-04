const API = "https://api-routine-mate.onrender.com";

export async function fetchRoutine() {
    const response = await fetch(`${API}/habits`);

    if(!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.habits;
}