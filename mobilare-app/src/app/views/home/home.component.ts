import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherCloud, featherMoon, featherSun } from '@ng-icons/feather-icons';
import Chart from 'chart.js/auto';
import { ProdutoService } from '../produtos/produto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ featherSun, featherMoon, featherCloud })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  city: string = "São Paulo";
  weatherData: any;
  chart: any = [];
  dataChart: number[] = [];

  private homeService = inject(HomeService);
  private produtoService = inject(ProdutoService);

  ngOnInit() {
    this.weatherData = {
      main : {},
      isDay: true
    };
    this.loadProdutos();
    this.getWeather();
  }


  getWeather() {
    this.homeService.getWeather(this.city).subscribe((data: any) => {
      this.setWeatherData(data)
    })
  }

  setWeatherData(data: any){
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = this.weatherData.main.temp;
    this.weatherData.temp_min = this.weatherData.main.temp_min;
    this.weatherData.temp_max = this.weatherData.main.temp_max;
    this.weatherData.temp_feels_like = this.weatherData.main.feels_like;
  }

  loadProdutos(): void {
    this.produtoService.getProdutos()
    .subscribe({
      next: (produtos: any) => {
        this.dataChart = [produtos.filter((produto: any) => produto.category === 'Atacado').length, produtos.filter((produto: any) => produto.category === 'Varejo').length, produtos.filter((produto: any) => produto.category === 'Internacional').length];
        this.renderChart(this.dataChart);
        },
        error: (e: any) => { console.error(e);}
      });
  }

  renderChart(dataToPopulate: number[]) {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: [
          'Atacado',
          'Varejo',
          'Internacional'
        ],
        datasets: [{
          label: 'Produtos',
          data: dataToPopulate,
          backgroundColor: [
            '#203C86',
            '#636E93',
            '#EF8A6F'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
