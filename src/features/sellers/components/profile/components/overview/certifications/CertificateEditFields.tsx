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

  const onHandleUpdate = (): void => {
    setCertificateItem({ ...certificateItem, year });
    if (type === 'add') {
      const newItem: ICertificate = {
        name: certificateItem.name,
        from: certificateItem.from,
        year
      };
      const clonedCertificates: ICertificate[] = cloneDeep(sellerProfile.certificates) as ICertificate[];
      clonedCertificates.push(newItem);
      if (setSellerProfile && setShowCertificateAddForm) {
        setSellerProfile({ ...sellerProfile, certificates: clonedCertificates });
        setShowCertificateAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile?.certificates, (value: ICertificate) => value.name === selectedCertificate?.name);
      const clonedCertificates: ICertificate[] = cloneDeep(sellerProfile?.certificates) as ICertificate[];
      const clonedItem: ICertificate = { name: certificateItem.name, from: certificateItem.from, year, _id: selectedCertificate?._id };
      clonedCertificates.splice(itemIndex, 1, clonedItem);
      const filtered = filter(clonedCertificates, (item: ICertificate) => item.name !== '');
      if (setSellerProfile && setShowCertificateEditForm) {
        setSellerProfile({ ...sellerProfile, certificates: filtered });
        setShowCertificateEditForm(false);
      }
    }
  };

  return <div>CertificateEditFields</div>;
};

export default CertificateEditFields;
