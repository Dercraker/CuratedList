import { CLCard } from "@/components/curated-list/cl-card";
import { Navbar } from "@/components/header/navBar";

const Lists = [
  {
    title: "Best boilerplates",
    creator: "Lucy",
    creationDate: "2024-08-01",
    tags: ["#React", "#Next.js", "#TailwindCSS"],
    items: [
      { title: "Now.ts", url: "https://www.nowts.app" },
      { title: "ShipFast", url: "https://shipfa.st/" },
    ],
  },
  {
    title: "Best React Libraries",
    creator: "Marlene",
    creationDate: "2024-08-02",
    tags: ["#React", "#Next.js"],
    items: [{ title: "Next.js", url: "https://nextjs.org/" }],
  },
  {
    title: "Best Mantine components",
    creator: "Antoine",
    creationDate: "2024-08-01",
    tags: ["#Mantine"],
    items: [{ title: "date-picker", url: "https://www.mantine.dev/" }],
  },
  {
    title: "Most useful TailwindCSS classes",
    creator: "Mirko",
    creationDate: "2024-08-03",
    tags: ["#TailwindCSS"],
    items: [
      {
        title: "justify-center",
        url: "https://tailwindcss.com/docs/justify-content#center",
      },
      {
        title: "justify-center",
        url: "https://tailwindcss.com/docs/justify-content#center",
      },
    ],
  },
  {
    title: "Most useful dev blogs",
    creator: "Alexis",
    creationDate: "2024-08-04",
    tags: ["#Blogs"],
    items: [
      { title: "SL Code", url: "https://sl-code.dev" },
      { title: "SL Code", url: "https://sl-code.dev" },
      { title: "SL Code", url: "https://sl-code.dev" },
    ],
  },
];

const Page = () => {
  return (
    <div className="flex flex-col h-screen w-full px-4">
      {" "}
      <Navbar />
      <h1 className="text-center my-24 text-3xl md:text-4xl text-balance font-semibold italic">
        &quot;ALL the best dev resources in ONE place.&quot;
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Lists.map((list) => (
          <CLCard
            key={list.title}
            title={list.title}
            creator={list.creator}
            creationDate={list.creationDate}
            tags={list.tags}
            items={list.items}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
