import { useRouter } from "next/router";

const CommitPage = () => {
  const router = useRouter();
  const { project } = router.query;

  return (
    <div>
      <p>Project info {project}</p>
      <p>Enter commitments details ...</p>
      <p>Submit to contract ...</p>
    </div>
  );
};

export default CommitPage;
