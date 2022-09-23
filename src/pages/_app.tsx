import type {AppProps} from 'next/app'
import {CacheProvider} from '@emotion/react';
import Head from 'next/head';
import Router from "next/router";
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from "../config/createEmotionCache";
import {EmotionCache} from "@emotion/utils";
import Layout from "../layout";
import React, {PropsWithChildren, useCallback, useMemo} from "react";
import '@/styles/global.css'
import "nprogress/nprogress.css"
import NProgress from "nprogress";
import DynamicRender from '../context'
import dynamic from "next/dynamic";
import {GlobalStyles} from "@/lib/style";

const clientSideEmotionCache = createEmotionCache();
// const DynamicRender = dynamic<any>(() => import('../context'), {
//     ssr: false,
// })

interface Props extends AppProps<any> {
    emotionCache: EmotionCache
}

NProgress.configure({
    template: '<div class="bar" role="bar" style="z-index: 999999999999999999"><div class="peg"></div></div><div class="spinner" role="spinner" style="z-index: 999999999999999999"><div class="spinner-icon"></div></div>'
});
// 持久化空变量
const empty = {}
const MyApp: React.FC<PropsWithChildren<Props>> = (props) => {
    const {Component, emotionCache, pageProps} = props;
    const memoEmotionCache = useMemo(() => emotionCache ? emotionCache : clientSideEmotionCache, [emotionCache])
    const memoPageProps = useMemo(() => pageProps ? pageProps : empty, [pageProps])
    const handleRouteStart = useCallback(() => NProgress.start(), []);
    const handleRouteDone = useCallback(() => NProgress.done(), []);
    React.useEffect(() => {

        Router.events.on("routeChangeStart", handleRouteStart);
        Router.events.on("routeChangeComplete", handleRouteDone);
        Router.events.on("routeChangeError", handleRouteDone);

        return () => {
            // Make sure to remove the event handler on unmount!
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };
    }, [handleRouteDone, handleRouteStart]);

    return <CacheProvider value={memoEmotionCache}>
        <Head>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <GlobalStyles/>
        </Head>
        <CssBaseline/>
        <DynamicRender>
            <Layout>
                {/*@ts-ignore*/}
                <Component {...memoPageProps} />
            </Layout>
        </DynamicRender>
    </CacheProvider>
}

export default MyApp
