function SideMenu(){
    return (

        <div>
            Menu
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