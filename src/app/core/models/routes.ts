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
    text: 'My blog',
    url: '/blog',
    isActive: true,
    canActivate: [Roles.User]
  },
  {
    text: 'Friends',
    url: '/friends',
    isActive: false,
    canActivate: [Roles.User]
  },
  {
    text: 'My ingredients',
    url: '/ingredients',
    isActive: true,
    canActivate: [Roles.User, Roles.Moderator, Roles.Admin]
  },
  {
    text: 'My kitchenware',
    url: '/kitchenware',
    isActive: true,
    canActivate: [Roles.User, Roles.Moderator, Roles.Admin]
  },
  {
    text: 'Events',
    url: '/events',
    isActive: false,
    canActivate: [ Roles.User, Roles.Moderator, Roles.Admin]
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
  // {
  //   text: 'Login',
  //   url: '/login',
  //   isActive: false,
  //   // canActivate: [Roles.Admin, Roles.User, Roles.Moderator]
  //   canActivate: [Roles.Anonymous]
  // },
]
