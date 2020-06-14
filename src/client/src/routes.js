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
import LibraryBook from "@material-ui/icons/LibraryBooks"
import SettingsEthernet from "@material-ui/icons/SettingsEthernet"
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
  AdminDashboard,
  ProjectOverview,
  ProjectView,
  WikiManagement,
  WebHookMangement
} from "./views";

const manageRoutes = [
  //Admin
  {
    layout: "/admin",
    routes: [{
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
        breadcrumb: "Projects",
        routes: [{
            path: "",
            component: ProjectOverview,
            layout: "/admin/projects",
          },
          {
            path: "/:projectId",
            component: ProjectView,
            layout: "/admin/projects",
          }
        ]
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
      },
      {
        path: "/wiki",
        name: "Wiki",
        rtlName: "Wiki",
        icon: LibraryBook,
        component: WikiManagement,
        layout: "/admin",
        breadcrumb: "Wiki",
        routes: [{
          path: "/:wikiId",
          component: WikiManagement,
          layout: "/admin/wiki",
        }]
      },
      {
        path: "/webhook",
        name: "Webhook",
        rtlName: "Webhook",
        icon: SettingsEthernet,
        component: WebHookMangement,
        layout: "/admin",
        breadcrumb: "Webhook"
      }
    ]
  },
  {
    layout: "/lead",
    routes: [{
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
        breadcrumb: "Projects",
        routes: [{
            path: "",
            component: ProjectOverview,
            layout: "/lead/projects",
          },
          {
            path: "/:projectId",
            component: ProjectView,
            layout: "/lead/projects",
          }
        ]
      },
      {
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
    layout: "/staff",
    routes: [{
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
        breadcrumb: "Projects",
        routes: [{
            path: "",
            component: ProjectOverview,
            layout: "/staff/projects",
          },
          {
            path: "/:projectId",
            component: ProjectView,
            layout: "/staff/projects",
          }
        ]
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
    layout: "/hr",
    routes: [{
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