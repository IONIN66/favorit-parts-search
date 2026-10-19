export const Loader = (props) => {
  const { message } = props;

  return (
    <div className="d-flex align-items-center gap-2 text-secondary" role="status">
      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      {message}
    </div>
  );
};
