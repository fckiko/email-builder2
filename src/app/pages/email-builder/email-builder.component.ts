import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailBuilderService } from 'src/app/services/email-builder.service';

@Component({
  selector: 'app-email-builder',
  templateUrl: './email-builder.component.html',
  styleUrls: ['./email-builder.component.scss']
})
export class EmailBuilderComponent implements OnInit {
  @ViewChild('dropArea') dropAreaRef!: ElementRef; // Reference to the drop area

  title = 'email-builder';
  draggedBlock: any;
  selectedBlock: any = null;
  hasContent = false; 

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

  onDragStart(event: DragEvent, block: any) {
    this.draggedBlock = block;
    event.dataTransfer?.setData('text/plain', JSON.stringify(block));
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.draggedBlock) {
      this.hasContent = true;
      const blockType = this.draggedBlock.type;

      let blockHTML = this.getBlockHTML(blockType);

      const dropArea = this.dropAreaRef.nativeElement;
      dropArea.innerHTML += blockHTML;
      this.draggedBlock = null;
      this.attachClickEventsToBlocks();
    }
  }
  attachClickEventsToBlocks() {
    const dropArea = this.dropAreaRef.nativeElement;
    const blocks = dropArea.querySelectorAll('.block-text, .block-header, .block-button, .block-divider, .block-image');
    
    blocks.forEach((block: HTMLElement) => {
      block.addEventListener('click', () => {
        this.selectedBlock = {
          element: block,
          styles: {
            fontSize: window.getComputedStyle(block).fontSize,
            padding: window.getComputedStyle(block).padding,
            color: window.getComputedStyle(block).color,
            backgroundColor: window.getComputedStyle(block).backgroundColor,
          }
        };
      });
    });
  }

  updateBlockStyles() {
    if (this.selectedBlock) {
      const block = this.selectedBlock.element;
      const fontSizeValue = this.selectedBlock.styles.fontSize + 'px';
      block.style.fontSize = fontSizeValue;
      const paddingValue = this.selectedBlock.styles.padding + 'px';
      block.style.padding = paddingValue;
      block.style.color = this.selectedBlock.styles.color;
      block.style.backgroundColor = this.selectedBlock.styles.backgroundColor;
    }
  }

  closeSettings() {
    this.selectedBlock = null; // Close the settings panel by deselecting the block
  }
  getBlockHTML(type: string): string {
    let blockHTML = '';
    switch (type) {
      case 'image':
        this.handleImageBlock();
        break;
      case 'text':
        blockHTML = `<div contenteditable="true" class="block-text" style="textsize: 16px;">Insert your text here</div>`;
        break;
      case 'column':
        blockHTML = `
          <div class="block-column" style="display: flex;">
            <div contenteditable="true" class="block-column-text" style="flex: 1; padding: 5px; border: 1px solid #8752c4;">Column 1</div>
            <div contenteditable="true" class="block-column-text" style="flex: 1; padding: 5px; border: 1px solid #8752c4;">Column 2</div>
          </div>`;
        break;
      case 'header':
        blockHTML = `<h1 contenteditable="true" style="font-size: 40px" class="block-header">Insert your header here</h1>`;
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
    return blockHTML;
  }

  handleImageBlock() {
    // Create and click file input for image upload using Angular ViewChild
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', (event: any) => this.onImageUpload(event));
    document.body.appendChild(fileInput); // Add input to DOM temporarily
    fileInput.click();
    document.body.removeChild(fileInput); // Remove after click
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageSrc = e.target.result;
        const blockHTML = `
          <div class="block-image" style="display: flex; justify-content: center; margin: 10px 0;">
            <img src="${imageSrc}" style="max-width: 600px; padding: 5px;" alt="Uploaded Image">
          </div>`;
        const dropArea = this.dropAreaRef.nativeElement;
        dropArea.innerHTML += blockHTML;
      };
      reader.readAsDataURL(file);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  
   /* Export the email template as an HTML file*/
  exportTemplate() {
    const dropArea = this.dropAreaRef.nativeElement;
    const emailHTML = dropArea.innerHTML;
  
    const fullTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          body {
            background-color: grey;
            font-family: Arial, sans-serif;
          }
          .block-text {
            padding: 10px;
            border: 1px solid #ddd;
          }
          .block-column-text {
            border: 1px solid #8752c4;
          }
          .block-header {
            font-size: 24px;
            font-weight: bold;
          }
          .block-button {
            padding: 10px 20px;
            background-color: #007BFF;
            color: white;
            border: none;
            cursor: pointer;
          }
          .block-divider {
            margin: 20px 0;
          }
          .block-image img {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; align-items: center;">
        ${emailHTML}
      </div>
      </body>
      </html>
    `;
  
    const blob = new Blob([fullTemplate], { type: 'text/html' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'email-template.html';
    downloadLink.click();
  }
  
}
