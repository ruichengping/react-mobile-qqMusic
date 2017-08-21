import React from 'react';
import './Songlist.scss';
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
                    <i className="addSongList"/>
                    <i className="songListManage"></i>
                </div>
                <div className="qqMusic-myCenter-tabContent-one" style={this.state.activeTab!==1?{display:'none'}:{}}>
                    11231232132132
                </div>
                <div className="qqMusic-myCenter-tabContent-two" style={this.state.activeTab!==2?{display:'none'}:{}}>
                    123123123213
                </div>
            </div>
        );
    }
}
export default Songlist;