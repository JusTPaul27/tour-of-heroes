import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero/hero.service';
import { MessageService } from 'src/app/services/hero/messages/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  hero: Hero = {
    name: 'Windstorm',
    id: 1
  }


  selectedHero?: Hero;

  heroes: Hero[] = [];


  constructor(private heroServ: HeroService, private messageServ: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageServ.add(`Ciao, sono l'hero component, ti avveto che hanno selezionato l'eroe con l'id =${this.selectedHero.id}, ossia ${this.selectedHero.name}`)
  }
  getHeroes(){
    this.heroServ.getHeroes().subscribe({
     next: newHeroes => this.heroes = newHeroes,
     error: err => console.log(err)
    })


  }
}




