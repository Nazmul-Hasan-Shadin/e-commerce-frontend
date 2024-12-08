import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export const SidebarMenu = ({
  label,
  icon,
  isOpen,
  isMenuOpen,
  onClick,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMenuOpen: boolean;
  onClick: () => void;
  items: { name: string; path: string }[];
}) => (
  <nav>
    <div
      className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      role="button"
      tabIndex={0}
    >
      <div className="text-xl">{icon}</div>
      {isOpen && <span className="ml-4">{label}</span>}
      {isOpen && (
        <FaChevronDown
          className={`ml-auto transform ${isMenuOpen ? "rotate-180" : ""}`}
        />
      )}
    </div>
    {isMenuOpen && (
      <div className="ml-8 mt-2 space-y-1">
        {items.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className="text-sm hover:text-gray-400 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                window.location.assign(item.path)
              }
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    )}
  </nav>
);
