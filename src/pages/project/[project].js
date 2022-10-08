import { useRouter } from "next/router";

const CommitPage = () => {
  const router = useRouter();
  const { project } = router.query;

  return (
    <div>
      <p>Commiting to Project : {project}</p>
    </div>
  );
};

export default CommitPage;
