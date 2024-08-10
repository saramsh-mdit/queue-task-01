import { NavLink } from "react-router-dom";

export type NavItem = {
  name: string;
  link: string;
};

const navItemsListOnAuth: NavItem[] = [
  { name: "Template", link: "/profile/template" },
  { name: "Status", link: "/profile/email-status" },
  { name: "Profile", link: "/profile" },
];

const NavItem = ({ name, link }: NavItem) => (
  <NavLink
    className={({ isActive }) =>
      `${
        isActive ? " text-gray-50" : "text-gray-300"
      } no-underline hover:text-white`
    }
    to={link}
  >
    <p className="font-semibold font-base text-sm hover:text-blue-400">
      {name}
    </p>
  </NavLink>
);

const Navbar = () => {
  return (
    <nav className="bg-gray-900 flex gap-4 justify-between p-2 px-4 sticky top-0">
      <NavItem name="Email_Processor" link="/" />

      <div className="flex gap-4">
        <NavItem name="Login" link="/login" />
      </div>
    </nav>
  );
};

export default Navbar;
