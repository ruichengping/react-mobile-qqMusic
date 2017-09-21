import React from 'react';
import { connect } from 'react-redux';
import * as musicActions from '../../actions/music.js';
import {NoticeBar,Toast} from 'antd-mobile';
import './NewSongList.scss';
class NewSongList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            totalCount:0,
            isErrorShow:false
        }
    }
    comeback(){
        this.setState({
            totalCount:0
        });
        this.refs.inputText.value="";
        this.props.newSongListShowSwitch();
    }
    changeStrLength(){
        if(this.refs.inputText.value.length<=20){
            this.setState({
                totalCount:this.refs.inputText.value.length
            });
        }else{
            this.refs.inputText.value=this.refs.inputText.value.substring(0,20);
            this.setState({
                isErrorShow:true
            });
            setTimeout(()=>{
                this.setState({
                isErrorShow:false
            });
            },1200);
        }
    }
    saveSongList(){
        const isCanAdd=!this.props.songListArray.some((item)=>{
            return item===this.refs.inputText.value
        });
        if(isCanAdd){
            this.props.dispatch(musicActions.addSongList(this.refs.inputText.value));
            this.comeback();
        }else{
            Toast.fail('该歌单已存在', 1);
        }
    }
    render(){
        return(
            <div className={this.props.isNewSongListShow?"qqMusic-newSongList show":"qqMusic-newSongList"}>
                <div className="newSongList-header">
                    <img className="icon-arrow-left" src={require("../../assets/imgs/icon-arrow-left.png")} onClick={this.comeback.bind(this)} />
                    <p className="title">新建歌单</p>
                    <span className="save" onClick={this.saveSongList.bind(this)}>保存</span>
                </div>
                <div className="newSongList-body">
                    <input ref="inputText" className="input-text" type="text" placeholder="请输入内容" onInput={this.changeStrLength.bind(this)}/>
                    <p className="totalCount">{20-this.state.totalCount}</p>
                    <NoticeBar className={this.state.isErrorShow?'error-notice show':'error-notice'} mode="closable" icon={null}>！最多输入20个字</NoticeBar>
                </div>                
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
)(NewSongList);