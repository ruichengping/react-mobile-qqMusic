import React from 'react';
import Header from '@/components/Header';
import Bandstand from '@/components/Bandstand';
import './style.scss';
class MainLayout extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div className="qqmusic-home">
                <Header className="qqmusic-home-header" />                                                             
                    {children}
                <Bandstand/>
            </div>
        );
    }
}
export default MainLayout;