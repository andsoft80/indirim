import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const items = [
  {
	href: '/account/dashboard',
	icon: DashboardOutlinedIcon,
	title: 'Dashboard'
  },
  {
	href: '/account/offers',
	icon: AssignmentOutlinedIcon,
	title: "accountSidebar.offers"
  },
  {
	href: '/account/subscription',
	icon: SubscriptionsOutlinedIcon,
	title: "accountSidebar.subscription"
  },
  {
	href: '/account/profile',
	icon: PersonOutlinedIcon,
	title: "accountSidebar.profile"
  },
  {
	href: '/account/settings',
	icon: SettingsOutlinedIcon,
	title: "accountSidebar.settings"
  }
];

export default items;
