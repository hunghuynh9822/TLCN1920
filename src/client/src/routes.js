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
import ShowChart from "@material-ui/icons/ShowChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import {
  TaskManagement,
  GanttChart,
  EmployeeManagement,
  Request,
  Notification,
  ProjectsManagement,
  TimeKeeping,
  Information
} from "./views";
const dashboardRoutes = [
  //Lead
  {
    path: "",
    name: "Projects",
    rtlName: "Quản lý dự án",
    icon: Unarchive,
    component: ProjectsManagement,
    layout: "/lead",
    breadcrumb: "Projects"
  }, {
    path: "/tasks",
    name: "Task Management",
    rtlName: "Quản lý Task",
    icon: Dashboard,
    component: TaskManagement,
    layout: "/lead",
    breadcrumb: "TaskManagement"
  }, {
    path: "/timeline",
    name: "TimeLine",
    rtlName: "Lịch công việc",
    icon: ShowChart,
    component: GanttChart,
    layout: "/lead",
    breadcrumb: "TimeLine"
  }, {
    path: "/request",
    name: "Request",
    rtlName: "Xin phép nghỉ",
    icon: LibraryBooks,
    component: Request,
    layout: "/lead",
    breadcrumb: "Request"
  }, {
    path: "/notification",
    name: "Notification",
    rtlName: "Thông báo",
    icon: Notifications,
    component: Notification,
    layout: "/lead",
    breadcrumb: "Notification"
  }, {
    path: "/info",
    name: "Infomation",
    rtlName: "Thông tin cá nhân",
    icon: Person,
    component: Information,
    layout: "/lead",
    breadcrumb: "Information"
  },
  //Staff
  {
    path: "",
    name: "Projects",
    rtlName: "Quản lý dự án",
    icon: Unarchive,
    component: ProjectsManagement,
    layout: "/staff",
    breadcrumb: "Projects"
  },
  {
    path: "/tasks",
    name: "Task Management",
    rtlName: "Quản lý Task",
    icon: Dashboard,
    component: TaskManagement,
    layout: "/staff",
    breadcrumb: "TaskManagement"
  }, {
    path: "/timeline",
    name: "TimeLine",
    rtlName: "Lịch công việc",
    icon: ShowChart,
    component: GanttChart,
    layout: "/staff",
    breadcrumb: "TimeLine"
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
    path: "/info",
    name: "Infomation",
    rtlName: "Thông tin cá nhân",
    icon: Person,
    component: Information,
    layout: "/staff",
    breadcrumb: "Information"
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
    path: "/timekeeping",
    name: "Timekeeping",
    rtlName: "Chấm công",
    icon: LibraryBooks,
    component: TimeKeeping,
    layout: "/hr",
    breadcrumb: "Timekeeping"
  }, {
    path: "/notification",
    name: "Notification",
    rtlName: "Thông báo",
    icon: Notifications,
    component: Notification,
    layout: "/hr",
    breadcrumb: "Notification"
  }, {
    path: "/info",
    name: "Infomation",
    rtlName: "Thông tin cá nhân",
    icon: Person,
    component: Information,
    layout: "/hr",
    breadcrumb: "Information"
  }
];

export default dashboardRoutes;