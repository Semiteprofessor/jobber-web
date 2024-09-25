import { ChangeEvent, FC, ReactElement } from 'react';
import { ICertificate, ICertificateProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/utils.service';

import Dropdown from '../../../../../shared/dropdown/Dropdown';

const SellerCertificateFields: FC<ICertificateProps> = ({ certificatesFields, setCertificatesFields }): ReactElement => {
  const adCertificateFields = (): void => {
    const newfield: ICertificate = {
      name: '',
      from: '',
      year: 'Year'
    };
    if (certificatesFields && setCertificatesFields) {
      setCertificatesFields([...certificatesFields, newfield]);
    }
  };

  return <div>SellerCertificateFields</div>;
};

export default SellerCertificateFields;
