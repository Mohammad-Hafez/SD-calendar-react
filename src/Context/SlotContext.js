
import React, { createContext, useContext, useState, useEffect } from 'react';

const SlotContext = createContext();

// Function to load slots from local storage
const loadSlotsFromLocalStorage = () => {
  const slotsJSON = localStorage.getItem('slots');
  return slotsJSON ? JSON.parse(slotsJSON) : [];
};

// Function to save slots to local storage
const saveSlotsToLocalStorage = (slots) => {
  localStorage.setItem('slots', JSON.stringify(slots));
};

// SlotProvider component
export const SlotProvider = ({ children }) => {
  const [slots, setSlots] = useState(loadSlotsFromLocalStorage);

  useEffect(() => {
    saveSlotsToLocalStorage(slots);
  }, [slots]);

  const addSlot = (slot) => {
    setSlots((prevSlots) => {
      const updatedSlots = [...prevSlots, slot];
      saveSlotsToLocalStorage(updatedSlots);
      return updatedSlots;
    });
  };

  const slotExists = (date) => {
    return slots.some((slot) => slot.date === date);
  };

  return (
    <SlotContext.Provider value={{ slots, addSlot, slotExists }}>
      {children}
    </SlotContext.Provider>
  );
};

// Custom hook to use the context
export const useSlot = () => {
  const context = useContext(SlotContext);
  if (context === undefined) {
    throw new Error('useSlot must be used within a SlotProvider');
  }
  return context;
};