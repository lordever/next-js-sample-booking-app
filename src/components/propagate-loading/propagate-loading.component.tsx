import React, {FC} from 'react';
import {PropagateLoader} from "react-spinners";

const PropagateLoading: FC<{ loading: boolean }> = ({loading}) => {
    return (
        <div style={{
            margin: '0 auto'
        }}>
            <PropagateLoader
                color="#3b82f6"
                loading={loading}
                size={10}
                aria-label="Loading Spinner"
            />
        </div>
    );
};

export default PropagateLoading;