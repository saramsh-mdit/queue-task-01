type ErrorProp = { message: string; status: number | string };
const Error: React.FC<ErrorProp> = ({ message, status }) => {
  return (
    <div className="mt-16 text-center">
      <h2>Error:{status}</h2>
      <h3>{message}</h3>
    </div>
  );
};

export default Error;
