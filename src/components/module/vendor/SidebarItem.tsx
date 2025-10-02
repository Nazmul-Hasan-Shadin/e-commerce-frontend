import Link from "next/link";

export const SidebarItem = ({
  label,
  icon,
  isOpen,
  path,
}: {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  path: string;
}) => (
  <div
    className={` p-2 hover:bg-primary-color} hover:text-white cursor-pointer`}
  >
    <Link href={path}>
      <div className="flex items-center">
        <div className=" max-md:text-xl lg:text-2xl">{icon}</div>
        {isOpen && <span className="px-3 md:text-medium">{label}</span>}
      </div>
    </Link>
  </div>
);
