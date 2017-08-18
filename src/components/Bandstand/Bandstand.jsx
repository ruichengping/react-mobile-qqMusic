import React from 'react';
import "./Bandstand.scss";
import playImg from '../../assets/imgs/icon-music-play.png';
import pauseImg from '../../assets/imgs/icon-music-pause.png';
import playListImg from '../../assets/imgs/icon-play-list.png';
class Bandstand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlay: false
        }
    }
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
    render() {
        return (
            <div className="qqMusic-home-footer border-top">
                <div className="qqMusic-home-footer-left">
                    <img className={this.state.isPlay?'qqMusic-home-footer-avatar active':'qqMusic-home-footer-avatar'} src="https://p1.music.126.net/_v7ezNPQOEJ3aFir8MZmzQ==/19050138463061697.jpg" />
                </div>
                <div className="qqMusic-home-footer-middle">
                    <h4 className="qqMusic-home-footer-song">桃花诺</h4>
                    <p className="qqMusic-home-footer-singer">G.E.M.邓紫棋</p>
                </div>
                <div className="qqMusic-home-footer-right">
                    <audio ref="qqMusicAudio" src="https://m8.music.126.net/20170819045412/220a29032a61c59fb6499b14d0943f8d/ymusic/4f8f/a9b4/fa72/0adcd0c7c10e3213f2ea496c84cbf0d3.mp3" loop="loop" ></audio>
                    <img className="qqMusic-play-switch" src={this.state.isPlay ? pauseImg : playImg} onClick={this.changePlayState.bind(this)} />
                    <img className="qqMusic-play-list" src={playListImg} />
                </div>
            </div>
        )
    }
}
export default Bandstand;