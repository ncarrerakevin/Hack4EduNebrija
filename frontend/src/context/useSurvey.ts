import { useContext } from 'react';
import { SurveyContext } from './SurveyContext';  // Importa el contexto desde el archivo principal

export const useSurvey = () => {
    const context = useContext(SurveyContext);
    if (!context) {
        throw new Error('useSurvey debe ser utilizado dentro de un SurveyProvider');
    }
    return context;
};
