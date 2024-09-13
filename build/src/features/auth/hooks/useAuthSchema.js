import { useState } from 'react';
const useAuthSchema = ({ schema, userInfo }) => {
    const [validationErrors, setValidationErrors] = useState([]);
    async function schemaValidation() {
        await schema
            .validate(userInfo, { abortEarly: false })
            .then(() => setValidationErrors([]))
            .catch((err) => {
            setValidationErrors([...err.errors]);
        });
        const validation = await schema.isValid(userInfo, { abortEarly: false });
        return validation;
    }
    return [schemaValidation, validationErrors];
};
export { useAuthSchema };
