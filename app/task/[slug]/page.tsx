import { taskGroupList } from "../../data/task";

export default function Page({ params }: { params: { slug: string } }) {
  // const flattenedArray = taskGroupList.flatMap((taskGroup) =>
  //   Object.values(item).flatMap((value) =>
  //     typeof value === "object" ? Object.values(value) : value
  //   )
  // );

  const Navigator = () => <div className="flex flex-col">task</div>;
  return <h1 className=" mt-60 text-white">{params.slug}</h1>;
}
