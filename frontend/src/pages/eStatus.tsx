import { useQuery } from "@tanstack/react-query";
import { getEmailStatus } from "../api/email";
import Error from "../components/error";
import EStatusTable from "../components/eTable";
import Loading from "../components/loading";

const EMailStatusPage = () => {
  const eStatusQuery = useQuery({
    queryFn: getEmailStatus,
    queryKey: ["get-email-status"],
    // refresh every one minute
    staleTime: 1000 * 60,
  });
  if (eStatusQuery.isLoading) return <Loading />;
  if (eStatusQuery.error)
    return (
      <Error
        message={eStatusQuery.error.message}
        status={eStatusQuery.data?.status ?? ""}
      />
    );
  return (
    <section className="grid gap-8">
      <h3 className="text-center text-3xl font-bold text-gray-700">
        Email Status
      </h3>
      {eStatusQuery.data && <EStatusTable data={eStatusQuery.data.data!} />}
    </section>
  );
};

export default EMailStatusPage;
