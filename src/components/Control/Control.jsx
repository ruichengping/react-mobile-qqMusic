import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Carousel} from 'antd-mobile';
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
    componentWillMount(){
        this.getLyricAjax(this.props.currentMusic.id);
    }
    render() {
        return (
            <div className={this.props.isControlShow ? 'qqMusic-control show' : 'qqMusic-control'}>
                <div className="qqMusic-control-content">
                    <div className="qqMusic-control-top">
                        <img className="icon-control-down" src={require("../../assets/imgs/icon-control-down.png")} onClick={this.props.consoleSwitch}/>
                        <p className="music-name">{this.props.currentMusic.name}</p>
                    </div>
                    <div className="qqMusic-control-middle">
                        <Carousel autoplay={false}>
                            {
                                [
                                    (
                                        <div key="1">
                                            <p className="music-signer">{this.props.currentMusic.ar[0].name}</p>  
                                            <img className="music-cover" src={this.props.currentMusic.al.picUrl}/> 
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

                    </div>
                </div>
                <div className="qqMusic-control-bg" style={{ backgroundImage: `url(${this.props.currentMusic.al.picUrl}` }}></div>
                <div className="qqMusic-control-bg-mask"></div>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            currentMusic: state.music.currentMusic,
            isPlay: state.music.isPlay
        }
    }
)(Control);