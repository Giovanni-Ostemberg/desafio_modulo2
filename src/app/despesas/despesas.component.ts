import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Despesa{
  tipo: number;
  fornec: string
  ano: number;
  mes: number;
  dia: number;
  valor:number; 
}

interface DespesasSenador{
  id:number;
  nomeSenador:string;
  despesas:Despesa[];
}

interface DespesasTipo{
  nome:string;
  total:string;
}

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {

  displayedColumns = ["Tipo", "Fornecedor", "Data", "Valor"];
  despesasSenadores: DespesasSenador[] = [];
  id:number = 0;
  despesas:Despesa[] = [];
  despesasSenador:DespesasSenador;
  despesasTipo:DespesasTipo[]=[];
  totalGasto:number = 0;
  constructor(private http: HttpClient, private route:ActivatedRoute) {
    this.http
      .get<DespesasSenador[]>('http://localhost:3000/despesasSenadores')
      .subscribe((data) => {
        this.despesasSenador = data.find(sen=>{
          console.log(sen.id===+this.id);
          if(sen.id===+this.id){
            this.despesas = sen.despesas;
            this.distribuirDespesas();
            console.log(sen.nomeSenador);
            return{
              id:sen.id,
            nome:sen.nomeSenador,
            despesas: this.despesas
            }



          }
          
        })
      });
      
    
    }
    
    
    ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap) => {
        this.id = this.route.snapshot.params.id;
      });
      
  }

  identificarTipo(tipo){
    switch(+tipo){
      case 1: return "Aluguel de imóveis e despesas concernentes a eles";
      case 2:return "Divulgação da atividade parlamentar";
      case 3:return "Aquisição de material de consumo para uso no escritório.";
      case 4:return "Passagens aéreas, aquáticas e terrestres nacionais";
      case 5:return "Contratação de consultorias, assessorias, pesquisas, trabalhos técnicos e outros serviços";
      case 6:return "Locomoção, hospedagem, alimentação e combustíveis";
      case 7:return "Serviços de Segurança Privada";
    }
  }

  distribuirDespesas(){
    for(let i = 1; i<=7; i++){
      let despesaValor = this.despesas.reduce((acc,curr)=>{
      if(+curr.tipo === +i){
        console.log(acc);
        return +acc + +curr.valor;
      }else{
        return acc + 0;
      }
      }, 0);
      this.totalGasto += +despesaValor.toFixed(2);
      despesaValor!==0 ? this.despesasTipo.push({
        nome:this.identificarTipo(i),
        total: despesaValor.toFixed(2),
      }) : null;
    }
  }

}
