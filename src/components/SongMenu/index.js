import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import addImg from '../../assets/imgs/icon-song-menu-add.png';
import NewSongMenu from '@/components/NewSongMenu';
import SongMenuMangement from  '@/components/SongMenuMangement';
import * as actions from '@/store/actions';
import './style.scss';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class SongMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isNewSongMenuShow:false,
            isSongMenuMangementShow:false,
            activeTab:1
        }
    }
    newSongMenuShowSwitch=()=>{
        this.setState({
            isNewSongMenuShow:!this.state.isNewSongMenuShow
        });
    }
    songMenuMangementShowSwitch=()=>{
        this.setState({
            isSongMenuMangementShow:!this.state.isSongMenuMangementShow
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
            <div className="qqMusic-myCenter-bottom">
                <div className="qqMusic-myCenter-tabs">
                    <span className={activeTab===1?'qqMusic-myCenter-tab active':'qqMusic-myCenter-tab'} onClick={this.tabChange.bind(this,1)} >自建歌单</span>
                    |
                    <span className={activeTab===2?'qqMusic-myCenter-tab active':'qqMusic-myCenter-tab'} onClick={this.tabChange.bind(this,2)}>收藏歌单</span>
                    <i style={activeTab===2?{display:'none'}:{}} className="addSongMenu" onClick={this.newSongMenuShowSwitch.bind(this)}/>
                    <i  className="songMenuManage" onClick={this.songMenuMangementShowSwitch}></i>
                </div>
                <div className="qqMusic-myCenter-tabContent-one" style={activeTab!==1?{display:'none'}:{}}>
                    <ul className="songMenuArray" style={songMenuArray.length>0?{display:'block'}:{display:'none'}}>
                        {
                            songMenuArray.map((item,index)=>{
                                return (
                                    <li className="songMenuItem" key={index}>
                                        <div className="left">
                                            <img className="logo" src={require("../../assets/imgs/icon-qqMusic-logo.png")}/>
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
                    <div className="add-songMenu-wrapper" style={{display:songMenuArray.length>0?'none':'flex'}} onClick={this.newSongMenuShowSwitch}>
                        <div className="add-songMenu-wrapper-left">
                            <img className="add-songMenu-img" src={addImg}/>
                        </div>
                        <div className="add-songMenu-wrapper-right">
                            <p className="add-songMenu-text border-bottom">新建歌单</p>
                        </div>
                    </div>
                </div>
                <div className="qqMusic-myCenter-tabContent-two" style={activeTab!==2?{display:'none'}:{}}>
                    <p className="no-collected-songMenu">没有收藏的歌单</p>
                </div>
                <NewSongMenu isNewSongMenuShow={isNewSongMenuShow} newSongMenuShowSwitch={this.newSongMenuShowSwitch} ></NewSongMenu>
                <SongMenuMangement isSongMenuMangementShow={isSongMenuMangementShow} songMenuMangementShowSwitch={this.songMenuMangementShowSwitch}></SongMenuMangement>
            </div>
        );
    }
}
export default SongMenu;