import { DashboardOutlined, ProjectOutlined, ClusterOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
        name: 'dashboard',
        list: '/',
        meta: {
            label: 'Dashboard',
            icon: <DashboardOutlined />
        }
    },
    {
      name: 'department',
      list: '/department',
      show: '/department/:id',
      create: '/department/new',
      edit: 'department/edit/:id',
      meta: {
        label: 'Department',
        icon: <ClusterOutlined />
      }
    },
    {
        name: 'tasks',
        list: '/tasks',
        show: '/tasks/:id',
        create: '/tasks/new',
        edit: 'tasks/edit/:id',
        meta: {
          label: 'Tasks',
          icon: <ProjectOutlined />
        }
      }

]