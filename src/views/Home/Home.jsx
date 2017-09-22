import React from 'react';
import { Switch, Route ,Redirect} from 'react-router';
import Header from '../../components/Header/Header';
import Bandstand from '../../components/Bandstand/Bandstand';
import MyCenter from '../MyCenter/MyCenter';
import MusicClub from '../MusicClub/MusicClub';
import Discovery from '../Discovery/Discovery';
import './Home.scss';
class Home extends React.Component {
    render() {
        return (
            <div className="qqMusic-home">
                <Header className="qqMusic-home-header" />                                                             
                <Switch >      
                    <Redirect exact from="/" to="/myCenter"/>                    
                    <Route path="/myCenter"  component={MyCenter} />
                    <Route path="/musicClub" component={MusicClub} />
                    <Route path="/discovery" component={Discovery} />
                </Switch>
                <Bandstand/>
            </div>
        );
    }
}
export default Home;