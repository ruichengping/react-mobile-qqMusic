import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import * as actions from '@/store/actions';
import './style.scss';

@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class MusicList extends React.Component{
    playSpecificMusic(music){
        const {mid} = music;
        const {playSpecificMusicByMid} = this.props
        playSpecificMusicByMid(mid);                         
    }
    clearMusicList=()=>{
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
        const {currentMusic,mid,musicList,isMusicListShow,musicListSwitch} = this.props;
        return (
            <div className={classnames('qqmusic-music-list-wrapper',isMusicListShow?'show':'')}>
                <div className="qqmusic-music-list-content">
                   <div className="top border-bottom">
                       <h4 className="title">播放列表</h4>
                       <img className="clear-list" src={require("@/assets/icon-list-clear.png")} onClick={this.clearMusicList}/>
                   </div>
                   <div className="middle">
                       <ul className="music-list">
                           {
                             musicList.map((item)=>{
                                return (
                                    <li className="music-item border-bottom" style={{color:item.mid===currentMusic.mid?"#31c37c":"#fff"}} key={item.mid}>
                                        <span onClick={this.playSpecificMusic.bind(this,item)}>{item.title} - {item.author}</span>
                                        <img className="tag" style={{display:item.mid===mid?'inline-block':'none'}} src={require('@/assets/icon-music-playing.png')}/>
                                        <img className="delete" src={require("@/assets/icon-record-close.png")} onClick={this.removeMusicFromList.bind(this,item)}/>
                                    </li>
                                );
                             })
                           }
                       </ul>
                   </div>
                   <div className="bottom" onClick={musicListSwitch}>关闭</div>
                </div>
                <div className="qqmusic-music-list-bg" onClick={musicListSwitch}></div>
            </div>
        )
    }
}
export default MusicList;