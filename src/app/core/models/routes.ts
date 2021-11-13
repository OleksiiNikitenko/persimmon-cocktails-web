import {Roles} from "./roles";

export const routes = [
  {
    text: 'My account',
    url: '/account',
    isActive: true,
    canActivate: [Roles.Admin, Roles.Moderator]
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
    isActive: false,
    canActivate: [Roles.User]
  },
  {
    text: 'Events',
    url: '/events',
    isActive: false,
    canActivate: [ Roles.User, Roles.Moderator]
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
  }
]
