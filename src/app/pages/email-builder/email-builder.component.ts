import { Component, OnInit } from '@angular/core';
import { EmailBuilderService } from 'src/app/services/email-builder.service';

@Component({
  selector: 'app-email-builder',
  templateUrl: './email-builder.component.html',
  styleUrls: ['./email-builder.component.scss']
})
export class EmailBuilderComponent implements OnInit {
    title = 'email-builder';
    draggedBlock: any;
  
    blocks = [
      { id: 1, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633701431icon1.svg' },
      { id: 2, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633764856icon2.svg' },
      { id: 3, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633781278icon3.svg' },
      { id: 4, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633798996icon4.svg' },
      { id: 5, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633820638icon5.svg' },
      { id: 6, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633833480icon6.svg' },
      { id: 7, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633848794icon7.svg' },
      { id: 8, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633859583icon8.svg' },
      { id: 9, icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633872127icon9.svg' },
    ];
   constructor (private eBuilder: EmailBuilderService){

   }

   ngOnInit(){
    console.log(this.eBuilder.ping("leftCardOne"))
    console.log(this.eBuilder.ping("leftCardTwo"))
    console.log(this.eBuilder.pong({"leftCardOne" : true}))
    console.log(this.eBuilder.pong({"leftCardTwo" : true}))
   }

    onDragStart(event: any, block: any) {
      this.draggedBlock = block;
    }
  
    onDrop(event: any) {
      event.preventDefault();
      if (this.draggedBlock) {
        const dropArea = event.target;
        const blockHTML = `<img src="${this.draggedBlock.icon}" class="block-image" />`;
        dropArea.innerHTML += blockHTML;
        this.draggedBlock = null; 
      }
    }
  
    allowDrop(event: any) {
      event.preventDefault();
    }
  }
  