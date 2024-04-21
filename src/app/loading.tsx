"use client";

import React, {FC} from 'react';
import Spinner from "@/components/spinner/spinner.component";

const LoadingPage: FC<{ loading: boolean }> = ({loading}) => {
    return (
        <Spinner loading={loading}/>
    );
};

export default LoadingPage;