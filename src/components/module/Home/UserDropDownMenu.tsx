import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
} from "@nextui-org/react";

const UserDropDownMenu = () => {
  return (
    <NavbarContent as="div" justify="end" style={{ opacity: 1 }}>
      <Dropdown placement="bottom-start" style={{ opacity: 1 }}>
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          className="z-30 opacity-5"
          style={{ opacity: 1 }}
        >
          <DropdownItem key={"/user/profile"} href="/user/dashboard">
            My Profile
          </DropdownItem>
          <DropdownItem key={"f"}>Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default UserDropDownMenu;
