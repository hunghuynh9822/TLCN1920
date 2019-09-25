/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import {
  TaskManagement,
  EmployeeManagement,
  Request,
  Notification,
  ProjectsManagement
} from "./views";

const dashboardRoutes = [
  //Staff
  {
    path: "",
    name: "Task Management",
    rtlName: "Quản lý Task",
    icon: Dashboard,
    component: TaskManagement,
    layout: "/staff",
    breadcrumb: "TaskManagement"
  }, {
    path: "/request",
    name: "Request",
    rtlName: "Xin phép nghỉ",
    icon: LibraryBooks,
    component: Request,
    layout: "/staff",
    breadcrumb: "Request"
  }, {
    path: "/notification",
    name: "Notification",
    rtlName: "Thông báo",
    icon: Notifications,
    component: Notification,
    layout: "/staff",
    breadcrumb: "Notification"
  }, {
    path: "/projects",
    name: "Projects",
    rtlName: "Quản lý dự án",
    icon: Unarchive,
    component: ProjectsManagement,
    layout: "/staff",
    breadcrumb: "Projects"
  },

  //Human Resource
  {
    path: "",
    name: "Human Resources",
    rtlName: "Nhân sự",
    icon: Person,
    component: EmployeeManagement,
    layout: "/hr",
    breadcrumb: "HumanResources"
  }, {
    path: "/request",
    name: "Request",
    rtlName: "Xin phép nghỉ",
    icon: LibraryBooks,
    component: Request,
    layout: "/hr",
    breadcrumb: "Request"
  }, {
    path: "/notification",
    name: "Notification",
    rtlName: "Thông báo",
    icon: Notifications,
    component: Notification,
    layout: "/hr",
    breadcrumb: "Notification"
  }
];

export default dashboardRoutes;