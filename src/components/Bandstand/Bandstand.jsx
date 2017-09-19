import React from 'react';
import axios from 'axios';
import "./Bandstand.scss";
import Control from '../Control/Control';
import * as musicActions from '../../actions/music.js';
import { connect } from 'react-redux';
import playImg from '../../assets/imgs/icon-music-play.png';
import pauseImg from '../../assets/imgs/icon-music-pause.png';
import playListImg from '../../assets/imgs/icon-play-list.png';
class Bandstand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isControlShow:false,
            currentMusicUrl:''
        }
    }
    //改变播放状态
    changePlayState() {
        const isPlayOld=this.props.isPlay;
        this.props.dispatch(musicActions.changePlayStatus(!this.props.isPlay));        
        if(!this.props.isPlay){
            this.refs.qqMusicAudio.play();
        }else{
            this.refs.qqMusicAudio.pause();        
        }
    }
    //获取歌曲信息
    getSongInfo(nextProps){
        const _this=this;
        if(nextProps){
            _this.getMusicUrlById(nextProps.currentMusic.id,(url)=>{
                _this.setState({
                    currentMusicUrl:url
                });
                 _this.props.dispatch(musicActions.changePlayStatus(true)); 
                 _this.refs.qqMusicAudio.play();       
            });
        }
    }
    //根据歌曲id获取音乐url
    getMusicUrlById(id,callback){
        axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}`).then((response) => {
            if(typeof callback ==='function'){
                callback(response.data.data[0].url);
            }
       });
    }
    consoleSwitch(){
        this.setState({
            isControlShow:!this.state.isControlShow
        });
    }
    componentWillMount(){
        const _this=this;
        this.getMusicUrlById(this.props.currentMusic.id,(url)=>{
            _this.setState({
                currentMusicUrl:url
            });
        });
    }
    componentWillReceiveProps(nextProps){
        this.getSongInfo(nextProps);
    }
    render() {
        return (
            <div className="qqMusic-home-footer border-top">
                <div className="qqMusic-home-footer-left">
                    <img className={this.props.isPlay?'qqMusic-home-footer-avatar active':'qqMusic-home-footer-avatar'} src={this.props.currentMusic?this.props.currentMusic.al.picUrl:''} onClick={this.consoleSwitch.bind(this)} />
                </div>
                <div className="qqMusic-home-footer-middle">
                    <h4 className="qqMusic-home-footer-song">{this.props.currentMusic?this.props.currentMusic.name:''}</h4>
                    <p className="qqMusic-home-footer-singer">{this.props.currentMusic?this.props.currentMusic.ar[0].name:''}</p>
                </div>
                <div className="qqMusic-home-footer-right">
                    <audio ref="qqMusicAudio" src={this.state.currentMusicUrl} ></audio>
                    <img className="qqMusic-play-switch" src={this.props.isPlay ? pauseImg : playImg} onClick={this.changePlayState.bind(this)} />
                    <img className="qqMusic-play-list" src={playListImg} />
                </div>
               <Control isControlShow={this.state.isControlShow} consoleSwitch={this.consoleSwitch.bind(this)}></Control>
            </div>
        )
    }
}
export default connect(
    (state)=>{
        return {
            musicList:state.music.musicList,
            currentMusic:state.music.currentMusic,
            isPlay:state.music.isPlay
        }   
    }
)(Bandstand);