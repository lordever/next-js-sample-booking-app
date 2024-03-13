"use client";

import React, {FC} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from "@/components/spinner/spinner.component";

const LoadingPage: FC<{ loading: boolean }> = ({loading}) => {
    return (
        <Spinner loading={loading}/>
    );
};

export default LoadingPage;