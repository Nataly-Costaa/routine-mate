import React from 'react';
import Header from '../../components/Header';
import { fetchReport, fetchRoutine } from '@/lib/api';
import { Habit } from '@/types/type';


export default async function HabitRoutine() {
    const routines = await fetchRoutine();
    const report = await fetchReport();

    return (
        <>
            <Header/>

            <main>
                <section className="flex justify-evenly bg-white rounded shadow p-4 mb-8">
                    <div className="flex items-center justify-center rounded w-50 h-44">
                        <p className="flex flex-col text-3xl text-center"><strong className='text-xl text-gray-400'>Total:</strong> {report.total}</p>
                    </div>
                    <div className="flex items-center justify-center rounded w-50 h-44">
                        <p className="flex flex-col text-3xl text-center"><strong className='text-xl text-gray-400'>Concluídos:</strong> {report.completed}</p>
                    </div>
                    <div className="flex items-center justify-center rounded w-50 h-44">
                        <p className="flex flex-col text-3xl text-center"><strong className='text-xl text-gray-400'>Pendentes:</strong> {report.pending}</p>
                    </div>
                    <div className="flex items-center justify-center rounded w-50 h-44">
                        <p className="flex flex-col text-3xl text-center"><strong className='text-xl text-gray-400'>Progresso:</strong> {report.progress}</p>
                    </div>
                </section>
            </main>
        </>
    )
}