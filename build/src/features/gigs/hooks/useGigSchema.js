/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
const useGigSchema = ({ schema, gigInfo }) => {
    const [validationErrors, setValidationErrors] = useState([]);
    async function schemaValidation() {
        await schema
            .validate(gigInfo, { abortEarly: false })
            .then(() => setValidationErrors([]))
            .catch((err) => {
            setValidationErrors([...err.errors]);
        });
        const validation = await schema.isValid(gigInfo, { abortEarly: false });
        return validation;
    }
    return [schemaValidation, validationErrors];
};
export { useGigSchema };
