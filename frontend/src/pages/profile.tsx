import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProfilePage = () => {
  const { value, logOut } = useContext(AuthContext);

  return (
    <div className="grid gap-8 pb-8">
      <section className="flex gap-2 flex-col items-start p-4 bg-gray-100 rounded">
        <div className="w-full flex justify-between gap-4 flex-wrap items-end">
          <div>
            <h2>{value.userData?.name}</h2>
            <h4>Email:{value.userData?.email}</h4>
          </div>
          <button onClick={logOut} className="px-4 text-sm bg-red-500 ">
            Log out
          </button>
        </div>
      </section>
      <hr />
      <div className="flex gap-4">
        <Link to="/profile/template">
          <button className="btn-default">See Template</button>
        </Link>
        <Link to="/profile/email-status">
          <button className="btn-default">Check Email Status</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
