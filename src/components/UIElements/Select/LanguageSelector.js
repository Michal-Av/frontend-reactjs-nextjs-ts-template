"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const LanguageSelector = ({ onLanguageChange }) => {
    const { i18n } = (0, react_i18next_1.useTranslation)();
    const { t } = (0, react_i18next_1.useTranslation)();
    (0, react_1.useEffect)(() => {
        document.body.dir = i18n.dir();
    }, [i18n]);
    const changeLanguage = (lng) => {
        onLanguageChange(lng);
        i18n.changeLanguage(lng)
            .then(() => window.location.reload()); // Reload the page after language change
        localStorage.setItem('language', lng); // Save language preference to local storage
    };
    const textDirection = i18n.dir();
    return (react_1.default.createElement("div", { dir: textDirection },
        react_1.default.createElement("select", { onChange: (e) => changeLanguage(e.target.value) },
            react_1.default.createElement("option", null, t("Choose language")),
            react_1.default.createElement("option", { value: "he" }, t("Hebrew")),
            react_1.default.createElement("option", { value: "en" }, t("English")))));
};
exports.default = LanguageSelector;
