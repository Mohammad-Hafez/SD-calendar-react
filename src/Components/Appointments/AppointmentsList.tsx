import React from 'react';
import { Slot } from '../../interfaces/Slot';

interface AppointmentsListProps {
    userAppointments: Slot[];
    selectedUser: string | null;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ userAppointments, selectedUser }) => {
    if (!selectedUser) return null;

    return (
        <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Appointments for {selectedUser}</h2>
            <ul>
                {userAppointments.map((slot: Slot, index: any) => (
                    <li key={index}>{slot.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentsList;
