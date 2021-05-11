import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Account from "../reusable/Account";
import { Button, ButtonGroup, Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    table: {
        maxWidth: 650,
    },
});

function TokensPage() {
    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        tickers: []
    });

    const classes = useStyles();

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios(
            `http://127.0.0.1:5000/${params.address}/account/profile_coins/available_coins`
        );

        setUser(fetchedUser.data);

    }, [params.address]);

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 100}}>
            <div style={{ width: 500, marginBottom: 5}}>
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
                    <Link color="textPrimary">
                        <span style={{fontSize: 12}}>Tokens</span>
                    </Link>
                </Breadcrumbs>
            </div>
            <Account alias={user.alias} address={user.address} />

            <Paper style={{marginTop: 20}}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ticker</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Balance</TableCell>
                            <TableCell align="center" />
                            <TableCell align="center" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.tickers.map((ticker, i) => (
                            <TableRow key={i}>
                                <TableCell align="center" component="th" scope="row">
                                    {ticker.ticker}
                                </TableCell>
                                <TableCell align="right">{ticker.address}</TableCell>
                                <TableCell align="right">{ticker.balance}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management/tokens/view/" + ticker.ticker)}
                                    >DOM</Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management/tokens/manage/" + ticker.ticker)}
                                    >Manage</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias}
                        onClick={() => history.push("/user/" + user.address + "/wallet/token-management")}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default TokensPage;