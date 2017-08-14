import React from 'react';
import { Button,Icon } from 'antd-mobile';
import './Header.scss';
class Header extends React.Component {
    render() {
        return (
           <div id="qqMusic-header">
               <Icon type="check" />
              <Button className="btn" type="primary">primary button</Button>
           </div>
        );
    }
}
export default Header;