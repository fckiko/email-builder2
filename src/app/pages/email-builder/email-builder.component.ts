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
  hasContent = false; // Tracks if content has been dropped

  blocks = [
    { id: 1, type: 'image', icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633833480icon6.svg' },
    { id: 2, type: 'text', icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633820638icon5.svg' },
    { id: 3, type: 'column', icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633701431icon1.svg' },
    { id: 4, type: 'header', icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633798996icon4.svg' },
    { id: 5, type: 'button', icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633764856icon2.svg' },
    { id: 6, type: 'divider', icon: 'https://img.jlmconsulting.services/fit-in/64x88/sls_1726633781278icon3.svg' }
  ];

  constructor(private eBuilder: EmailBuilderService) {}

  ngOnInit() {
    console.log(this.eBuilder.ping("leftCardOne"));
    console.log(this.eBuilder.ping("leftCardTwo"));
    console.log(this.eBuilder.pong({ "leftCardOne": true }));
    console.log(this.eBuilder.pong({ "leftCardTwo": true }));
  }

  onDragStart(event: any, block: any) {
    this.draggedBlock = block;
  }

  onDrop(event: any) {
    event.preventDefault();
    if (this.draggedBlock) {
      this.hasContent = true; // Set content flag to true once something is dropped
      const dropArea = event.target;
      let blockHTML = '';

      switch (this.draggedBlock.type) {
        case 'image':
          // Create a file input dynamically to handle image upload
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.style.display = 'none';
          
          fileInput.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                const imageSrc = e.target.result;
                blockHTML = `
                  <div class="block-image" style="display: flex; justify-content: center; margin: 10px 0;">
                    <img src="${imageSrc}" style="max-width: 100%; padding: 5px;" alt="Uploaded Image">
                  </div>`;
                dropArea.innerHTML += blockHTML;
              };
              reader.readAsDataURL(file);
            }
          };
          fileInput.click();
          break;
        case 'text':
          blockHTML = `<div contenteditable="true" class="block-text">Insert your text here</div>`;
          break;
        case 'column':
          blockHTML = `
            <div class="block-column" style="display: flex;">
              <div contenteditable="true" class="block-column-text" style="flex: 1; padding: 5px; border: 1px solid #8752c4;">Column 1</div>
              <div contenteditable="true" class="block-column-text" style="flex: 1; padding: 5px; border: 1px solid #8752c4;">Column 2</div>
            </div>`;
          break;
        case 'header':
          blockHTML = `<h1 contenteditable="true" class="block-header">Insert your header here</h1>`;
          break;
        case 'button':
          blockHTML = `<button class="block-button" style="padding: 10px 20px; background-color: #007BFF; color: white; border: none; cursor: pointer;">Click Here</button>`;
          break;
        case 'divider':
          blockHTML = `<hr class="block-divider" style="border: 1px solid #8752c4; margin: 20px 0;">`;
          break;
        default:
          break;
      }

      dropArea.innerHTML += blockHTML;
      this.draggedBlock = null;
    }
  }

  allowDrop(event: any) {
    event.preventDefault();
  }
}
