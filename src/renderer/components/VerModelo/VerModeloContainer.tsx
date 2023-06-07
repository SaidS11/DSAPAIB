import { useCustomSelector } from '../../../redux/hooks';
import VerModelo from './VerModelo';

const VerModeloContainer = () => {
  const resp = useCustomSelector((state) => state.config.modeloDetalle);
  return <VerModelo resp={resp} />;
};

export default VerModeloContainer;
