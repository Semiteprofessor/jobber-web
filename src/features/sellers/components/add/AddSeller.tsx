import { filter } from 'lodash';
import { FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IBuyerDocument } from 'src/features/buyer/interfaces/buyer.interface';
import { addBuyer } from 'src/features/buyer/reducers/buyer.reducer';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import Button from 'src/shared/button/Button';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IResponse } from 'src/shared/shared.interface';
import { deleteFromLocalStorage, lowerCase, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { useSellerSchema } from '../../hooks/useSellerSchema';
import { ICertificate, IEducation, IExperience, ILanguage, IPersonalInfoData, ISellerDocument } from '../../interfaces/seller.interface';
import { addSeller } from '../../reducers/seller.reducer';
import { useCreateSellerMutation } from '../../services/seller.service';
import PersonalInfo from './components/PersonalInfo';
import SellerCertificateFields from './components/SellerCertificateFields';
import SellerEducationFields from './components/SellerEducationFields';
import SellerExperienceFields from './components/SellerExperienceFields';
import SellerLanguageFields from './components/SellerLanguagesFields';
import SellerSkillField from './components/SellerSkillField';
import SellerSocialLinksFields from './components/SellerSocialLinksFields';

const AddSeller: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfoData>({
    fullName: '',
    profilePicture: `${authUser.profilePicture}`,
    description: '',
    responseTime: '',
    oneliner: ''
  });
  const [experienceFields, setExperienceFields] = useState<IExperience[]>([
    {
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      currentlyWorkingHere: false,
      description: ''
    }
  ]);
  const [educationFields, setEducationFields] = useState<IEducation[]>([
    {
      country: 'Country',
      university: '',
      title: 'Title',
      major: '',
      year: 'Year'
    }
  ]);
  const [skillsFields, setSkillsFields] = useState<string[]>(['']);
  const [languageFields, setLanguageFields] = useState<ILanguage[]>([
    {
      language: '',
      level: 'Level'
    }
  ]);
  const [certificateFields, setCertificateFields] = useState<ICertificate[]>([
    {
      name: '',
      from: '',
      year: 'Year'
    }
  ]);
  const [socialFields, setSocialFields] = useState<string[]>(['']);
  const [schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors] = useSellerSchema({
    personalInfo,
    experienceFields,
    educationFields,
    skillsFields,
    languageFields
  });
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [createSeller, { isLoading }] = useCreateSellerMutation();

  const errors = [...personalInfoErrors, ...experienceErrors, ...educationErrors, ...skillsErrors, ...languagesErrors];

  const onCreateSeller = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        const skills: string[] = filter(skillsFields, (skill: string) => skill !== '') as string[];
        const socialLinks: string[] = filter(socialFields, (item: string) => item !== '') as string[];
        const certificates: ICertificate[] = filter(
          certificateFields,
          (item: ICertificate) => item.name !== '' && item.from !== '' && item.year !== ''
        ) as ICertificate[];
        const sellerData: ISellerDocument = {
          email: `${authUser.email}`,
          profilePublicId: `${authUser.profilePublicId}`,
          profilePicture: `${authUser.profilePicture}`,
          fullName: personalInfo.fullName,
          description: personalInfo.description,
          country: `${authUser.country}`,
          skills,
          oneliner: personalInfo.oneliner,
          languages: languageFields,
          responseTime: parseInt(personalInfo.responseTime, 10),
          experience: experienceFields,
          education: educationFields,
          socialLinks,
          certificates
        };
        const updateBuyer: IBuyerDocument = { ...buyer, isSeller: true };
        const response: IResponse = await createSeller(sellerData).unwrap();
        dispatch(addSeller(response.seller));
        dispatch(addBuyer(updateBuyer));
        navigate(`/seller_profile/${lowerCase(`${authUser.username}`)}/${response.seller?._id}/edit`);
      }
    } catch (error) {
      showErrorToast('Error creating seller profile.');
    }
  };

  useEffect(() => {
    return () => {
      // delete becomeASeller from localStorage when user leaves this page
      deleteFromLocalStorage('becomeASeller');
    };
  }, []);

  return <div>AddSeller</div>;
};

export default AddSeller;
