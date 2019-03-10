import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '@/store/actions';
import './style.scss';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class MusicList extends React.Component{
    constructor(props){
        super(props);
    }
    playSpecificMusic(music){
        const {mid} = music;
        const {playSpecificMusicByMid} = this.props
        playSpecificMusicByMid(mid);                         
    }
    clearMusicList(){
        const {clearMusicList} = this.props;
        clearMusicList();
    }
    removeMusicFromList(music){
        const {mid} = music;
        const {removeMusicFromList} = this.props
        removeMusicFromList(mid);                                
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.musicList.length===0){
             this.props.musicListSwitch();                                          
        }            
    }        
    render(){
        const {currentMusic,mid} = this.props;
        return (
            <div className={this.props.isMusicListShow?'qqMusic-musicList-wrapper show':'qqMusic-musicList-wrapper'}>
                <div className="qqMusic-musicList-content">
                   <div className="qqMusic-musicList-top border-bottom">
                       <h4 className="title">播放列表</h4>
                       <img className="clearList" src={require("@/assets/icon-list-clear.png")} onClick={this.clearMusicList.bind(this)}/>
                   </div>
                   <div className="qqMusic-musicList-middle">
                       <ul className="musicList">
                           {
                             this.props.musicList.map((item)=>{
                                return (
                                    <li className="musicItem border-bottom" style={{color:item.mid===currentMusic.mid?"#31c37c":"#fff"}} key={item.mid}>
                                        <span onClick={this.playSpecificMusic.bind(this,item)}>{item.title} - {item.author}</span>
                                        <img className="tag" style={{display:item.mid===mid?'inline-block':'none'}} src={require('@/assets/icon-music-playing.png')}/>
                                        <img className="delete" src={require("@/assets/icon-record-close.png")} onClick={this.removeMusicFromList.bind(this,item)}/>
                                    </li>
                                );
                             })
                           }
                       </ul>
                   </div>
                   <div className="qqMusic-musicList-bottom" onClick={this.props.musicListSwitch}>关闭</div>
                </div>
                <div className="qqMusic-musicList-bg" onClick={this.props.musicListSwitch}></div>
            </div>
        )
    }
}
export default MusicList;