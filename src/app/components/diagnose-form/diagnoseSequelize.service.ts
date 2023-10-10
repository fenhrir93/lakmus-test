import { Injectable } from '@angular/core';
import { Condition, Data } from './diagnose-form.component';
import { NonNullAssert } from '@angular/compiler';

@Injectable()
export class DiagnoseSequelizeService {
  sequelizeData({ date, conditions }: Data) {
    const formattedData = {
      encounter: {
        date,
      },
    };

    const conditionsArr = [];

    conditions.forEach((conditionData) => {
      if (
        conditionData.condition !== null &&
        conditionData.condition !== undefined &&
        conditionData.condition.id !== null
      ) {
        conditionsArr.push(this.getConditions(conditionData));
      } else {
        return;
      }
      formattedData['conditions'] = conditionsArr;
    });

    return formattedData;
  }

  private getConditions(condition) {
    if (!condition) {
      return null;
    }

    return {
      id: this.generateUuid(),
      context: {
        identifier: {
          type: {
            coding: [
              {
                system: 'eHealth/resources',
                code: 'encounter',
              },
            ],
          },
          value: condition.id,
        },
      },
      code: {
        coding: [
          {
            system: 'eHealth/ICPC2/condition_codes',
            code: condition.code,
          },
        ],
      },
      notes: condition.notes ?? '',
      onset_date: new Date(),
    };
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
