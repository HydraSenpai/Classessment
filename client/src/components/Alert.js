import { useUserContext } from '../context/user_context';

const Alert = () => {
  const { alertType, alertText } = useUserContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
