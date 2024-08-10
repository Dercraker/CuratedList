import { CLItemNumber } from "./cl-item-number";
import { ListCreation } from "./list-creation";
import { ListTags } from "./list-tags";
import { ListTitle } from "./list-title";

interface CLCardProps {
  title: string;
  creator: string;
  creationDate: string;
  tags: string[];
  items: any[];
}

export const CLCard: React.FC<CLCardProps> = ({
  title,
  creator,
  creationDate,
  tags,
  items,
}) => {
  return (
    <div className="flex flex-col p-4 rounded-sm bg-gray-300 size-fit gap-1 w-full">
      <ListTitle title={title} />
      <ListTags tags={tags} />
      <div className="flex flex-row justify-between">
        <ListCreation creator={creator} creationDate={creationDate} />
        <CLItemNumber itemNumber={items.length} />
      </div>
    </div>
  );
};
