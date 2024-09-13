import { createContext } from 'react';
import { emptySellerData } from 'src/shared/utils/static-data';
export const SellerContext = createContext({
    showEditIcons: false,
    sellerProfile: emptySellerData
});
