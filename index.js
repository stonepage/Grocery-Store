/**
 * 主程序入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './client/router/appRouter';
import RHL from './client/config/rhl';


RHL(AppRouter, 'app');


if (module.hot) {
	module.hot.accept('./client/router/appRouter', ()=> {
		RHL(AppRouter, 'app');
	});
}


// Warning:
// render(): Calling ReactDOM.render() to hydrate server-rendered markup will stop working in React v17.
// Replace the ReactDOM.render() call with ReactDOM.hydrate() if you want React to attach to the server HTML.




