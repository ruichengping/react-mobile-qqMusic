import React from 'react';
import './Songlist.scss';
import addImg from '../../assets/imgs/icon-songList-add.png';
class Songlist extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            activeTab:1
        }
    }
    tabChange(tabIndex){
        this.setState({
            activeTab:tabIndex
        });
    }   
    render() {
        return (
            <div className="qqMusic-myCenter-bottom">
                <div className="qqMusic-myCenter-tabs">
                    <span className={this.state.activeTab===1?'qqMusic-myCenter-tab active':'qqMusic-myCenter-tab'} onClick={this.tabChange.bind(this,1)} >自建歌单</span>
                    |
                    <span className={this.state.activeTab===2?'qqMusic-myCenter-tab active':'qqMusic-myCenter-tab'} onClick={this.tabChange.bind(this,2)}>收藏歌单</span>
                    <i style={this.state.activeTab===2?{display:'none'}:{}} className="addSongList"/>
                    <i className="songListManage"></i>
                </div>
                <div className="qqMusic-myCenter-tabContent-one" style={this.state.activeTab!==1?{display:'none'}:{}}>
                    <div className="add-songList-wrapper">
                        <div className="add-songList-wrapper-left">
                            <img className="add-songList-img" src={addImg}/>
                        </div>
                        <div className="add-songList-wrapper-right">
                            <p className="add-songList-text border-bottom">新建歌单</p>
                        </div>
                    </div>
                </div>
                <div className="qqMusic-myCenter-tabContent-two" style={this.state.activeTab!==2?{display:'none'}:{}}>
                    <p className="no-collected-songLst">没有收藏的歌单</p>
                </div>
            </div>
        );
    }
}
export default Songlist;