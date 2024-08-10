import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <section className="min-h-[70vh] flex flex-col justify-center">
        <div className="grid gap-4 max-w-xl mx-4 mr-auto">
          <h2>Email Processor</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            dignissimos itaque nemo possimus, architecto aliquam sapiente
            voluptatibus pariatur temporibus. Aut pariatur at doloremque
            quisquam assumenda.
          </p>
          <div className="max-w-sm grid gap-4 grid-cols-2">
            <Link to="/login">
              <button className="w-full text-sm ">Login</button>
            </Link>
            <Link to="/register">
              <button className="w-full text-sm bg-gray-200 text-gray-700">
                Register
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
