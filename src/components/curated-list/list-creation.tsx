import { User } from "lucide-react";

interface ListCreationProps {
  creator: string;
  creationDate: string;
}

export const ListCreation: React.FC<ListCreationProps> = ({
  creator,
  creationDate,
}) => {
  return (
    <div className="flex flex-row gap-1 mt-10 ">
      <User strokeWidth={1.25} size={18} />
      <div
        className={`text-xs leading-5`}
      >{`Created by: ${creator} - ${creationDate}`}</div>
    </div>
  );
};
