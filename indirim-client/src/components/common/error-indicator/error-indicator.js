import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {PageWithBottomImage} from "../page-with-image";

const ErrorIndicator = ({message}) => {
  const { t } = useTranslation();
  const content = {
    title: t("errorIndicator.title"),
    subTitle: t("errorIndicator.subTitle"),
    comment: message !== "" ? message : t("errorIndicator.comment"),
  };
  
  return (
    <PageWithBottomImage content={content} image={"/images/svg/error.svg"} />
  );
};

ErrorIndicator.propTypes = {
  message: PropTypes.string
}

ErrorIndicator.defaultProps = {
  message: ''
}

export default ErrorIndicator;
