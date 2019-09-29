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
import Notifications from "@material-ui/icons/Notifications";
import RecentActors from "@material-ui/icons/RecentActors";
import Assignment from "@material-ui/icons/AssignmentOutlined";
import Today from "@material-ui/icons/TodayOutlined";
import FolderOpen from "@material-ui/icons/FolderOpenOutlined";
import TimeLine from "@material-ui/icons/Timeline";
import {
  TaskManagement,
  GanttChart,
  EmployeeManagement,
  Request,
  Notification,
  ProjectsManagement,
  TimeKeeping,
  Information,
  AdminHumanManagement,
  AdminDashboard
} from "./views";

const manageRoutes = [
  //Admin
  {
    layout: "/admin",
    routes: [
      {
        path: "",
        name: "Dashboad",
        rtlName: "Tổng quan",
        icon: Dashboard,
        component: AdminDashboard,
        layout: "/admin",
        breadcrumb: "Dashboard"
      },
      {
        path: "/projects",
        name: "Projects",
        rtlName: "Quản lý dự án",
        icon: FolderOpen,
        component: ProjectsManagement,
        layout: "/admin",
        breadcrumb: "Projects"
      },
      {
        path: "/tasks",
        name: "Tasks Management",
        rtlName: "Quản lý Task",
        icon: Assignment,
        component: TaskManagement,
        layout: "/admin",
        breadcrumb: "TasksManagement"
      },
      {
        path: "/human",
        name: "Human Resources",
        rtlName: "Nhân sự",
        icon: RecentActors,
        component: AdminHumanManagement,
        layout: "/admin",
        breadcrumb: "HumanResources"
      },
      {
        path: "/request",
        name: "Request",
        rtlName: "Xin phép nghỉ",
        icon: LibraryBooks,
        component: Request,
        layout: "/admin",
        breadcrumb: "Request"
      },
      {
        path: "/timekeeping",
        name: "Timekeeping",
        rtlName: "Chấm công",
        icon: Today,
        component: TimeKeeping,
        layout: "/admin",
        breadcrumb: "Timekeeping"
      },
      {
        path: "/notification",
        name: "Notification",
        rtlName: "Thông báo",
        icon: Notifications,
        component: Notification,
        layout: "/admin",
        breadcrumb: "Notification"
      },
      {
        path: "/info",
        name: "Infomation",
        rtlName: "Thông tin cá nhân",
        icon: Person,
        component: Information,
        layout: "/admin",
        breadcrumb: "Information"
      }
    ]
  },
  {
    layout:"/lead",
    routes:[
      {
        path: "",
        name: "Dashboard",
        rtlName: "Tổng quan",
        icon: Dashboard,
        component: AdminDashboard,
        layout: "/lead",
        breadcrumb: "Dashboard"
      },
      {
        path: "/projects",
        name: "Projects",
        rtlName: "Quản lý dự án",
        icon: FolderOpen,
        component: ProjectsManagement,
        layout: "/lead",
        breadcrumb: "Projects"
      }, {
        path: "/tasks",
        name: "Tasks Management",
        rtlName: "Quản lý Tasks",
        icon: Assignment,
        component: TaskManagement,
        layout: "/lead",
        breadcrumb: "TasksManagement"
      }, {
        path: "/timeline",
        name: "TimeLine",
        rtlName: "Lịch công việc",
        icon: TimeLine,
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
      }
    ]
  },
  {
    layout:"/staff",
    routes:[
      {
        path: "",
        name: "Dashboard",
        rtlName: "Tổng quan",
        icon: Dashboard,
        component: AdminDashboard,
        layout: "/staff",
        breadcrumb: "Dashboard"
      },
      {
        path: "/projects",
        name: "Projects",
        rtlName: "Quản lý dự án",
        icon: FolderOpen,
        component: ProjectsManagement,
        layout: "/staff",
        breadcrumb: "Projects"
      },
      {
        path: "/tasks",
        name: "Tasks Management",
        rtlName: "Quản lý Tasks",
        icon: Assignment,
        component: TaskManagement,
        layout: "/staff",
        breadcrumb: "TasksManagement"
      }, {
        path: "/timeline",
        name: "TimeLine",
        rtlName: "Lịch công việc",
        icon: TimeLine,
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
      }
    ]
  },
  {
    layout:"/hr",
    routes:[
      {
        path: "",
        name: "Dashboard",
        rtlName: "Tổng quan",
        icon: Dashboard,
        component: AdminDashboard,
        layout: "/hr",
        breadcrumb: "Dashboard"
      },
      {
        path: "/human",
        name: "Human Resources",
        rtlName: "Nhân sự",
        icon: RecentActors,
        component: EmployeeManagement,
        layout: "/hr",
        breadcrumb: "HumanResources"
      },{
        path: "/timekeeping",
        name: "Timekeeping",
        rtlName: "Chấm công",
        icon: Today,
        component: TimeKeeping,
        layout: "/hr",
        breadcrumb: "Timekeeping"
      }, {
        path: "/request",
        name: "Request",
        rtlName: "Xin phép nghỉ",
        icon: LibraryBooks,
        component: Request,
        layout: "/hr",
        breadcrumb: "Request"
      },  {
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
    ]
  }
];

export default manageRoutes;