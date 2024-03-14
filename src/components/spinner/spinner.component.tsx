import React, {FC} from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner: FC<{ loading: boolean, size?: number }> = ({loading, size = 150}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            margin: '0 auto'
        }}>
            <ClipLoader
                color="#3b82f6"
                loading={loading}
                size={size}
                aria-label="Loading Spinner"
            />
        </div>
    );
};

export default Spinner;