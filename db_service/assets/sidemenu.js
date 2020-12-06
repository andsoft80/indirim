const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginLeft: 10
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SideMenu() {
    const classes = useStyles();
    return (
        <div id="content_wrap">

            <div style={{ height: '100%', width: '100%' }}>
                {/* <Paper style={{ height: '100%' }}> */}
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button id="menu_orderlist">
                        <ListItemIcon id="menu_orderlist">
                            <Icon>shopping_cart</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Заказы" id="menu_orderlist"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon>gavel</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Предложения" />
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button id="menu_profile">
                        <ListItemIcon id="menu_profile">
                            <Icon>face</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Профиль" id="menu_profile"/>
                    </ListItem>
                    <ListItem button id="menu_account">
                        <ListItemIcon id="menu_account">
                            <Icon>account_balance_wallet</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Мой счет" id="menu_account"/>
                    </ListItem>
                    <ListItem button id="menu_exit">
                        <ListItemIcon id="menu_exit">
                            <Icon>exit_to_app</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Выйти" id="menu_exit"/>
                    </ListItem>
                </List>
                {/* </Paper> */}
            </div>
        </div>

    );

}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SideMenu />
    </ThemeProvider>,
    document.querySelector('#sideMenu'),
);