import { Pipe, PipeTransform } from '@angular/core';
import { professionalData } from '../professional/types/professional.types';

@Pipe({
  name: 'professionalsSearch'
})
export class ProfessionalsSearchPipe implements PipeTransform {

  transform(
    value: professionalData[], searchValue: string, professionals : professionalData[], skip : number, endIndex : number
  ): professionalData[] {
    if (professionals.length === 0 || !searchValue) {
      return value;
    }
    const users: professionalData[] = [];
    const pattern = new RegExp(searchValue, 'i');
    for (const professional of professionals) {
      if (pattern.test(professional['firstName'] + ' ' + professional['lastName']) || pattern.test(professional['field'])) {
        users.push(professional);
      }
    }
    return users.slice(skip, endIndex)
  }
  

}
