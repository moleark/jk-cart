import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

let RouterView: React.FC<any> = (props) => {
    const { routerConfig } = props;
    let routerView = routerConfig.filter((item: any) => !item.redirect);
    let routerRedirect = routerConfig.filter((item: any) => item.redirect);
    return (
        <Switch>
            {
                routerView.map((item: any) => {
                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            render={(props) => {
                                return (
                                    <item.component
                                        title={item.title}
                                        routerConfig={item.children}
                                        {...props}
                                    />
                                )
                            }}
                        />
                    )
                }).concat(
                    routerRedirect.map((item: any) => {
                        return (
                            <Redirect
                                key={item.path}
                                from={item.path}
                                to={item.redirect}
                            />
                        )
                    })
                )
            }
        </Switch>
    )
}


export default RouterView;