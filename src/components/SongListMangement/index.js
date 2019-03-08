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
class SongListMangement extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedList:[]
        }
    }
    comeback(){
        this.props.songListMangementShowSwitch();
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
    removeSongList(){
        const {selectedList} = this.state;
        const {removeSongList} = this.props;
        removeSongList(selectedList);
    }
    render(){
        return (
            <div className={this.props.isSongListMangementShow?"qqMusic-songList-mangement show":"qqMusic-songList-mangement"}>
                <div className="songListMangement-header">
                    <img className="icon-arrow-left" src={require("../../assets/imgs/icon-arrow-left.png")} onClick={this.comeback.bind(this)} />
                    <p className="title">管理自建歌单</p>
                </div>
                <div className="songListMangement-body">
                    <ul className="songListArray">
                        {
                            this.props.songListArray.map((item,index)=>{
                                return (
                                    <li className="songListItem" key={index}>
                                        <div className="left">
                                        <CheckboxItem className="checkBox"  onChange={this.changeSelectedList.bind(this,item)}></CheckboxItem>
                                        </div>
                                        <div className="middle border-bottom">
                                            <img className="logo" src={require("../../assets/imgs/icon-qqMusic-logo.png")}/>
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
                <div className="songListMangement-footer">
                    <div className="delete-wrapper">
                        <img className="delete" onClick={this.removeSongList.bind(this)} src={require("../../assets/imgs/icon-songList-delete.png")}/>                                          
                    </div>
                    <p className="text-wrapper">
                        <span className="text" onClick={this.removeSongList.bind(this)}>删除</span>
                    </p>
                </div>
            </div>
        )
    }
}
export default SongListMangement;