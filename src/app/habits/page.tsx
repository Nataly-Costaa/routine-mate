"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HabitForm from "@/components/HabitForm";
import { fetchReport, fetchRoutine, createHabit } from "@/lib/api";
import { Habit, Report } from "@/types/type";

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

  return (
    <>
      <Header />

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
            <div key={h.id} className="border p-4 bg-white rounded shadow">
              <h2 className="text-xl font-bold">{h.title}</h2>
              <p>{h.description}</p>
              <p className="text-sm text-gray-600">Meta: {h.goal}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
