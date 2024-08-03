import React, { useState, useCallback, useRef } from 'react';
import { Calendar, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { useSlot } from '../../Context/SlotContext';
import BookingForm from './BookingForm';
import { RollbackOutlined } from '@ant-design/icons';
import { Helmet } from "react-helmet";

const BookDate: React.FC = () => {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { addSlot, slotExists } = useSlot();
  const navigate = useNavigate();

  const formikRef = useRef<any>(null);

  const handleDateSelect = useCallback((date: Dayjs) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsModalVisible(false);
    setSubmitError(null);
  }, []);

  const handleFormSubmit = useCallback(
    (values: any) => {
      if (!selectedDate) {
        return;
      }
      const newSlot = { ...values, date: selectedDate };
      if (slotExists(newSlot.date)) {
        setSubmitError('A slot already exists for this date.');
        message.error('A slot already exists for this date.');
      } else {
        addSlot(newSlot);
        setIsModalVisible(false);
        message.success('Booking successful!');
        navigate('/');
      }
    },
    [selectedDate, navigate, addSlot, slotExists]
  );

  const disablePastDates = (current: Dayjs) => {
    const today = dayjs().startOf('day');
    return current.isBefore(today, 'day');
  };

  return <>
    <Helmet>
      <title>Book Date</title>
      <meta name="description" content="Book new date in future" />
    </Helmet>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-5/6 mx-auto p-4 bg-white rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Book a Slot</h1>
          <Button type="primary" ghost onClick={() => navigate('/appointments')}>Back <RollbackOutlined /></Button>
        </div>
        <Calendar
          onSelect={handleDateSelect}
          disabledDate={disablePastDates}
        />
        <BookingForm
          ModalVisible={isModalVisible}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          submitError={submitError}
          formikRef={formikRef}
          resetCallback={handleCancel}
        />
      </div>
    </div>
  </>
};

export default React.memo(BookDate);
