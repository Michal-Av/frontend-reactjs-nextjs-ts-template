"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LangChanger = ({ onLanguageChange }) => {
    return (react_1.default.createElement("div", { className: "col-auto" },
        react_1.default.createElement("button", { onClick: onLanguageChange }, "Change Language")));
};
exports.default = LangChanger;
