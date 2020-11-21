import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
	backgroundColor: theme.palette.background.default,
	height: '100%'
  },
  content: {
	height: '100%',
	display: 'flex',
	flexDirection: 'column'
  },
  contentBody: {
	flexGrow: 1,
	display: 'flex',
	alignItems: 'center',
	[theme.breakpoints.down('md')]: {
	  justifyContent: 'center'
	}
  },
  form: {
	paddingLeft: 100,
	paddingRight: 100,
	paddingBottom: 125,
	flexBasis: 700,
	[theme.breakpoints.down('sm')]: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(2)
	}
  },
  policy: {
	marginTop: theme.spacing(1),
	display: 'flex',
	alignItems: 'center'
  },
  policyCheckbox: {
	marginLeft: '-14px'
  },
  policyText: {},
  submitButton: {
	margin: theme.spacing(2, 0)
  },
  textField: {
	marginTop: theme.spacing(2)
  },
}));

export default useStyles;
