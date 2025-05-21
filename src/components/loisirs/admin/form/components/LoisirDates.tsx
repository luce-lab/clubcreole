
import { FormField } from "../FormField";

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
  return (
    <>
      <FormField
        id="edit-startDate"
        label="Date de début"
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        required
      />

      <FormField
        id="edit-endDate"
        label="Date de fin"
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        required
      />
    </>
  );
};
