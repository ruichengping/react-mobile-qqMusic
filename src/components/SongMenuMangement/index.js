import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Checkbox} from 'antd-mobile';
import * as actions from '@/store/actions';
import './style.scss';
const CheckboxItem = Checkbox.CheckboxItem;
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class SongMenuMangement extends React.Component{
    state={
        selectedList:[]
    }
    comeback=()=>{
        this.props.songMenuMangementShowSwitch();
    }
    changeSelectedList(text){
        const isCanAdd=!this.state.selectedList.some((item)=>{
            return text===item;
        });
        let selectedList=this.state.selectedList;
        if(isCanAdd){
            selectedList.push(text);
        }else{
            selectedList=selectedList.filter((item)=>{
                    return text!==item;
                })
        }
        this.setState({
                selectedList
            });
    }
    removeSongMenu=()=>{
        const {selectedList} = this.state;
        const {removeSongMenu} = this.props;
        removeSongMenu(selectedList);
    }
    render(){
        const {songMenuArray,isSongMenuMangementShow} = this.props;
        return (
            <div className={isSongMenuMangementShow?"qqmusic-songmenu-mangement show":"qqmusic-songmenu-mangement"}>
                <div className="songmenu-mangement-header">
                    <img className="icon-arrow-left" src={require("@/assets/icon-arrow-left.png")} onClick={this.comeback.bind(this)} />
                    <p className="title">管理自建歌单</p>
                </div>
                <div className="songmenu-mangement-body">
                    <ul className="songmenu-array">
                        {
                            songMenuArray.map((item,index)=>{
                                return (
                                    <li className="songmenu-item" key={index}>
                                        <div className="left">
                                        <CheckboxItem className="checkBox"  onChange={this.changeSelectedList.bind(this,item)}></CheckboxItem>
                                        </div>
                                        <div className="middle border-bottom">
                                            <img className="logo" src={require("@/assets/icon-qqmusic-logo.png")}/>
                                        </div>
                                        <div className="right border-bottom">
                                            <p className="name">{item}</p>
                                            <p className="num">0首</p>
                                        </div>                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="songmenu-mangement-footer">
                    <div className="delete-wrapper">
                        <img className="delete" onClick={this.removeSongMenu} src={require("@/assets/icon-songmenu-delete.png")}/>                                          
                    </div>
                    <p className="text-wrapper">
                        <span className="text" onClick={this.removeSongMenu}>删除</span>
                    </p>
                </div>
            </div>
        )
    }
}
export default SongMenuMangement;