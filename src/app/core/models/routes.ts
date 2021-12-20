import {Roles} from "./roles";

export const routes = [
  {
    text: 'My account',
    url: '/account',
    isActive: true,
    canActivate: [Roles.Admin, Roles.Moderator, Roles.User]
  },
  {
    text: 'Moderators',
    url: '/moderators',
    isActive: true,
    canActivate: [Roles.Admin]
  },
  {
    text: 'Friends',
    url: '/friends',
    isActive: false,
    canActivate: [Roles.User, Roles.Moderator, Roles.Admin]
  },
  {
    text: 'Ingredients',
    url: '/ingredients',
    isActive: true,
    canActivate: [Roles.User, Roles.Moderator, Roles.Admin]
  },
  {
    text: 'Kitchenware',
    url: '/kitchenware',
    isActive: true,
    canActivate: [Roles.User, Roles.Moderator, Roles.Admin]
  },
  {
    text: 'Personal stock',
    url: '/stock',
    isActive: true,
    canActivate: [Roles.User]
  },
  {
    text: 'Cocktails',
    url: '/cocktails',
    isActive: false,
    canActivate: [Roles.Admin, Roles.User, Roles.Moderator, Roles.Anonymous]
  },
  {
    text: 'Settings',
    url: '/settings',
    isActive: false,
    canActivate: [Roles.Admin, Roles.User, Roles.Moderator]
  },
]
