import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Account from "../reusable/Account";
import { Button, ButtonGroup, Paper } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function DOMPage() {
    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        message: '',
        token: '',
        buyOrders: [],
        sellOrders: []
    });

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios(
            `http://127.0.0.1:5000/${params.address}/account/profile_coins/view_dom/${params.ticker}`
        );

        console.log('fetchedUser: ' + JSON.stringify(fetchedUser.data))

        setUser(fetchedUser.data);

    }, [params.address]);

    function showSellOrders() {
        if (user.sellOrders.length === 2) {
            const amount = user.sellOrders[0].length;
            return Array.from(Array(amount).keys()).map((i) => {
                return <p key={i}>
                    {user.sellOrders[0][i] + ' --- ' + user.sellOrders[1][i]}</p>
            })
        }

        return (<><i>Empty</i></>)
    }

    function showBuyOrders() {
        if (user.buyOrders.length === 2 && user.buyOrders[0].length !== 0) {
            const amount = user.buyOrders[0].length;
            return Array.from(Array(amount).keys()).map((i) => {
                return <p key={i}>
                    {user.buyOrders[0][i] + ' --- ' + user.buyOrders[1][i]}</p>
            })
        }

        return (<><i>Empty</i></>)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 100}}>
            <div style={{width: 500, marginBottom: 5}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        <span style={{fontSize: 12}}>Start</span>
                    </Link>
                    <Link color="inherit" href={`/user/${user.address}`}>
                        <span style={{fontSize: 12}}>Dashboard</span>
                    </Link>
                    <Link color="inherit" href={`/user/${user.address}/wallet`}>
                        <span style={{fontSize: 12}}>Wallet</span>
                    </Link>
                    <Link color="inherit" href={`/user/${user.address}/wallet/token-management`}>
                        <span style={{fontSize: 12}}>Token management</span>
                    </Link>
                    <Link color="inherit" href={`/user/${user.address}/wallet/token-management/tokens`}>
                        <span style={{fontSize: 12}}>Tokens</span>
                    </Link>
                    <Link color="textPrimary">
                        <span style={{fontSize: 12}}>DOM</span>
                    </Link>
                </Breadcrumbs>
            </div>

            <Account alias={user.alias} address={user.address} />

            <p>DOM for {user.token}:</p>


            <Paper style={{width: 500, padding: 10}}>
                Buy:<br />
                {showBuyOrders()}
                <br />
                <br />
                Sell:<br />
                {showSellOrders()}
            </Paper>

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias}
                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management/tokens")}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default DOMPage;