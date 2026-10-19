export const StatusMessage = (props) => {
  const { message, variant = 'secondary' } = props;

  return (
    <div className={`alert alert-${variant} mb-0`} role={variant === 'danger' ? 'alert' : 'status'}>
      {message}
    </div>
  );
};
