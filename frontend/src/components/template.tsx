import { Link } from "react-router-dom";
import { TemplateType } from "../api/email";

const TemplateCard = ({ _id, text, title }: TemplateType) => {
  return (
    <div
      className="flex flex-col gap-4 justify-between p-4 bg-gray-50 border content-start"
      id={_id}
    >
      <div className="grid gap-4">
        <h3 className="font-bold text-center">{title}</h3>
        <p className="whitespace-pre-line bg-white p-2 rounded">
          {text?.slice(0, 400)} ...
        </p>
      </div>
      <Link to={`/profile/template/${_id}`}>
        <button className="w-full">Use this template</button>
      </Link>
    </div>
  );
};

export default TemplateCard;
