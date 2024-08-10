interface ListTitleProps {
  title: string;
}

export const ListTitle: React.FC<ListTitleProps> = ({ title }) => {
  return <div className={`font-bold text-xl`}>{title}</div>;
};
