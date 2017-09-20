import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Carousel} from 'antd-mobile';
import * as musicActions from '../../actions/music.js';
import './Control.scss';
class Control extends React.Component {
    constructor(props) {
        super(props);

    }
    getLyricAjax(id){
        axios.get(`https://bird.ioliu.cn/v1/?url=http://music.163.com/api/song/lyric?id=${id}&os=pc&lv=-1&kv=-1&tv=-1
        `).then((response) => {
          console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    //播放上一首
    prevMusic(){
        if(this.props.currentIndex===0){
            this.props.dispatch(musicActions.playMusicByIndex(this.props.musicList.length-1));                    
        }else{
            this.props.dispatch(musicActions.playMusicByIndex(this.props.currentIndex-1));                    
        }
    }
    //播放下一首
    nextMusic(){
        if(this.props.currentIndex===this.props.musicList.length-1){
            this.props.dispatch(musicActions.playMusicByIndex(0));                    
        }else{
            this.props.dispatch(musicActions.playMusicByIndex(this.props.currentIndex+1));                    
        }
    }
    componentWillMount(){
        this.getLyricAjax(this.props.currentMusic.id);
    }
    render() {
        return (
            <div className={this.props.isControlShow ? 'qqMusic-control show' : 'qqMusic-control'}>
                <div className="qqMusic-control-content">
                    <div className="qqMusic-control-top">
                        <img className="icon-control-down" src={require("../../assets/imgs/icon-control-down.png")} onClick={this.props.consoleSwitch}/>
                        <p className="music-name">{this.props.currentMusic?this.props.currentMusic.name:''}</p>
                    </div>
                    <div className="qqMusic-control-middle">
                        <Carousel autoplay={false}>
                            {
                                [
                                    (
                                        <div key="1">
                                            <p className="music-signer">{this.props.currentMusic.ar?this.props.currentMusic.ar[0].name:''}</p>  
                                            <img className="music-cover" src={this.props.currentMusic.al?this.props.currentMusic.al.picUrl:''}/> 
                                        </div>
                                       
                                    ),
                                    (
                                        <div key="2">12323</div>
                                    )
                                ]
                            }
                        </Carousel>
                                            
                    </div>
                    <div className="qqMusic-control-bottom">
                        <div className="qqMusic-control-btns">
                            <img className="prev" src={require("../../assets/imgs/icon-music-prev.png")} onClick={this.prevMusic.bind(this)}/>
                            <img className="status" src={this.props.isPlay?require("../../assets/imgs/icon-control-pause.png"):require("../../assets/imgs/icon-control-play.png")} onClick={this.props.changePlayState}/>
                            <img className="next" src={require("../../assets/imgs/icon-music-next.png")} onClick={this.nextMusic.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div className="qqMusic-control-bg" style={{ backgroundImage: `url(${this.props.currentMusic.al?this.props.currentMusic.al.picUrl:''}` }}></div>
                <div className="qqMusic-control-bg-mask"></div>
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
)(Control);