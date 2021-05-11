import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        height: 160,
        marginBottom: 15
    },
    media: {
        height: 0,
    },
});

function UserCard({alias, address}) {
    const classes = useStyles();

    const history = useHistory();

    const [password, setPassword] = React.useState('');

    function login(address, password) {
        axios.post('http://localhost:5000/check_pass', {address, key: password}).then(res => {
            if (res.data.status === true) {
                setPassword('');
                history.push("/user/" + address);
            } else {
                setPassword('');
            }
        })

    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <div style={{
                    width: 500,
                    height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
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
                </div>
            </CardActionArea>
            <CardActions>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    color={"secondary"}
                    autoComplete="current-password"
                    variant="outlined"
                    style={{width: 400}}
                    size={"small"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    disabled={!password}
                    variant="outlined"
                    color="secondary"
                    onClick={() => login(address, password)}
                >Login</Button>
            </CardActions>
        </Card>
    );
}


export default UserCard;