import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutePipe'
})
export class MinutePipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const  temp = value * 60;
    const hours = Math.floor((temp / 3600));
    const minutes = value % 60;

    if (minutes < 10){
      return hours + ':' + '0' + minutes;
    } else {
      return hours + ':' + minutes;
    }
  }

}
