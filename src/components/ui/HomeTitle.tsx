import Dividers from "./Divider";

export function HomeTitle({ title }: { title: string }) {
  return (
    <div className="inline-block">
      <h3 className="text-xl  md:text-2xl my-3 md:ml-0 font-bold ">{title}</h3>
      <Dividers />
    </div>
  );
}
