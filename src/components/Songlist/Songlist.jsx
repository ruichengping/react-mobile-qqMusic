import React from 'react';
import './Songlist.scss';
import { connect } from 'react-redux';
import addImg from '../../assets/imgs/icon-songList-add.png';
import NewSongList from '../../components/NewSongList/NewSongList';
import SongListMangement from  '../SongListMangement/SongListMangement';
class Songlist extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isNewSongListShow:false,
            isSongListMangementShow:false,
            activeTab:1
        }
    }
    newSongListShowSwitch(){
        this.setState({
            isNewSongListShow:!this.state.isNewSongListShow
        });
    }
    songListMangementShowSwitch(){
        this.setState({
            isSongListMangementShow:!this.state.isSongListMangementShow
        });
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
                    <i style={this.state.activeTab===2?{display:'none'}:{}} className="addSongList" onClick={this.newSongListShowSwitch.bind(this)}/>
                    <i  className="songListManage" onClick={this.songListMangementShowSwitch.bind(this)}></i>
                </div>
                <div className="qqMusic-myCenter-tabContent-one" style={this.state.activeTab!==1?{display:'none'}:{}}>
                    <ul className="songListArray" style={this.props.songListArray.length>0?{display:'block'}:{display:'none'}}>
                        {
                            this.props.songListArray.map((item,index)=>{
                                return (
                                    <li className="songListItem" key={index}>
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
                    <div className="add-songList-wrapper" style={{display:this.props.songListArray.length>0?'none':'flex'}} onClick={this.newSongListShowSwitch.bind(this)}>
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
                <NewSongList isNewSongListShow={this.state.isNewSongListShow} newSongListShowSwitch={this.newSongListShowSwitch.bind(this)} ></NewSongList>
                <SongListMangement isSongListMangementShow={this.state.isSongListMangementShow} songListMangementShowSwitch={this.songListMangementShowSwitch.bind(this)}></SongListMangement>
            </div>
        );
    }
}
export default connect(
    (state) => {
        return {
            songListArray:state.music.songListArray
        }
    }
)(Songlist);