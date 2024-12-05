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
  <div className="flex items-center  p-2 hover:bg-gray-700 cursor-pointer">
    <Link href={path}>
      <div className="flex items-center">
        <div className="text-xl">{icon}</div>
        {isOpen && <span className="ml-4">{label}</span>}
      </div>
    </Link>
  </div>
);
