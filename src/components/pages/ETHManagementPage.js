import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Account from "../reusable/Account";
import { Button, ButtonGroup, Paper, TextField } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

function ETHManagementPage() {
    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        balance: 0,
        message: '',
    });

    const [dep, setDep] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');
    const [rec, setRec] = React.useState('');
    const [amo, setAmo] = React.useState('');

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios.get(
            `http://127.0.0.1:5000/${params.address}/account/eth_management`
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
                        <span style={{fontSize: 12}}>ETH management</span>
                    </Link>
                </Breadcrumbs>
            </div>
            <Account alias={user.alias} address={user.address} balance={true} value={user.balance} />

            <div style={{display: 'flex', flexDirection: 'row', columnGap: 15, marginTop: 20}}>
                <Paper style={{
                    width: 250,
                    height: 250,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: 15
                }}>
                    <span>Send</span>
                    <TextField
                        value={rec} onChange={(e) => setRec(e.target.value)}
                        color={"secondary"} label="Receiver" variant="outlined" />
                    <TextField
                        value={amo} onChange={(e) => setAmo(e.target.value)}
                        type="number" color={"secondary"} label="Amount" variant="outlined" />
                    <Button
                        disabled={!rec || !amo}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setUser({...user, balance: parseInt(user.balance) - parseInt(amo)})
                            handleSubmitSend(params.address, rec, amo)
                        }}
                    >Send</Button>
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
                    <span>Deposit</span>
                    <TextField
                        value={dep} onChange={(e) => setDep(e.target.value)}
                        type="number" color={"secondary"} label="Amount" variant="outlined" />
                    <Button
                        disabled={!dep}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setUser({...user, balance: parseInt(user.balance) + parseInt(dep)})
                            handleSubmit(params.address, dep, '')
                            setDep('');
                        }}
                    >Deposit</Button>
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
                    <span>Withdraw</span>
                    <TextField
                        value={withdraw} onChange={(e) => setWithdraw(e.target.value)}
                        type="number" color={"secondary"} label="Amount" variant="outlined" />
                    <Button
                        disabled={!withdraw}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setUser({...user, balance: parseInt(user.balance) - parseInt(withdraw)})
                            handleSubmit(params.address, '', withdraw)
                            setWithdraw('');
                        }}
                    >Withdraw</Button>
                </Paper>
            </div>

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias}
                        onClick={() => history.push("/user/" + user.address + "/wallet")}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

function handleSubmit(address, dep, withdraw) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/eth_management`,
        {
            "dep": dep,
            "with": withdraw,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

function handleSubmitSend(address, rec, amo) {
    axios.post(
        `http://127.0.0.1:5000/${address}/account/eth_management/send_eth`,
        {
            "rec": rec,
            "amo": amo,
        }
    ).then(res => console.log(JSON.stringify(res)));
}

export default ETHManagementPage;