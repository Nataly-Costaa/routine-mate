"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HabitForm from "@/components/HabitForm";
import { fetchReport, fetchRoutine, createHabit, deleteHabit } from "@/lib/api";
import { Habit, Report } from "@/types/type";
import Loading from "@/components/Loanding";
import { Trash2 } from "lucide-react";

export default function HabitRoutine() {
  const [routines, setRoutines] = useState<Habit[]>([]);
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const habits = await fetchRoutine();
    const reportData = await fetchReport();
    setRoutines(habits);
    setReport(reportData);
  };

  const handleAddHabit = async (habitData: {
    title: string;
    description: string;
    goal: string;
  }) => {
    await createHabit(habitData);
    await loadData(); // Atualiza as rotinas após adicionar
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir esta rotina?"
    );
    if (!confirmDelete) return;

    try {
      await deleteHabit(id);
      await loadData(); // Atualiza a lista
    } catch (error) {
      alert("Erro ao deletar rotina.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />

      {!routines.length || !report ? (
        <Loading />
      ) : (
        <main className="max-w-3xl mx-auto p-4">
          {/* Relatório */}
          {report && (
            <section className="flex justify-evenly bg-white rounded shadow p-4 mb-8">
              <div className="flex items-center justify-center rounded w-50 h-44">
                <p className="flex flex-col text-3xl text-center">
                  <strong className="text-xl text-gray-400">Total:</strong>{" "}
                  {report.total}
                </p>
              </div>
              <div className="flex items-center justify-center rounded w-50 h-44">
                <p className="flex flex-col text-3xl text-center">
                  <strong className="text-xl text-gray-400">Concluídos:</strong>{" "}
                  {report.completed}
                </p>
              </div>
              <div className="flex items-center justify-center rounded w-50 h-44">
                <p className="flex flex-col text-3xl text-center">
                  <strong className="text-xl text-gray-400">Pendentes:</strong>{" "}
                  {report.pending}
                </p>
              </div>
              <div className="flex items-center justify-center rounded w-50 h-44">
                <p className="flex flex-col text-3xl text-center">
                  <strong className="text-xl text-gray-400">Progresso:</strong>{" "}
                  {report.progress}
                </p>
              </div>
            </section>
          )}

          {/* Formulário */}
          <HabitForm onAdd={handleAddHabit} />

          {/* Lista de rotinas */}
          <section className="space-y-4">
            {routines.map((h: Habit) => (
              <div key={h.id} className="relative border p-4 bg-white rounded shadow ">
                <h2 className="text-xl font-bold">{h.title}</h2>
                <p>{h.description}</p>
                <p className="text-sm text-gray-600">Meta: {h.goal}</p>

                <button
                  onClick={() => handleDelete(h.id)}
                  className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md cursor-pointer"
                  title="Deletar hábito"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </section>
        </main>
      )}
    </>
  );
}
