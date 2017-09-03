import React from 'react';
import axios from 'axios';
import "./Bandstand.scss";
import { connect } from 'react-redux';
import playImg from '../../assets/imgs/icon-music-play.png';
import pauseImg from '../../assets/imgs/icon-music-pause.png';
import playListImg from '../../assets/imgs/icon-play-list.png';
class Bandstand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlay: false,
            currentMusic:this.props.currentMusic,
            currentMusicUrl:''
        }
    }
    //改变播放状态
    changePlayState() {
        var isPlayOld=this.state.isPlay;
        this.setState({
            isPlay: !isPlayOld
        });
        if(!isPlayOld){
            this.refs.qqMusicAudio.play();
        }else{
            this.refs.qqMusicAudio.pause();        
        }
    }
    //获取歌曲信息
    getSongInfo(nextProps){
        const _this=this;
        if(nextProps){
            _this.setState({
               currentMusic:nextProps.currentMusic,
               isPlay:true
            });
            _this.getMusicUrlById(_this,nextProps.currentMusic.id,()=>{
                _this.refs.qqMusicAudio.play();                
            });
        }else{
            axios.get(`https://api.imjad.cn/cloudmusic/?type=search&s=邓紫棋`).then((response) => {
                _this.setState({
                    currentMusic:response.data.result.songs[2]
                });
                _this.getMusicUrlById(_this,26113988);
            });

        }
    }
    //根据歌曲id获取音乐url
    getMusicUrlById(_this,id,callback){
        axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}`).then((response) => {
            _this.setState({
                currentMusicUrl:response.data.data[0].url
            });
            if(typeof callback ==='function'){
                callback();
            }
       });
    }
    componentWillMount(){
        this.getSongInfo();
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.getSongInfo(nextProps);
    }
    render() {
        return (
            <div className="qqMusic-home-footer border-top">
                <div className="qqMusic-home-footer-left">
                    <img className={this.state.isPlay?'qqMusic-home-footer-avatar active':'qqMusic-home-footer-avatar'} src={this.state.currentMusic?this.state.currentMusic.al.picUrl:''} />
                </div>
                <div className="qqMusic-home-footer-middle">
                    <h4 className="qqMusic-home-footer-song">{this.state.currentMusic?this.state.currentMusic.name:''}</h4>
                    <p className="qqMusic-home-footer-singer">{this.state.currentMusic?this.state.currentMusic.ar[0].name:''}</p>
                </div>
                <div className="qqMusic-home-footer-right">
                    <audio ref="qqMusicAudio" src={this.state.currentMusicUrl} ></audio>
                    <img className="qqMusic-play-switch" src={this.state.isPlay ? pauseImg : playImg} onClick={this.changePlayState.bind(this)} />
                    <img className="qqMusic-play-list" src={playListImg} />
                </div>
            </div>
        )
    }
}
export default connect(
    (state)=>{
        return {
            currentMusic:state.music.musicList.length>0?state.music.musicList[0]:null
        }   
    }
)(Bandstand);