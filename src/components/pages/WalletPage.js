import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, ButtonGroup, CircularProgress, Paper } from "@material-ui/core";
import Account from "../reusable/Account";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function WalletPage() {
    const [disabled, setDisabled] = React.useState(false);

    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        message: ''
    });

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios(
            `http://127.0.0.1:5000/${params.address}/account`
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
                    <Link color="textPrimary">
                        <span style={{fontSize: 12}}>Wallet</span>
                    </Link>
                </Breadcrumbs>
            </div>
            <Account alias={user.alias} address={user.address} />

            <Paper style={{
                width: 300,
                height: 50,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20
            }}>
                <div style={{display: 'flex', alignItems: 'center', columnGap: 10, marginLeft: 20}}>
                    <AccountBalanceWalletIcon color={"secondary"} fontSize={"small"} />
                    <span>Wallet {user.message ? 'created' : ''}</span>
                </div>
                <div style={{marginRight: 20}}>
                    {disabled ? <CircularProgress color="secondary" /> : <Button
                        variant="outlined"
                        color="secondary"
                        onClick={async () => {
                            setDisabled(true)

                            const response = await axios(
                                `http://127.0.0.1:5000/${params.address}/account/create_wallet`
                            );

                            setUser(response.data);
                            setDisabled(false);
                        }}
                    >Create</Button>}
                </div>
            </Paper>

            <br />

            <div style={{marginTop: 20}}>
                <ButtonGroup color="primary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias || disabled}
                        onClick={() => history.push("/user/" + user.address + "/wallet/eth-management")}>
                        <b>ETH management</b>
                    </Button>
                    <Button
                        disabled={!user.alias || disabled}
                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management")}>
                        <b>Token management</b>
                    </Button>
                </ButtonGroup>
            </div>
            <br />

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias}
                        onClick={() => history.push("/user/" + user.address)}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default WalletPage;