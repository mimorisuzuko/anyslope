import React, { PureComponent } from 'react';
import { css } from 'emotion';
import actions from '../actions';
import Sidebar from './Sidebar';
import { ipcRenderer } from 'electron';
import Preferences from './Preferences';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Body from './Body';
import { connect } from 'react-redux';

@connect()
class App extends PureComponent {
    constructor() {
        super();

        ipcRenderer.on('menu:preferences', this.onClickPreferencesOfMenuItem);
    }

    onClickPreferencesOfMenuItem = () => {
        const {
            props: { dispatch }
        } = this;

        dispatch(actions.setPreferencesState(true));
    };

    render = () => {
        return (
            <div
                className={css({
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row'
                })}
            >
                <Sidebar />
                <Body />
                <Preferences />
                <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable={false}
                    pauseOnHover
                />
            </div>
        );
    };
}

export default App;
