import React from 'react';
import { Button, Calendar } from 'antd';
import { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface CalendarComponentProps {
    slotsMap: Record<string, string>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ slotsMap }) => {

    const navigate = useNavigate()
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
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">All Booked Dates</h1>
                <Button type='primary' ghost onClick={()=>navigate('/book-date')}>Book Date</Button>
            </div>
            <Calendar
                className='p-3'
                cellRender={cellRender}
            />
        </div>
    );
};

export default CalendarComponent;
