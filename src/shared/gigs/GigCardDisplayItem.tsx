import { FC, ReactElement, useEffect, useRef } from 'react';
import { IGigCardItems, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useAppSelector } from 'src/store/store';
import { replaceAmpersandAndDashWithSpace, replaceSpacesWithDash } from '../utils/util.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IReduxState } from 'src/store/store.interface';
import { socket, socketService } from 'src/sockets/socket.service';
import { find } from 'lodash';

const GigCardDisplayItem: FC<IGigCardItems> = ({ gig, linkTarget, showEditIcon }): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const sellerUsername = useRef<string>('');
  const title: string = replaceSpacesWithDash(gig.title);
  const navigate: NavigateFunction = useNavigate();

  const navigateToEditGig = (gigId: string): void => {
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };

  const saveGigTitle = (gig: ISellerGig): void => {
    if (authUser?.username) {
      const category: string = replaceAmpersandAndDashWithSpace(gig.categories);
      socket.emit('category', category, authUser.username);
    }
  };

  useEffect(() => {
    socketService.setupSocketConnection();
    socket.emit('getLoggedInUsers', '');
    socket.on('online', (data: string[]) => {
      sellerUsername.current = find(data, (name: string) => name === gig.username) as string;
    });
  }, [authUser.username, gig.username]);

  return <div>GigCardDisplayItem</div>;
};

export default GigCardDisplayItem;
