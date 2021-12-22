import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportSearch'
})
export class ReportSearchPipe implements PipeTransform {

  transform(value: string): any[] {
    var fileArr = [
      { index: 1, name: 'Отчет №1 «Отчет по счетам»'},
      { index: 2, name: 'Отчет №2 «Информация о приеме счетов»'},
      { index: 3, name: 'Отчет №3 «Численность прикрепившихся застрахованных лиц»'},
      { index: 4, name: 'Отчет №4 «Акт сверки примененных штрафных санкций»'},
      { index: 5, name: 'Отчет №5 «Акт сверки стоимостных показателей»'},
      { index: 6, name: 'Отчет №6 «Акт сверки стоимостных показателей между информационными службами ТФОМС и СМО»'},
      { index: 7, name: 'Отчет №7 «Информация о плановых показателях»'},
    ]
    return fileArr.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()));
  }

}
