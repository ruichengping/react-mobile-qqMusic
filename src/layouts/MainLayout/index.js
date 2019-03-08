import React from 'react';
import Header from '@/components/Header';
import Bandstand from '@/components/Bandstand';
import './style.scss';
class MainLayout extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div className="qqMusic-home">
                <Header className="qqMusic-home-header" />                                                             
                {children}
                <Bandstand/>
            </div>
        );
    }
}
export default MainLayout;