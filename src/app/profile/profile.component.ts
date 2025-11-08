import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  leftNav = [
    {
      name: "Abigael Reyes",
      url: "/profile",
      type: "text",
      section: "profiles"
    }
  ];

  rightNav = [
    {
      name: "About",
      url: "/about",
      type: "text",
      section: "abouts"
    },
    {
      name: "Projects",
      url: "/projects",
      type: "text",
      section: "projects"
    },
    {
      name: "View Resume",
      url: "/resume",
      type: "button",
      section: "resume",
      action: "view-resume",
    }
  ];

  jobPosition = "Front-end Developer"
  jobDescription = "I design and code beautifully simple things, and I love what I do."
  projectDescription = "My design projects"
  gitHub = "GitHub";
  linkedin = "Linkedin";

  projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio built with Angular and Bootstrap.',
      image: 'assets/images/portfolio-website.png',
      link: '/profile'
    },
    {
      title: 'Admin Application',
      description: 'A responsive Angular Admin Dashboard with user management and CRUD functionality.',
      image: 'assets/images/admin-app.png',
      link: '/admin/dashboard'
    },
    {
      title: 'Login Page A',
      description: 'A responsive Angular for Log in Page.',
      image: 'assets/images/login-app.png',
      link: '/login'
    }
  ];

  socials = [
    {
      title: 'Linkedin',
      icon: 'bi bi-linkedin',
      link: 'https://www.linkedin.com/in/abigael-reyes-663874389/'
    },
    {
      title: 'GitHub',
      icon: 'bi bi-github',
      link: 'https://github.com/abigaelreyes924-ux/my-angular-project/tree/dev'
    }
  ];

  aboutTitle = "Hi, I’m Abbie. Nice to meet you."
  aboutDescription = "I'm a Frontend Focused Web Developer building and managing the Front-end of Websites with a strong passion for building modern, responsive, and user-focused web applications. I specialize in Angular, TypeScript, HTML, SCSS, and Bootstrap, developing clean, maintainable code that brings both performance and design to life."
  skillTitle = "My Skills"

  skills = [
    {
      title: 'Angular',
    },
    {
      title: 'HTML',
      icon: 'bi bi-filetype-html',
    },
    {
      title: 'SCSS',
      icon: 'bi bi-filetype-scss',
    },
    {
      title: 'JavaScript',
      icon: 'bi bi-javascript',
    },
    {
      title: 'Responsive Design',
    },
    {
      title: 'GIT',
      icon: 'bi bi-git',
    },
    {
      title: 'BootStrap',
      icon: 'bi bi-bootstrap-fill',
    },
    {
      title: 'TypeScript',
      icon: 'bi bi-typescript',
    },
    {
      title: 'GitHub',
      icon: 'class="bi bi-github',
    },
    {
      title: 'SEO',
    },
    {
      title: 'Google Analytics',
    }
  ];

  footerDescription = "Living, learning, & leveling up one day at a time."
  socialFooter = "Social"
  footerLower = "© Copyright 2025 Abigael L. Reyes"

  icons = [
    {
      icon: 'bi bi-linkedin',
      link: 'https://www.linkedin.com/in/abigael-reyes-663874389/'
    },
    {
      icon: 'bi bi-github',
      link: 'https://github.com/abigaelreyes924-ux/my-angular-project/tree/dev'
    },
    {
      icon: 'bi bi-instagram',
      link: ''
    },
    {
      icon: 'bi bi-facebook',
      link: ''
    },
    {
      icon: 'bi bi-envelope',
      link: ''
    }
  ];

  isMobile = false;
  isMenuOpen = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  viewProject(link: string) {
    console.log('viewProject: ', link);
    if(link == '/profile') {
      window.open(link, '_self');
    } else {
      this.router.navigate([link], { relativeTo: this.activatedRoute })
    }
  }

  viewSocials(link: string) {
    console.log('viewSocials: ', link);
    window.open(link, '_blank');
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // You can adjust breakpoint here
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleAction(action?: string) {
    if (action === 'view-resume') {
      this.viewResume();
    }
  }

  viewResume() {
    console.log('viewResume');
    const googleDriveLink = 'https://drive.google.com/drive/u/1/folders/1hIMNygmZ8ZzKJzdEvUPiuDmK8kD-y0EE';
    window.open(googleDriveLink, '_blank');
  }

}
