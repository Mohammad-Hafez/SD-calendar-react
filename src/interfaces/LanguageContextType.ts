import { TFunction } from 'i18next';

export interface LanguageContextType {
    changeLanguage: (lang: string) => void;
    language: string;
    t: TFunction;
}