import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailBuilderService {

  structure:string[] = []
  layer:any = {

  }

  constructor() { }
  ping(data: string){
    this.structure.push(data)
    return this.structure
  }
  pong(data: any){
    this.layer = {
      ...data
    }
    return this.layer
  }
}
