import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postBulkEmail } from "../../api/email";
import FormWrapper from "../../layout/form";

const BulkEmailForm = ({ id }: { id: string }) => {
  const navigation = useNavigate();
  const [file, setFile] = React.useState<Blob>();

  const submitMutation = useMutation({
    mutationFn: () => postBulkEmail(id, file!),
    onSuccess: (response) => {
      setFile(undefined);
      navigation("/profile/email-status");
      toast.success(response.data.message);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(err.message);
      }
    },
  });
  const submitHandler = () => {
    if (file) {
      submitMutation.mutate();
    } else {
      toast("Select a valid file first");
    }
  };
  return (
    <div>
      <FormWrapper title="Bulk Upload">
        <label className="form-item">
          <span className="label">File:</span>
          <input
            onChange={(e) => {
              if (e.target.files) setFile(e.target.files[0]);
            }}
            multiple={false}
            type="file"
            accept=".xlsx"
          />
          <span className="label">Note: only excel files are supported</span>
        </label>
        <button onClick={submitHandler}>Submit</button>
        <button
          onClick={() => navigation("/profile/template")}
          className="btn-default"
        >
          Cancel
        </button>
      </FormWrapper>
    </div>
  );
};

export default BulkEmailForm;
