// 此文件由 scripts/generateMenu/index.ts 自动生成
// 请勿手动修改！如需更改菜单，请在对应的 app 目录下修改 page.tsx 中的 definePageMeta。

export const menuConfig: MenuItem[] = [
  {
    key: '/dashboard',
    title: '工作台',
    sort: 1,
    icon: 'menus/happy',
    description: '系统数据大盘与快捷操作',
  },
  {
    key: '/system',
    title: '系统管理',
    sort: 99,
    icon: 'menus/serious',
    redirect: '/system/user',
    children: [
      {
        key: '/system/user',
        title: '用户管理',
        sort: 1,
        icon: 'menus/hey',
        description: '系统账号与用户信息管理',
      },
      {
        key: '/system/role',
        title: '角色管理',
        sort: 2,
        icon: 'menus/strong',
        description: '系统角色与权限分配管理',
      },
    ],
  },
];
