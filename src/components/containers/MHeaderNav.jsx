/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mHeaderNavStyle } from './styles';
import injectSheet from 'react-jss';
import AppBar from 'material-ui/AppBar';
import { Grid } from 'material-ui';
import { Divider, Icon } from 'antd';
import { Menu, Dropdown, Button } from 'antd';
import IconButton from 'material-ui/IconButton';
import actions from '../../redux/actions';


const menuItems = [
    {
        key: 'dashBoard',
        icon: 'png_menu_proposals',
        iconSelected: 'png_menu_proposals_selected',
        title: 'Proposal Dashboard',
        showWhen: 'always',
    },
    {
        key: 'newProposal',
        icon: 'png_menu_create',
        iconSelected: 'png_menu_create_selected',
        title: 'Create Proposal',
        showWhen: 'always',
    },
    {
        key: 'news',
        icon: 'png_menu_news',
        iconSelected: 'png_menu_news_selected',
        title: 'News and Announcements',
        showWhen: 'always',
    },
    {
        key: 'userAccount',
        icon: 'png_menu_account',
        iconSelected: 'png_menu_account_selected',
        title: 'Account Settings',
        showWhen: 'login',
    },
    {
        key: 'register',
        icon: 'png_menu_register',
        iconSelected: 'png_menu_register_selected',
        title: 'Register',
        showWhen: 'logout',
    },
    {
        key: 'faq',
        icon: 'png_menu_faq',
        iconSelected: 'png_menu_faq_selected',
        title: 'Faq',
        showWhen: 'always',
    },
    {
        key: 'masterNode',
        icon: 'png_menu_masternodes',
        iconSelected: 'png_menu_masternodes_selected',
        title: 'Masternode Setting',
        showWhen: 'login',
    },
];

class MHeaderNav extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.itemClick = this.itemClick.bind(this);
    }

    itemClick (e) {
        console.log(e.target.id);
        this.props.setPage(e.target.id);
    }

    render () {
        const { classes, deviceType } = this.props;
        //Platform style switcher
        const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
        const chatIcon = require('../../assets/img/png_menu_chat.png');
        const logo = require('../../assets/img/png_logo.png');
        const menu = (
            <Menu>
                {menuItems.map((item) => {
                    return (
                        <Menu.Item>
                            <Button className="no-border" id={item.key} onClick={this.itemClick}>{item.title}</Button>
                        </Menu.Item>
                    )

                })}
            </Menu>
        );
        return (
            <Grid container className={style}>
                <Grid item xs={2}>

                    <Dropdown overlay={menu} placement="bottomRight">
                        <IconButton
                            color="inherit"
                            aria-label="Menu"

                        >
                            <Icon type="bars" className="menu-icon" />
                        </IconButton>
                    </Dropdown>

                </Grid>
                <Grid item xs={6} className="align-center">
                    <Divider type="vertical" className="divider" />
                    <img alt="a" src={logo} height="35px" width="100px" />
                </Grid>
                <Grid item xs={4}>
                    <Divider type="vertical" className="divider" />
                    <Button
                        size={'large'}
                        type="primary"
                        ghost
                        className="button"
                        onClick={() => this.props.toggleChat()}
                    >
                        <img src={chatIcon} alt="chat icon" height="30" />
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const stateToProps = state => {
    return {
        deviceType: state.app.platform.deviceType,
    };
};

const dispatchToProps = dispatch => {
    return {
        setPage: page => dispatch(actions.setPage(page)),
        toggleChat: () => dispatch(actions.toggleChat()),
    };
};
export default connect(stateToProps, dispatchToProps)(
    injectSheet(mHeaderNavStyle)(MHeaderNav)
);
