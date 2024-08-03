import React, { useState, useMemo } from 'react';
import { useSlot } from '../../Context/SlotContext';
import { Slot } from '../../interfaces/Slot';
import UserTable from './UserTable';
import AppointmentsList from './AppointmentsList';
import CalendarComponent from './CalendarComponent';
import { Helmet } from 'react-helmet';

const Appointments = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { slots } = useSlot();

    const slotsMap = useMemo(() => {
        return slots.reduce((acc: any, slot: Slot) => {
            acc[slot.date] = slot.name;
            return acc;
        }, {});
    }, [slots]);

    const handleUserSelect = (userName: string) => {
        setSelectedUser(userName);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setSelectedUser(null)
    };

    const filteredUsers = useMemo(() => {
        const userSet = slots.map((slot: Slot) => slot.name);
        return (userSet).filter((user: string) => user.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [slots, searchTerm]);

    const userAppointments = useMemo(() => {
        return slots.filter((slot: Slot) => slot.name === selectedUser);
    }, [slots, selectedUser]);

    return <>
        <Helmet>
            <title>Appointments</title>
            <meta name="description" content="This is all appointments for all users" />
        </Helmet>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 min-h-screen bg-gray-100">
            <div className="md:col-span-1">
                <UserTable
                    filteredUsers={filteredUsers}
                    onUserSelect={handleUserSelect}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />
                {selectedUser && (
                    <AppointmentsList
                        userAppointments={userAppointments}
                        selectedUser={selectedUser}
                    />
                )}
            </div>
            <div className="md:col-span-2">
                <CalendarComponent
                    slotsMap={slotsMap}
                />
            </div>
        </div>
    </>
};

export default React.memo(Appointments);
