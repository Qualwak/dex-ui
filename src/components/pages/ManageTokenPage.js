import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Account from "../reusable/Account";
import { Button, ButtonGroup, Paper, TextField } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function ManageTokenPage() {
    const [disabled, setDisabled] = React.useState(false);

    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        message: '',
        token: ''
    });

    const [priSell, setPriSell] = React.useState('');
    const [amoSell, setAmoSell] = React.useState('');

    const [priBuy, setPriBuy] = React.useState('');
    const [amoBuy, setAmoBuy] = React.useState('');

    const [order, setOrder] = React.useState('');
    const [priRem, setPriRem] = React.useState('');

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios(
            `http://127.0.0.1:5000/${params.address}/account/profile_coins/sell_token/${params.ticker}`
        );

        setUser(fetchedUser.data);

    }, [params.address]);

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
                        <span style={{fontSize: 12}}>Manage</span>
                    </Link>
                </Breadcrumbs>
            </div>
            <Account alias={user.alias} address={user.address} />

            <br />
            <div style={{display: 'flex', flexDirection: 'row', columnGap: 15}}>
                <Paper style={{
                    width: 250,
                    height: 250,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: 15
                }}>
                    <span>Sell order</span>

                    <TextField
                        value={priSell} onChange={(e) => setPriSell(e.target.value)}
                        type="number" color={"secondary"} label="Price" variant="outlined" />
                    <TextField
                        value={amoSell} onChange={(e) => setAmoSell(e.target.value)}
                        type="number" color={"secondary"} label="Amount" variant="outlined" />
                    <Button
                        disabled={disabled}
                        // disabled={!rec || !amo}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setDisabled(true);
                            handleSubmitSell(params.address, priSell, amoSell, user.token);
                            setDisabled(false);
                        }}
                    >Place</Button>
                </Paper>
                <Paper style={{
                    width: 250,
                    height: 250,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: 15
                }}>
                    <span>Buy order</span>
                    <TextField
                        value={priBuy} onChange={(e) => setPriBuy(e.target.value)}
                        type="number" color={"secondary"} label="Price" variant="outlined" />
                    <TextField
                        value={amoBuy} onChange={(e) => setAmoBuy(e.target.value)}
                        type="number" color={"secondary"} label="Amount" variant="outlined" />
                    <Button
                        disabled={disabled}
                        // disabled={!rec || !amo}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setDisabled(true);
                            handleSubmitBuy(params.address, priBuy, amoBuy, user.token);
                            setDisabled(false);
                        }}
                    >Place</Button>
                </Paper>
                <Paper style={{
                    width: 250,
                    height: 250,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: 15
                }}>
                    <span>Remove order</span>
                    <TextField
                        value={order} onChange={(e) => setOrder(e.target.value)}
                        color={"secondary"} label="Order type" variant="outlined" />
                    <TextField
                        value={priRem} onChange={(e) => setPriRem(e.target.value)}
                        type="number" color={"secondary"} label="Price" variant="outlined" />
                    <Button
                        disabled={disabled}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setDisabled(true);
                            handleSubmitRemove(params.address, order, priRem, user.token);
                            setDisabled(false);
                        }}
                    >Place</Button>
                </Paper>
            </div>

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias || disabled}
                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management/tokens")}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

function handleSubmitSell(address, pri, amo, token) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/profile_coins/sell_token/${token}`,
        {
            "pri": pri,
            "amo": amo,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

function handleSubmitBuy(address, pri, amo, token) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/profile_coins/buy_token/${token}`,
        {
            "pri": pri,
            "amo": amo,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

function handleSubmitRemove(address, order, pri, token) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/profile_coins/remove_order/${token}`,
        {
            "sell": order,
            "pri": pri,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

export default ManageTokenPage;