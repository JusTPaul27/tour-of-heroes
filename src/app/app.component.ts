import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'Lista studenti';
  // students: string[] = ['Pippo', 'Pluto', 'Fabio', 'Paperino', 'Gigi', 'Luigi', 'Gastone'];
  students2: any[] = [
    {
      name: 'pippo',
      grade: 10
    },
    {
      name: 'pluto',
      grade: 7
    },
    {
      name: 'franco',
      grade: 8.5
    },
    {
      name: 'massimo',
      grade: 4.5
    },
    {
      name: 'giovanni ',
      grade: 7
    }
  ]

  constructor(){

  }
  ngOnInit(){
    // const container = document.getElementById('app-container');
    // const h1 = document.createElement('h1');
    // const node = document.createTextNode(this.title);

    // h1.appendChild(node);
    // container?.appendChild(h1);

    // const ul = document.createElement('ul');

    // for (const item of this.students) {
    //   const li = document.createElement('li')
    //   const node = document.createTextNode(item);
    //   li.appendChild(node);
    //   ul.appendChild(li);
    // }

    // container?.appendChild(ul);
  }
}
