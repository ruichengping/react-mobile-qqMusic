import React from 'react';
import { connect } from 'react-redux';
import * as musicActions from '../../actions/music.js';
import './MusicList.scss';
class MusicList extends React.Component{
    constructor(props){
        super(props);
    }
    playMusicByIndex(index){
        debugger
        this.props.dispatch(musicActions.playMusicByIndex(index));                            
    }
    clearMusicList(){
        this.props.dispatch(musicActions.clearMusicList()); 
    }
    removeMusicFromList(index){
        this.props.dispatch(musicActions.removeMusicFromList(index));                                  
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.musicList.length===0){
             this.props.musicListSwitch();                                          
        }            
    }        
    render(){
        return (
            <div className={this.props.isMusicListShow?'qqMusic-musicList-wrapper show':'qqMusic-musicList-wrapper'}>
                <div className="qqMusic-musicList-content">
                   <div className="qqMusic-musicList-top border-bottom">
                       <h4 className="title">播放列表</h4>
                       <img className="clearList" src={require("../../assets/imgs/icon-list-clear.png")} onClick={this.clearMusicList.bind(this)}/>
                   </div>
                   <div className="qqMusic-musicList-middle">
                       <ul className="musicList">
                           {
                             this.props.musicList.map((item,index)=>{
                                return (
                                    <li className="musicItem border-bottom" style={{color:item.id===this.props.currentMusic.id?"#31c37c":"#fff"}} key={index}>
                                        <span onClick={this.playMusicByIndex.bind(this,index)}>{item.name} - {item.ar[0].name}</span>
                                        <img className="tag" style={{display:item.id===this.props.currentMusic.id?'inline-block':'none'}} src={require('../../assets/imgs/icon-music-playing.png')}/>
                                        <img className="delete" src={require("../../assets/imgs/icon-record-close.png")} onClick={this.removeMusicFromList.bind(this,index)}/>
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
export default connect(
    (state) => {
        return {
            currentMusic: state.music.currentMusic,
            currentIndex:state.music.currentIndex,
            musicList:state.music.musicList,
            isPlay: state.music.isPlay
        }
    }
)(MusicList);