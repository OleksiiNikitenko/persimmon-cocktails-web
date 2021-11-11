import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public menuItems: Array<{
    text: string,
    url: string,
    isActive: boolean
  }> = [
    {
      text: 'My blog',
      url: '/blog',
      isActive: true,
    },
    {
      text: 'Friends',
      url: '/friends',
      isActive: false,
    },
    {
      text: 'My ingredients',
      url: '/ingredients',
      isActive: false,
    },
    {
      text: 'Events',
      url: '/events',
      isActive: false,
    },
    {
      text: 'Cocktails',
      url: '/cocktails',
      isActive: false,
    },
    {
      text: 'Settings',
      url: '/settings',
      isActive: false,
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
