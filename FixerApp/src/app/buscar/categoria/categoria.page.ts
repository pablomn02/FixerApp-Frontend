import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryStyleService } from 'src/app/shared/services/category-style.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: false
})
export class CategoriaPage implements OnInit {
  idCategoria: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoriaStyleService: CategoryStyleService
  ) {}

  ngOnInit() {
    this.idCategoria = this.route.snapshot.paramMap.get('idCategoria');
  }

  getIcon(category: string | null): string {
    return category ? this.categoriaStyleService.getIcon(category) : 'construct-outline';
  }
}