import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import { accountService } from 'services/account.service';

function VerifyEmail({ history }) {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {
        const {token} = queryString.parse(location.search);

        history.replace(location.pathname);

        accountService.verifyEmail(token);
    })
}