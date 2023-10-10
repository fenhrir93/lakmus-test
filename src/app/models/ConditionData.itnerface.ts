import { Diagnosis } from './Diagnosis.interface';

export interface Condition {
  condition: Diagnosis;
  notes: string;
}

export interface ConditionData {
  conditions: Condition[];
  date: string;
}
