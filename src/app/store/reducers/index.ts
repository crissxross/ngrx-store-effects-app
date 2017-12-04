
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
}

// selector functions
export const getRouterState = createFeatureSelector<
 fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState; // <- destructured
    const { queryParams } = routerState.root; // <- destructured

    let state: ActivatedRouteSnapshot = routerState.root;
    // traversing the router state tree
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state; // <- destructured, which is same as:
    // const params = state.params;

    return { url, queryParams, params };
  }
}
