import React from 'react';
import { Calendar } from 'antd';
import { Dayjs } from 'dayjs';
import { Slot } from '../../interfaces/Slot';

interface CalendarComponentProps {
    onDateSelect: (date: Dayjs) => void;
    slotsMap: Record<string, string>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelect, slotsMap }) => {
    const cellRender = (date: Dayjs) => {
        const dateStr = date.format('YYYY-MM-DD');
        const userName = slotsMap[dateStr];

        return (
            <div className={`text-center text-sm ${userName ? 'bg-red-300 text-gray-600 h-full' : ''}`}>
                {userName ? `Booked by ${userName}` : ''}
            </div>
        );
    };

    return (
        <div className="p-4 bg-blue-50 rounded shadow">
            <h1 className="text-xl font-semibold mb-4">All Booked Dates</h1>
            <Calendar
                className='p-3'
                onSelect={onDateSelect}
                cellRender={cellRender}
            />
        </div>
    );
};

export default CalendarComponent;
