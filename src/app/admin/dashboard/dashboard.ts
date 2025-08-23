import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements AfterViewInit {

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart() {
    new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['HTML', 'CSS', 'Javascript', 'Angular', 'SCSS', 'Git'],
        datasets: [{
          label: 'Ratings',
          data: [70, 60, 40, 20, 50, 40],
          backgroundColor: '#bc977d',
          borderColor: '#bc977d',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'My Skills'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

}
