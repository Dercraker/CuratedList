interface CLItemNumberProps {
  itemNumber: number;
}

export const CLItemNumber: React.FC<CLItemNumberProps> = ({ itemNumber }) => {
  return <div className="text-xs text-gray-500 pt-10">{itemNumber} items</div>;
};
