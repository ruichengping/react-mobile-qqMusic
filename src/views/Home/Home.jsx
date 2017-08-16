import React from 'react';
import { Switch, Route } from 'react-router';
import Header from '../../components/Header/Header';
import MyCenter from '../MyCenter/MyCenter';
import MusicClub from '../MusicClub/MusicClub';
import Discovery from '../Discovery/Discovery';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/myCenter"  component={MyCenter} />>
                    <Route path="/musicClub" component={MusicClub} />
                    <Route path="/discovery" component={Discovery} />
                </Switch>
            </div>
        );
    }
}
export default Home;