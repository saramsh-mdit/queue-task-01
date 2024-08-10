import { useQuery } from "@tanstack/react-query";
import { getEmailTemplates } from "../api/email";
import Error from "../components/error";
import Loading from "../components/loading";
import TemplateCard from "../components/template";

const Templates = () => {
  const templateQuery = useQuery({
    queryFn: getEmailTemplates,
    queryKey: ["get-templates"],
  });
  if (templateQuery.isLoading) return <Loading />;
  if (templateQuery.error)
    return (
      <Error
        message={templateQuery.error.message}
        status={templateQuery.data?.status ?? ""}
      />
    );
  return (
    <section className="grid gap-8 ">
      <h3 className="text-center text-3xl font-bold text-gray-700">
        Templates
      </h3>
      <div className="grid gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {templateQuery.data?.data?.map((template) => {
          return <TemplateCard key={template._id} {...template} />;
        })}
      </div>
    </section>
  );
};

export default Templates;
