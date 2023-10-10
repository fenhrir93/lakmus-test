import { Injectable } from '@angular/core';
import { ConditionData } from 'src/app/models/ConditionData.itnerface';
import { guuId } from 'src/app/utils/guuid';

@Injectable()
export class DiagnoseSequelizeService {
  sequelizeData({ date, conditions }: ConditionData) {
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
      id: guuId(),
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
}
