import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ICertificate, ICertificateEditProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/utils.service';

const CertificateEditFields: FC<ICertificateEditProps> = ({
  type,
  selectedCertificate,
  setShowCertificateAddForm,
  setShowCertificateEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [certificateItem, setCertificateItem] = useState<ICertificate>({
    name: selectedCertificate && selectedCertificate.name ? selectedCertificate.name : '',
    from: selectedCertificate && selectedCertificate.from ? selectedCertificate.from : '',
    year: selectedCertificate && selectedCertificate.year ? selectedCertificate.year : 'Year'
  });
  const [year, setYear] = useState<string>(selectedCertificate && selectedCertificate.year ? `${selectedCertificate.year}` : 'Year');

  return <div>CertificateEditFields</div>;
};

export default CertificateEditFields;
