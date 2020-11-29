import React from 'react';
import {useTranslation} from "react-i18next";
import {PageWithBottomImage} from "../page-with-image";

const ErrorNotFound = () => {
  const { t } = useTranslation();
  const content = {
    title: t("errorNotFound.title"),
    subTitle: t("errorNotFound.subTitle"),
    comment: t("errorNotFound.comment")
  };

  return (
    <PageWithBottomImage content={content} image={"/images/svg/not-found.svg"} />
  );
};

export default ErrorNotFound;
