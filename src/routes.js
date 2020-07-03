/*import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";*/
import Dashboard from "views/Dashboard/SignalScoutDashboard";
/*import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";*/
import EventsTables from "views/Tables/EventsTables.js";
import SubscriptionPage from "views/Pages/Subscription";
/*import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";*/
import LoginPage from "views/Pages/LoginPage.js";
// import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
/*import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";*/

// @material-ui/icons
// import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
/*import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";*/
import Place from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import StorageIcon from "@material-ui/icons/Storage";
/*import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";*/
import VisibilityIcon from "@material-ui/icons/Visibility";
import InputIcon from "@material-ui/icons/Input";
import SignupPage from "./views/Pages/SignupPage";
import FlashOnIcon from "@material-ui/icons/FlashOn";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
    requiredSubscription: true,
    isAuthRequired: true
  },
  {
    path: "/Events",
    name: "Events",
    rtlName: "عالتسعير",
    mini: "E",
    icon: StorageIcon,
    rtlMini: "ع",
    component: EventsTables,
    layout: "/admin",
    requiredSubscription: true,
    isAuthRequired: true
  },
  {
    path: "/subscription",
    name: "Subscription",
    rtlName: "عالتسعير",
    mini: "E",
    icon: StorageIcon,
    rtlMini: "ع",
    component: SubscriptionPage,
    layout: "/admin",
    isAuthRequired: true
  },
  {
    path: "/scouts",
    name: "Scouts",
    rtlName: "صودعم رتل",
    mini: "",
    icon: VisibilityIcon,
    rtlMini: "صو",
    component: Panels,
    layout: "/admin",
    requiredSubscription: true,
    isAuthRequired: true
  },
  {
    path: "/deployments",
    name: "Deployments",
    rtlName: "صودعم رتل",
    mini: "",
    icon: FlashOnIcon,
    rtlMini: "صو",
    component: Panels,
    layout: "/admin",
    isAuthRequired: true
  },
  {
    path: "/login-page",
    name: "Login Page",
    rtlName: "",
    mini: "L",
    rtlMini: "",
    component: LoginPage,
    layout: "/auth",
  },
  {
    path: "/register-page",
    name: "Registration Page",
    rtlName: "",
    mini: "R",
    rtlMini: "",
    component: SignupPage,
    layout: "/auth",
  },
  {
    collapse: true,
    name: "Integration",
    rtlName: "خرائط",
    icon: InputIcon,
    state: "integrationsCollapse",
    isAuthRequired: true,
    views: [
      {
        path: "/trackers",
        name: "Trackers",
        rtlName: "خرائط جوجل",
        mini: "T",
        icon: Place,
        rtlMini: "زم",
        component: Panels,
        layout: "/admin",
      },
      {
        path: "/sql-users",
        name: "SQL Users",
        rtlName: "خرائط جوجل",
        mini: "SU",
        icon: PeopleIcon,
        rtlMini: "زم",
        component: EventsTables,
        layout: "/admin",
      },
      {
        path: "/sql-scratchpads",
        name: "SQL Users",
        rtlName: "خرائط جوجل",
        mini: "SU",
        icon: PeopleIcon,
        rtlMini: "زم",
        component: EventsTables,
        layout: "/admin",
      },
    ],
  },
];
export default dashRoutes;
