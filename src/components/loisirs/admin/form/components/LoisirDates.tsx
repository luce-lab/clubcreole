
import { useState, useEffect } from "react";
import { DatePicker } from "./date-utils/DatePicker";

interface LoisirDatesProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export const LoisirDates = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: LoisirDatesProps) => {
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(undefined);

  // Convert start date string to Date object for min date validation
  useEffect(() => {
    try {
      if (startDate) {
        const date = new Date(startDate);
        if (!isNaN(date.getTime())) {
          setStartDateObj(date);
        }
      }
    } catch (error) {
      console.error("Error converting start date:", error);
    }
  }, [startDate]);

  return (
    <>
      <DatePicker
        id="edit-startDate"
        label="Date de début"
        value={startDate}
        onChange={onStartDateChange}
      />

      <DatePicker
        id="edit-endDate"
        label="Date de fin"
        value={endDate}
        onChange={onEndDateChange}
        minDate={startDateObj}
      />
    </>
  );
};
