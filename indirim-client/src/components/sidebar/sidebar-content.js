import React, {useContext} from "react";
import {makeStyles} from "@material-ui/styles";
import {Link as RouterLink} from "react-router-dom";
import {Avatar, Box, Divider, List, Typography} from "@material-ui/core";
import SidebarContentItem from "./sidebar-content-item";
import SidebarItemContext from "../contexts/sidebar-item-context";

const useStyles = makeStyles((theme) => ({
  avatar: {
	cursor: 'pointer',
	width: 64,
	height: 64,
	marginBottom: 5,
  },
  name: {
	color: theme.palette.text.main,
  }
}));


const SidebarContent = () => {
  const classes = useStyles();
  const {firstName, lastName, items} = useContext(SidebarItemContext);
  
  return(
	<Box height="100%" display="flex" flexDirection="column">
	  <Box alignItems="center" display="flex" flexDirection="column" p={2}>
		<Avatar
		  className={classes.avatar}
		  component={RouterLink}
		  src={""}
		  to="/account"/>
		<Typography
		  className={classes.name}
		  variant="h5"
		>
		  {`${firstName} ${lastName}`}
		</Typography>
	  </Box>
	  <Divider />
	  <Box p={2}>
		<List>
		  {
			items.map(item => (<SidebarContentItem key={item.title} data={item}/>))
		  }
		</List>
	  </Box>
	  <Divider />
	</Box>
  );
}

export default SidebarContent;
