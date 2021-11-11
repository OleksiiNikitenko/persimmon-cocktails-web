import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  // private menuItemModel: {
  //   text: string,
  //   url: string,
  //   isActive: boolean
  // }

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

  ngOnInit(): void { }

  navigateHandler(itemText: string): void {
    this.menuItems.map(item => {
      if (item.text !== itemText) {
        item.isActive = false
      } else {
        item.isActive = true
      }

      return item
    })
  }

}
