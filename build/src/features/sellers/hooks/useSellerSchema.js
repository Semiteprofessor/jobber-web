import { useState } from 'react';
import { ArrayOfEducationSchema, ArrayOfExperienceSchema, ArrayOfLanguagesSchema, ArrayOfSkillsSchema, personalInfoSchema } from '../schemes/seller.schema';
const useSellerSchema = ({ personalInfo, experienceFields, educationFields, skillsFields, languageFields }) => {
    const [personalInfoErrors, setPersonalInfoErrors] = useState([]);
    const [experienceErrors, setExperienceErrors] = useState([]);
    const [educationErrors, setEducationErrors] = useState([]);
    const [skillsErrors, setSkillsErrors] = useState([]);
    const [languagesErrors, setLanguagesErrors] = useState([]);
    async function schemaValidation() {
        await personalInfoSchema
            .validate(personalInfo, { abortEarly: false })
            .then(() => setPersonalInfoErrors([]))
            .catch((error) => {
            setPersonalInfoErrors([...error.errors]);
        });
        await ArrayOfExperienceSchema.validate(experienceFields, { abortEarly: false })
            .then(() => setExperienceErrors([]))
            .catch((error) => {
            setExperienceErrors(error.errors);
        });
        await ArrayOfEducationSchema.validate(educationFields, { abortEarly: false })
            .then(() => setEducationErrors([]))
            .catch((error) => {
            setEducationErrors(error.errors);
        });
        await ArrayOfSkillsSchema.validate(skillsFields, { abortEarly: false })
            .then(() => setSkillsErrors([]))
            .catch((error) => {
            setSkillsErrors(error.errors);
        });
        await ArrayOfLanguagesSchema.validate(languageFields, { abortEarly: false })
            .then(() => setLanguagesErrors([]))
            .catch((error) => {
            setLanguagesErrors(error.errors);
        });
        const isPersonalInfoValid = await personalInfoSchema.isValid(personalInfo, { abortEarly: false });
        const isExperienceValid = await ArrayOfExperienceSchema.isValid(experienceFields, { abortEarly: false });
        const isEducationValid = await ArrayOfEducationSchema.isValid(educationFields, { abortEarly: false });
        const isSkillValid = await ArrayOfSkillsSchema.isValid(skillsFields, { abortEarly: false });
        const isLanguageValid = await ArrayOfLanguagesSchema.isValid(languageFields, { abortEarly: false });
        return isPersonalInfoValid && isExperienceValid && isEducationValid && isSkillValid && isLanguageValid;
    }
    return [schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors];
};
export { useSellerSchema };
