import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import HelloPage from "./pages/HelloPage";
import WalletPage from "./pages/WalletPage";
import ETHManagementPage from "./pages/ETHManagementPage";
import TokenManagementPage from "./pages/TokenManagementPage";
import TokensPage from "./pages/TokensPage";
import DOMPage from "./pages/DOMPage";
import ManageTokenPage from "./pages/ManageTokenPage";

function Body() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={StartPage} />
                <Route exact path={"/user/:address"} component={HelloPage} />
                <Route exact path={"/user/:address/wallet"} component={WalletPage} />
                <Route exact path={"/user/:address/wallet/eth-management"} component={ETHManagementPage} />
                <Route exact path={"/user/:address/wallet/token-management"} component={TokenManagementPage} />
                <Route exact path={"/user/:address/wallet/token-management/tokens"} component={TokensPage} />
                <Route exact path={"/user/:address/wallet/token-management/tokens/manage/:ticker"}
                       component={ManageTokenPage} />
                <Route exact path={"/user/:address/wallet/token-management/tokens/view/:ticker"}
                       component={DOMPage} />
            </Switch>
        </Router>
    );
}

export default Body;