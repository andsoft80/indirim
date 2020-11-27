import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Button, ListItem} from "@material-ui/core";
import {NavLink as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  item: {
	display: 'flex',
	paddingTop: 0,
	paddingBottom: 0
  },
  button: {
	color: theme.palette.text.main,
	fontWeight: theme.typography.fontWeightMedium,
	justifyContent: 'flex-start',
	letterSpacing: 0,
	padding: '10px 8px',
	textTransform: 'none',
	width: '100%'
  },
  icon: {
	marginRight: theme.spacing(1)
  },
  title: {
	marginRight: 'auto'
  },
  active: {
	color: theme.palette.primary.main,
	'& $title': {
	  fontWeight: theme.typography.fontWeightMedium
	},
	'& $icon': {
	  color: theme.palette.primary.main
	}
  }
}));

const SidebarContentItem = ({data, ...rest}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const {href, title, icon: Icon} = data;
  
  return(
	<ListItem
	  className={classes.item}
	  disableGutters
	  {...rest}
	>
	  <Button
		activeClassName={classes.active}
		className={classes.button}
		component={RouterLink}
		to={href}
	  >
		{
		  Icon && (<Icon className={classes.icon} size="20"/>)
		}
		<span className={classes.title}>
          {t(title)}
        </span>
	  </Button>
	</ListItem>
  );
};

export default SidebarContentItem;
