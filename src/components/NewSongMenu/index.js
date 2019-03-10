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
class NewSongMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            totalCount:0,
            isErrorShow:false
        }
    }
    comeback=()=>{
        this.setState({
            totalCount:0
        });
        this.inputText.value="";
        this.props.newSongMenuShowSwitch();
    }
    changeStrLength=()=>{
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
    saveSongMenu=()=>{
        const {addSongMenu,songMenuArray} = this.props;
        const isCanAdd=!songMenuArray.some((item)=>{
            return item===this.inputText.value
        });
        if(isCanAdd){
            addSongMenu(this.inputText.value)
            this.comeback();
        }else{
            Toast.fail('该歌单已存在', 1);
        }
    }
    render(){
        const {isNewSongMenuShow} = this.props;
        const {totalCount} = this.state;
        return(
            <div className={isNewSongMenuShow?"qqMusic-newSongMenu show":"qqMusic-newSongMenu"}>
                <div className="newSongMenu-header">
                    <img className="icon-arrow-left" src={require("@/assets/icon-arrow-left.png")} onClick={this.comeback} />
                    <p className="title">新建歌单</p>
                    <span className="save" onClick={this.saveSongMenu}>保存</span>
                </div>
                <div className="newSongMenu-body">
                    <input ref={(input)=>this.inputText=input} className="input-text" type="text" placeholder="请输入内容" onInput={this.changeStrLength}/>
                    <p className="totalCount">{20-totalCount}</p>
                    <NoticeBar className={this.state.isErrorShow?'error-notice show':'error-notice'} mode="closable" icon={null}>！最多输入20个字</NoticeBar>
                </div>                
            </div>
        );
    }
}
export default NewSongMenu;