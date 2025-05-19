import { createContext } from 'react';
import { emptyGigData, emptySellerData } from 'src/shared/utils/static-data';
export const GigContext = createContext({
    gig: emptyGigData,
    seller: emptySellerData
});
