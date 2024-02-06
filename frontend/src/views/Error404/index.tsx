import { useRouteError } from 'react-router-dom';

import styles from './Error404.module.css';

const Error404 = () => {
    const error: any = useRouteError();

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>ERROR {error.status}!</h3>
            <p className={styles.description}>{error.data}</p>
        </div>
    );
};

export default Error404;