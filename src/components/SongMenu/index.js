import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import addImg from '@/assets/icon-songmenu-add.png';
import NewSongMenu from '@/components/NewSongMenu';
import SongMenuMangement from  '@/components/SongMenuMangement';
import * as actions from '@/store/actions';
import './style.scss';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class SongMenu extends React.Component {
    state={
        isNewSongMenuShow:false,
        isSongMenuMangementShow:false,
        activeTab:1
    }
    newSongMenuShowSwitch=()=>{
        const {isNewSongMenuShow} = this.state;
        this.setState({
            isNewSongMenuShow:!isNewSongMenuShow
        });
    }
    songMenuMangementShowSwitch=()=>{
        const {isSongMenuMangementShow} = this.state;
        this.setState({
            isSongMenuMangementShow:!isSongMenuMangementShow
        });
    }
    tabChange(tabIndex){
        this.setState({
            activeTab:tabIndex
        });
    }   
    render() {
        const {activeTab,isNewSongMenuShow,isSongMenuMangementShow} = this.state;
        const {songMenuArray} = this.props;
        return (
            <div className="qqmusic-mycenter-bottom">
                <div className="qqmusic-mycenter-tabs">
                    <span className={classnames('qqmusic-mycenter-tab',activeTab===1?'active':'')} onClick={this.tabChange.bind(this,1)} >自建歌单</span>
                    |
                    <span className={classnames('qqmusic-mycenter-tab',activeTab===2?'active':'')} onClick={this.tabChange.bind(this,2)}>收藏歌单</span>
                    <i style={activeTab===2?{display:'none'}:{}} className="add-songmenu" onClick={this.newSongMenuShowSwitch}/>
                    <i  className="songmenu-manage" onClick={this.songMenuMangementShowSwitch}></i>
                </div>
                <div className="qqmusic-mycenter-tab-content-one" style={activeTab!==1?{display:'none'}:{}}>
                    <ul className="songmenu-array" style={songMenuArray.length>0?{display:'block'}:{display:'none'}}>
                        {
                            songMenuArray.map((item,index)=>{
                                return (
                                    <li className="songmenu-item" key={index}>
                                        <div className="left">
                                            <img className="logo" src={require("@/assets/icon-qqmusic-logo.png")}/>
                                        </div>
                                        <div className="right">
                                            <p className="name">{item}</p>
                                            <p className="num border-bottom">0首</p>
                                            <span className="icon-right"></span>
                                        </div>                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="add-songmenu-wrapper" style={{display:songMenuArray.length>0?'none':'flex'}} onClick={this.newSongMenuShowSwitch}>
                        <div className="add-songmenu-wrapper-left">
                            <img className="add-songmenu-img" src={addImg}/>
                        </div>
                        <div className="add-songmenu-wrapper-right">
                            <p className="add-songmenu-text border-bottom">新建歌单</p>
                        </div>
                    </div>
                </div>
                <div className="qqmusic-mycenter-tab-content-two" style={activeTab!==2?{display:'none'}:{}}>
                    <p className="no-collected-songmenu">没有收藏的歌单</p>
                </div>
                <NewSongMenu isNewSongMenuShow={isNewSongMenuShow} newSongMenuShowSwitch={this.newSongMenuShowSwitch} ></NewSongMenu>
                <SongMenuMangement isSongMenuMangementShow={isSongMenuMangementShow} songMenuMangementShowSwitch={this.songMenuMangementShowSwitch}></SongMenuMangement>
            </div>
        );
    }
}
export default SongMenu;