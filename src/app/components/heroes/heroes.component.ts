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

  // hero: Hero = {
  //   name: 'Windstorm',
  //   id: 1
  // }


  // selectedHero?: Hero;

  heroes: Hero[] = [];


  constructor(private heroServ: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageServ.add(`Ciao, sono l'hero component, ti avveto che hanno selezionato l'eroe con l'id =${this.selectedHero.id}, ossia ${this.selectedHero.name}`)
  // }
  getHeroes(){
    this.heroServ.getHeroes().subscribe({
     next: newHeroes => this.heroes = newHeroes,
     error: err => console.log(err)
    })
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroServ.addHero({ name } as Hero).subscribe({
      next: (hero) => this.heroes.push(hero),
      error: (err) => console.log(err)

  });
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroServ.deleteHero(hero.id).subscribe({
      next: (hero) => this.heroes = this.heroes.filter(h => h.id !== hero.id),
      error: (err) => console.log(err)
    });
  }


}




