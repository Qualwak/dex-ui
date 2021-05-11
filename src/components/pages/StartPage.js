import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from "../reusable/UserCard";


const useStyles = makeStyles({
    table: {
        maxWidth: 650,
    },
});

function StartPage() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(async () => {
        const fetchedUsers = await axios(
            'http://127.0.0.1:5000/'
        );

        setUsers(fetchedUsers.data);
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'column',
            marginTop: 20
        }}>
            <div>
                {users.map((user) => (
                    <UserCard key={user.id} alias={user.alias} address={user.address} />
                ))}
            </div>
        </div>
    );
}

export default StartPage;