import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { Can } from '../components/Can';
import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>

      <Can permissions={['metrics.list']}>
        <div>Você pode ver a lista de métricas </div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  await apiClient.get('me');

  return {
    props: {}
  };
});
