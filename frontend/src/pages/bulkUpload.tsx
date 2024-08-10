import { useParams } from "react-router-dom";
import BulkEmailForm from "../components/forms/bulk";

const BulkUploadPage = () => {
  const params = useParams();
  return (
    <div className="mt-16">
      <BulkEmailForm id={params.templateId!} />
    </div>
  );
};

export default BulkUploadPage;
