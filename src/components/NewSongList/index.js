import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '@/store/actions';
import {NoticeBar,Toast} from 'antd-mobile';
import './style.scss';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
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
        this.inputText.value="";
        this.props.newSongListShowSwitch();
    }
    changeStrLength(){
        if(this.inputText.value.length<=20){
            this.setState({
                totalCount:this.inputText.value.length
            });
        }else{
            this.inputText.value=this.inputText.value.substring(0,20);
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
        const {addSongList,songListArray} = this.props;
        const isCanAdd=!songListArray.some((item)=>{
            return item===this.inputText.value
        });
        if(isCanAdd){
            addSongList(this.inputText.value)
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
                    <input ref={(input)=>this.inputText=input} className="input-text" type="text" placeholder="请输入内容" onInput={this.changeStrLength.bind(this)}/>
                    <p className="totalCount">{20-this.state.totalCount}</p>
                    <NoticeBar className={this.state.isErrorShow?'error-notice show':'error-notice'} mode="closable" icon={null}>！最多输入20个字</NoticeBar>
                </div>                
            </div>
        );
    }
}
export default NewSongList;