import React from 'react';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

function Account({alias, address, balance, value}) {
    return (
        <Paper style={{width: 500, height: 100, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', columnGap: 10, marginLeft: 20}}>
                <AccountBoxIcon color={"secondary"} fontSize={"medium"} />
                <span>{alias}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', columnGap: 10, marginLeft: 20}}>
                <VpnKeyIcon color={"secondary"} fontSize={"medium"} />
                <span>{address}</span>
                <IconButton
                    onClick={() => navigator.clipboard.writeText(address)}
                    aria-label="delete" size="small">
                    <FileCopyIcon fontSize="inherit" />
                </IconButton>
            </div>
            {balance && (
                <div style={{display: 'flex', alignItems: 'center', columnGap: 10, marginLeft: 20}}>
                    <AccountBalanceWalletIcon color={"secondary"} fontSize={"medium"} />
                    <span>{value} ETH</span>
                </div>
            )}
        </Paper>
    );
}

export default Account;