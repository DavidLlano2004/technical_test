import "./Check.css";

interface Props {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const Check = ({ isChecked, onChange }: Props) => {
  return (
    <input 
      type="checkbox" 
      className="ui-checkbox" 
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};