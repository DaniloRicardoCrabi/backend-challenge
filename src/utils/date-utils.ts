import { Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { addDays, format, isBefore, isValid, parseISO } from 'date-fns';
import isAfter from 'date-fns/isAfter';

export class DateUtils {

  public isValidFormat: boolean;
  public dateIsBefore: boolean;
  public dateEntity: Date;
  public dateResult: string;
  public goal: string;

  constructor(goal: string) {
    this.goal = goal
  }

  public validateDate(): void {

    const char = '/'
    const replacer = new RegExp(char, 'g')
    const DateNow = new Date();

    try {
      var dateFormat;
      this.goal = this.goal.trim();
      this.goal = this.goal.replace(replacer, '-');
      const splitGoal = this.goal.split('-');
      if (splitGoal.length === 2)
        dateFormat = `${splitGoal[1]}-${splitGoal[0]}-${('0' + DateNow.getDate()).slice(-2)} 00:00:00`;
      if (splitGoal.length === 3)
        dateFormat = `${splitGoal[2]}-${splitGoal[1]}-${splitGoal[0]} 00:00:00`;
      const parsedDate = parseISO(dateFormat);
      if (isValid(parsedDate))
        this.isValidFormat = true;
      this.dateEntity = parsedDate;
      this.dateIsBefore = isBefore(addDays(new Date(), -1), this.dateEntity);

    } catch (error) {
      this.dateResult = error;
    }
  }
}