import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const items = [
  {
	href: '/account/dashboard',
	icon: DashboardOutlinedIcon,
	title: 'Dashboard'
  },
  {
	href: '/account/orders',
	icon: ShoppingBasketOutlinedIcon,
	title: "accountSidebar.orders"
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
  },
  {
	href: '/account/seller',
	icon: MonetizationOnOutlinedIcon,
	title: "accountSidebar.seller"
  }
];

export default items;
