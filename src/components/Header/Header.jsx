import React from 'react';
import { NavLink } from 'react-router-dom'
import './Header.scss';
import Slider from '../Slider/Slider';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docked: false
        }
    }
    openChange() {
        this.setState({
            docked: !this.state.docked
        });
    }
    render() {
        return (
            <div>
                <div className="qqMusic-header">
                    <div className="qqMusic-header-top">
                        <i className="qqMusic-header-icon-left" onTouchStart={this.openChange.bind(this)}></i>
                        <NavLink className="qqMusic-tab" activeClassName="qqMusic-tab-active" to="/myCenter" replace>我的</NavLink>
                        <NavLink className="qqMusic-tab" activeClassName="qqMusic-tab-active" to="/musicClub" replace>音乐馆</NavLink>
                        <NavLink className="qqMusic-tab" activeClassName="qqMusic-tab-active" to="/discovery" replace>发现</NavLink>
                        <i className="qqMusic-header-icon-right"></i>
                    </div>
                    <div className="qqMusic-header-bottom">
                        <div className="qqMusic-header-search">
                            <i className="qqMusic-search-icon"></i>
                            <span className="qqMusic-search-text">搜索</span>
                        </div>
                    </div>
                </div>
                <Slider docked={this.state.docked} openChange={this.openChange.bind(this)}></Slider>
            </div>
        );
    }
}
export default Header;