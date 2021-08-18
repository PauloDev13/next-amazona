import { useContext, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Store } from '../utils/Store';

const Shipping = () => {
  const router: any = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping').then();
    }
  }, [router, userInfo]);
  
  return <div>Shipping</div>;
};
// export default dynamic(() => Promise.resolve(Shipping), {ssr: false});
export default Shipping;