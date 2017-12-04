import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as toppingActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';
import { error } from 'util';

@Injectable()
export class ToppingsEffects {
  constructor(private actions$: Actions, private toppingsService: fromServices.ToppingsService) { }

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map(toppings => new toppingActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingActions.LoadToppingsFail(error)))
      );
    })
  );
}
