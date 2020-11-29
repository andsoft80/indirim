import React from "react";
import {useTranslation} from "react-i18next";
import {PageWithBottomImage} from "../page-with-image";

const UnderConstruction = () => {
  const { t } = useTranslation();
  const content = {
	title: t("underConstruction.title"),
	subTitle: t("underConstruction.subTitle"),
	comment: t("underConstruction.comment")
  };
  
  return (
    <PageWithBottomImage content={content} image={"/images/svg/under-construction.svg"} />
  )
}

export default UnderConstruction;
