const API = "https://api-routine-mate.onrender.com";

export async function fetchRoutine() {
    const response = await fetch(`${API}/habits`);

    if(!response.ok) {
        throw new Error("Erro ao buscar hábitos");
    }

    const data = await response.json();
    return data.habits;
}

export async function createHabit(habit: {
  title: string;
  description: string;
  goal: string;
}) {
  const response = await fetch(`${API}/habits/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar hábito");
  }

  return await response.json();
}

export async function markHabitAsCompleted(id: string) {
  const response = await fetch(`${API}/habits/${id}/complete`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Erro ao marcar hábito como concluído");
  }

  return await response.json();
}

export async function deleteHabit(id: string) {
  const response = await fetch(`${API}/habits/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar hábito");
  }

  return true;
}

export async function fetchReport() {
  const response = await fetch(`${API}/habits/report`);

  if (!response.ok) {
    throw new Error("Erro ao buscar relatório");
  }

  return await response.json();
}