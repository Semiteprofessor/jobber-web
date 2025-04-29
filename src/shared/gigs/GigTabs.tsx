import { useState } from 'react';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { replaceAmpersandAndDashWithSpace, lowerCase } from '../utils/util.service';
import { useGetAuthGigsByCategoryQuery } from 'src/features/auth/services/auth.service';

const GigTabs = () => {
  const [activeTab, setActiveTab] = useState<string>('Graphics & Design');
  const queryType = `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(activeTab)}`)}`;
  const { data, isSuccess } = useGetAuthGigsByCategoryQuery({
    query: `${queryType}`,
    from: '0',
    size: '10',
    type: 'forward'
  });
  let categoryGigs: ISellerGig[] = [];
  if (isSuccess) {
    categoryGigs = data.gigs as ISellerGig[];
  }

  return <div>GigTabs</div>;
};

export default GigTabs;
