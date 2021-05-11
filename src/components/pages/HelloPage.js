import React from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Paper, Table } from "@material-ui/core";
import Account from "../reusable/Account";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

function HelloPage() {
    const [user, setUser] = React.useState({
        alias: '',
        address: '',
        balances: []
    });

    const history = useHistory();
    const params = useParams();

    React.useEffect(async () => {
        const fetchedUser = await axios(
            `http://127.0.0.1:5000/${params.address}`
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
                    <Link color="textPrimary">
                        <span style={{fontSize: 12}}>Dashboard</span>
                    </Link>
                </Breadcrumbs>
            </div>
            <Account alias={user.alias} address={user.address} />

            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20}}>
                <Paper>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>Ticker</b></TableCell>
                                <TableCell align="center"><b>Balance</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.balances.map((ticker, i) => (
                                <TableRow key={i}>
                                    <TableCell align="center" component="th" scope="row">
                                        {ticker.ticker}
                                    </TableCell>
                                    <TableCell align="right">{ticker.balance}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

            <br />
            <div style={{marginTop: 20}}>
                <ButtonGroup color="primary" aria-label="outlined secondary button group">
                    <Button
                        disabled={!user.alias}
                        onClick={() => history.push("/user/" + user.address + "/wallet")}>
                        <b>Wallet dashboard</b>
                    </Button>
                </ButtonGroup>
            </div>
            <br />

            <div style={{marginTop: 50}}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <Button
                        onClick={() => history.push("/")}>
                        Back
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default HelloPage;