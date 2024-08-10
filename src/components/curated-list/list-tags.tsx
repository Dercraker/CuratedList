import { Tag } from "lucide-react";

interface ListTagsProps {
  tags: string[];
}

export const ListTags: React.FC<ListTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-row gap-1">
      <Tag strokeWidth={1.25} size={18} />
      <div className={`text-sm italic leading-5`}>{tags.join(", ")}</div>
    </div>
  );
};
