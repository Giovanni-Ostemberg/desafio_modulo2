import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Senador {
  nomeSenador: string;
  id: number;
}

@Component({
  selector: 'app-senadores',
  templateUrl: './senadores.component.html',
  styleUrls: ['./senadores.component.css'],
})
@Injectable()
export class SenadoresComponent implements OnInit {
  senadores: Senador[] = [];
  constructor(private http: HttpClient) {
    this.http
      .get<Senador[]>('http://localhost:3000/senadores')
      .subscribe((data) => {
        this.senadores = data;
      });
  }

  ngOnInit(): void {}
}
