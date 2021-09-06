import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { alertService, AlertType } from '../services/alert.service';
import { history } from '../helpers/history';

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        //subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
        .subscribe(alert => {
            //@ts-expect-error
            if (!alert.message) {
                setAlerts(alerts => {
                    const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                    filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                    return filteredAlerts;
                });
            } else {
                setAlerts(alerts => ([...alerts, alert]));
                //@ts-expect-error
                if (alert.autoClose) {
                    setTimeout(() => removeAlert(alert), 3000);
                }
            }
        });

        const historyUnlisten = history.listen(({ pathname }) => {
            if (pathname.endsWith('/')) return;

            alertService.clear(id);
        });

        return () => {
            subscription.unsubscribe();
            historyUnlisten();
        };
    });

    function removeAlert(alert) {
        if (fade) {
            const alertWithFade = { ...alert, fade: true};
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            setAlerts(alerts => alerts.filter(x => x!== alert));
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type])

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="container">
            <div className="m-3">
                {alerts.map((alert, index) =>
                
                // eslint-disable-next-line react/jsx-no-comment-textnodes
                <div key={index} className={cssClasses(alert)}>
                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid*/ }
                    <a className="close" onClick={() => removeAlert(alert)}>&times;</a>
                    <span dangerouslySetInnerHTML={{__html: alert.message}}></span>
                </div>
                )}
            </div>
        </div>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };