import React from "react";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {PageWithBottomImage} from "../page-with-image";

const Empty = ({title, subTitle, comment}) => {
  const { t } = useTranslation();
  const content = {
	title: t(title),
	subTitle: t(subTitle),
	comment: t(comment)
  };
  
  return (
	<PageWithBottomImage content={content} image={"/images/svg/empty.svg"} />
  );
}

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  comment: PropTypes.string
}

Empty.defaultProps = {
  subTitle: '',
  comment: ''
}

export default Empty;
