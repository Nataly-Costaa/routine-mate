"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface HabitFormProps {
  readonly onAdd: (habit: HabitFormData) => Promise<void>;
}

const habitSchema = z.object({
  title: z.string().min(3, "Título é obrigatório e deve ter no mínimo 3 carácteres"),
  description: z.string().min(3, "Descrição é obrigatória e deve ter no mínimo 3 carácteres"),
  goal: z.string().min(3, "Meta é obrigatória e deve ter no mínimo 3 carácteres"),
});

type HabitFormData = z.infer<typeof habitSchema>;

export default function HabitForm({ onAdd }: HabitFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
  });

  const onSubmit = async (data: HabitFormData) => {
    setIsLoading(true);
    try {
      await onAdd(data);
      reset();
    } catch (error) {
      console.error("Erro ao castrar rotina", error);
      alert("Erro ao cadastrar rotina");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-amber-100 p-4 rounded mb-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">➕ Nova Rotina</h2>

      <div>
        <input
          type="text"
          placeholder="Título"
          {...register("title")}
          className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-600"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Descrição"
          {...register("description")}
          className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-600"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Meta (ex: 1 Semana)"
          {...register("goal")}
          className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-600"
        />
        {errors.goal && (
          <p className="text-red-600 text-sm mt-1">{errors.goal.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
          isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        {isLoading ? "Carregando..." : "Cadastrar"}
      </button>
    </form>
  );
}
