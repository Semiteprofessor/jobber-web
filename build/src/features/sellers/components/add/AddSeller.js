import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBuyer } from 'src/features/buyer/reducers/buyer.reducer';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import Button from 'src/shared/button/Button';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { deleteFromLocalStorage, lowerCase, showErrorToast } from 'src/shared/utils/util.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { useSellerSchema } from '../../hooks/useSellerSchema';
import { addSeller } from '../../reducers/seller.reducer';
import { useCreateSellerMutation } from '../../services/seller.service';
import PersonalInfo from './components/PersonalInfo';
import SellerCertificateFields from './components/SellerCertificateFields';
import SellerEducationFields from './components/SellerEducationFields';
import SellerExperienceFields from './components/SellerExperienceFields';
import SellerLanguageFields from './components/SellerLanguagesFields';
import SellerSkillField from './components/SellerSkillField';
import SellerSocialLinksFields from './components/SellerSocialLinksFields';
const AddSeller = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const buyer = useAppSelector((state) => state.buyer);
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        profilePicture: `${authUser.profilePicture}`,
        description: '',
        responseTime: '',
        oneliner: ''
    });
    const [experienceFields, setExperienceFields] = useState([
        {
            title: '',
            company: '',
            startDate: 'Start Year',
            endDate: 'End Year',
            currentlyWorkingHere: false,
            description: ''
        }
    ]);
    const [educationFields, setEducationFields] = useState([
        {
            country: 'Country',
            university: '',
            title: 'Title',
            major: '',
            year: 'Year'
        }
    ]);
    const [skillsFields, setSkillsFields] = useState(['']);
    const [languageFields, setLanguageFields] = useState([
        {
            language: '',
            level: 'Level'
        }
    ]);
    const [certificateFields, setCertificateFields] = useState([
        {
            name: '',
            from: '',
            year: 'Year'
        }
    ]);
    const [socialFields, setSocialFields] = useState(['']);
    const [schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors] = useSellerSchema({
        personalInfo,
        experienceFields,
        educationFields,
        skillsFields,
        languageFields
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createSeller, { isLoading }] = useCreateSellerMutation();
    const errors = [...personalInfoErrors, ...experienceErrors, ...educationErrors, ...skillsErrors, ...languagesErrors];
    const onCreateSeller = async (event) => {
        event.preventDefault();
        try {
            const isValid = await schemaValidation();
            if (isValid) {
                const skills = filter(skillsFields, (skill) => skill !== '');
                const socialLinks = filter(socialFields, (item) => item !== '');
                const certificates = filter(certificateFields, (item) => item.name !== '' && item.from !== '' && item.year !== '');
                const sellerData = {
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
                const updateBuyer = { ...buyer, isSeller: true };
                const response = await createSeller(sellerData).unwrap();
                dispatch(addSeller(response.seller));
                dispatch(addBuyer(updateBuyer));
                navigate(`/seller_profile/${lowerCase(`${authUser.username}`)}/${response.seller?._id}/edit`);
            }
        }
        catch (error) {
            showErrorToast('Error creating seller profile.');
        }
    };
    useEffect(() => {
        return () => {
            // delete becomeASeller from localStorage when user leaves this page
            deleteFromLocalStorage('becomeASeller');
        };
    }, []);
    return (_jsxs("div", { className: "relative w-full", children: [_jsx(Breadcrumb, { breadCrumbItems: ['Seller', 'Create Profile'] }), _jsxs("div", { className: "container mx-auto my-5 overflow-hidden px-2 pb-12 md:px-0", children: [isLoading && _jsx(CircularPageLoader, {}), authUser && !authUser.emailVerified && (_jsx("div", { className: "absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl", children: _jsx("span", { className: "mt-20", children: "Please verify your email." }) })), _jsxs("div", { className: "left-0 top-0 z-10 mt-4 block h-full bg-white", children: [errors.length > 0 ? (_jsx("div", { className: "text-red-400", children: `You have ${errors.length} error${errors.length > 1 ? 's' : ''}` })) : (_jsx(_Fragment, {})), _jsx(PersonalInfo, { personalInfo: personalInfo, setPersonalInfo: setPersonalInfo, personalInfoErrors: personalInfoErrors }), _jsx(SellerExperienceFields, { experienceFields: experienceFields, setExperienceFields: setExperienceFields, experienceErrors: experienceErrors }), _jsx(SellerEducationFields, { educationFields: educationFields, setEducationFields: setEducationFields, educationErrors: educationErrors }), _jsx(SellerSkillField, { skillsFields: skillsFields, setSkillsFields: setSkillsFields, skillsErrors: skillsErrors }), _jsx(SellerLanguageFields, { languageFields: languageFields, setLanguageFields: setLanguageFields, languagesErrors: languagesErrors }), _jsx(SellerCertificateFields, { certificatesFields: certificateFields, setCertificatesFields: setCertificateFields }), _jsx(SellerSocialLinksFields, { socialFields: socialFields, setSocialFields: setSocialFields }), _jsx("div", { className: "flex justify-end p-6", children: _jsx(Button, { onClick: onCreateSeller, className: "rounded bg-sky-500 px-8 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-3 md:text-base", label: "Create Profile" }) })] })] })] }));
};
export default AddSeller;
