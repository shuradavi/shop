import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store, { persistor } from './store/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
			<Provider store={store}>
				{/* <PersistGate loading={null} persistor={persistor} > */}
					<App />
				{/* </PersistGate> */}
			</Provider>
	</BrowserRouter>
);
