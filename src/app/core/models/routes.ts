
import {ROLE} from "../../modules/login/model/auth/role";
export const routes = [
  {
    text: 'My account',
    url: '/account',
    isActive: true,
    canActivate: [ROLE.Admin, ROLE.Moderator]
  },
  {
    text: 'Moderators',
    url: '/moderators',
    isActive: true,
    canActivate: [ROLE.Admin]
  },
  {
    text: 'My blog',
    url: '/blog',
    isActive: true,
    canActivate: [ROLE.Authorised]
  },
  {
    text: 'Friends',
    url: '/friends',
    isActive: false,
    canActivate: [ROLE.Authorised]
  },
  {
    text: 'My ingredients',
    url: '/ingredients',
    isActive: true,
    canActivate: [ROLE.Authorised, ROLE.Moderator, ROLE.Admin]
  },
  {
    text: 'My kitchenware',
    url: '/kitchenware',
    isActive: true,
    canActivate: [ROLE.Authorised, ROLE.Moderator, ROLE.Admin]
  },
  {
    text: 'Events',
    url: '/events',
    isActive: false,
    canActivate: [ ROLE.Authorised, ROLE.Moderator]
  },
  {
    text: 'Cocktails',
    url: '/cocktails',
    isActive: false,
    canActivate: [ROLE.Admin, ROLE.Authorised, ROLE.Moderator, undefined]
  },
  {
    text: 'Settings',
    url: '/settings',
    isActive: false,
    canActivate: [ROLE.Admin, ROLE.Authorised, ROLE.Moderator]
  },
  {
    text: 'Login',
    url: '/login',
    isActive: false,
    canActivate: [ROLE.Admin, ROLE.Authorised, ROLE.Moderator, undefined]
  },
]
