import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  onLanguageChange: (lng: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n]);

    const changeLanguage = (lng: string) => {
        onLanguageChange(lng);
        i18n.changeLanguage(lng)
            .then(() => window.location.reload()); // Reload the page after language change
        localStorage.setItem('language', lng); // Save language preference to local storage
    };

    const textDirection = i18n.dir();

    return (
        <div dir={textDirection}>
            <select onChange={(e) => changeLanguage(e.target.value)}>
            <option >{t("Choose language")}</option>
            <option value="he">{t("Hebrew")}</option><option value="en">{t("English")}</option>
               
            </select>
        </div>
    );
};

export default LanguageSelector;
