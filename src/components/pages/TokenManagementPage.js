import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Account from "../reusable/Account";
import { Button, ButtonGroup, Paper, TextField } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function TokenManagementPage() {
    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        message: '',
    });

    const [supply, setSupply] = React.useState(100);
    const [name, setName] = React.useState('');
    const [symbols, setSymbols] = React.useState('');

    const [rec, setRec] = React.useState('');
    const [amo, setAmo] = React.useState('');
    const [tic, setTic] = React.useState('');

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios(
            `http://127.0.0.1:5000/${params.address}/account/profile_coins`
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
                    <Link color="textPrimary">
                        <span style={{fontSize: 12}}>Token management</span>
                    </Link>
                </Breadcrumbs>
            </div>
            <Account alias={user.alias} address={user.address} />

            <br />
            <div style={{display: 'flex', flexDirection: 'row', columnGap: 15}}>
                <Paper style={{
                    width: 250,
                    height: 400,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: 15
                }}>
                    <span>Create new token</span>

                    <TextField
                        value={name} onChange={(e) => setName(e.target.value)}
                        color={"secondary"} label="Name" variant="outlined" />
                    <TextField
                        value={supply} //onChange={(e) => setSupply(e.target.value)}
                        type="number" color={"secondary"} label="Total supply" variant="outlined" />
                    <TextField
                        value={symbols} onChange={(e) => setSymbols(e.target.value)}
                        color={"secondary"} label="Symbol" variant="outlined" />
                    {/*<TextField*/}
                    {/*    value={decimals} onChange={(e) => setDecimals(e.target.value)}*/}
                    {/*    type="number" color={"secondary"} label="Decimals" variant="outlined" />*/}
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleSubmitCreateToken(params.address, supply, name, symbols)}
                    >Create</Button>
                </Paper>
                <Paper style={{
                    width: 250,
                    height: 400,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: 15
                }}>
                    <span>Send token</span>
                    <TextField
                        value={tic} onChange={(e) => setTic(e.target.value)}
                        color={"secondary"} label="Symbol" variant="outlined" />
                    <TextField
                        value={rec} onChange={(e) => setRec(e.target.value)}
                        color={"secondary"} label="Receiver" variant="outlined" />
                    <TextField
                        value={amo} onChange={(e) => setAmo(e.target.value)}
                        type="number" color={"secondary"} label="Amount" variant="outlined" />
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleSubmitSendToken(params.address, rec, amo, tic)}
                    >Send</Button>
                </Paper>
            </div>

            <br />
            <div style={{marginTop: 20}}>
                <ButtonGroup color="primary" aria-label="outlined secondary button group">
                    <Button
                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management/tokens")}>
                        <b>Token List</b>
                    </Button>
                </ButtonGroup>
            </div>

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        onClick={() => history.push("/user/" + user.address + "/wallet")}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>

            <br />
        </div>
    );
}

function handleSubmitCreateToken(address, tot, name, sym,) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/profile_coins/create_token`,
        {
            "tot": tot,
            "name": name,
            "sym": sym,
            "dec": 18,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

function handleSubmitSendToken(address, rec, amo, tic) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/profile_coins/send_token`,
        {
            "rec": rec,
            "amo": amo,
            "tic": tic,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

export default TokenManagementPage;