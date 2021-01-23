import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home } from './home';
import { Tasks } from './tasks';
import { Time } from './time';

export const Routes: React.FC<unknown> = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/tasks'>
                <Tasks />
            </Route>
            <Route path='/time'>
                <Time />
            </Route>
        </Switch>
    );
}