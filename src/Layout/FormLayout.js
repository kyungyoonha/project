import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./FormLayout.scss";

const FormLayout = ({ children, ...rest }) => {
    return (
        <form className="formLayout">
            <Navbar {...rest} />
            {children}
        </form>
    );
};

export default FormLayout;
