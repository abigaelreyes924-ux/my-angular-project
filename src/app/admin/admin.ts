import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  isSidebarMinimized = true;

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}
