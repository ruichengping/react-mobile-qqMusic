import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popover, Toast } from 'antd-mobile';
import './Header.scss';
import Slider from '../Slider/Slider';
import Search from '../Search/Search';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docked: false,
            search: false,
            popover:false
        }
    }
    openChange() {
        this.setState({
            docked: !this.state.docked
        });
    }
    searchChange() {
        this.setState({
            search: !this.state.search
        });
    }
    popoverChange(visible){
        this.setState({
            popover:visible
        });
    }
    popoverSelect(options){
        if(options.key==="1"){
            Toast.offline('听歌识曲功能未开放', 1);
        }else if(options.key==="2"){
            Toast.offline('扫一扫功能未开放', 1);
        }
        this.setState({
            popover:false
        });
    }
    render() {
        const Item = Popover.Item;
        return (
            <div className={this.props.className}>
                <div className="qqMusic-header">
                    <div className="qqMusic-header-top">
                        <i className="qqMusic-header-icon-left" onClick={this.openChange.bind(this)}></i>
                        <NavLink className="qqMusic-tab" activeClassName="qqMusic-tab-active" to="/myCenter" replace>我的</NavLink>
                        <NavLink className="qqMusic-tab" activeClassName="qqMusic-tab-active" to="/musicClub" replace>音乐馆</NavLink>
                        <NavLink className="qqMusic-tab" activeClassName="qqMusic-tab-active" to="/discovery" replace>发现</NavLink>
                        <i className="qqMusic-header-icon-right" onClick={this.popoverChange.bind(this,true)}></i>
                        <Popover mask style={{left:0,right:0}}
                            visible={this.state.popover}
                            overlay={[
                                (<Item key="1" value="scan"><img className="popoverItem-img" src={require('../../assets/imgs/icon-popover-discriminate.png')}/><font className="popoverItem-text">听歌识曲</font></Item>),
                                (<Item key="2" value="sweep"><img className="popoverItem-img" src={require('../../assets/imgs/icon-popover-sweep.png')}/><font className="popoverItem-text">扫一扫</font></Item>),
                            ]}
                            onVisibleChange={this.popoverChange.bind(this)}
                            onSelect={this.popoverSelect.bind(this)}
                        ><i className="qqMusic-header-icon-right"></i></Popover>
                    </div>
                    <div className="qqMusic-header-bottom" onTouchStart={this.searchChange.bind(this)}>
                        <div className="qqMusic-header-search">
                            <i className="qqMusic-search-icon"></i>
                            <span className="qqMusic-search-text">搜索</span>
                        </div>
                    </div>
                </div>
                <Slider docked={this.state.docked} openChange={this.openChange.bind(this)}></Slider>
                <Search search={this.state.search} searchChange={this.searchChange.bind(this)}></Search>
            </div>
        );
    }
}
export default Header;