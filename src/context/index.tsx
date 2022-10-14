import React, {PropsWithChildren} from "react";
import {LocalStorage} from "@/lib/react-context";
import ModeProvider from "@/context/mode";
import ThemeProvider from "@/context/theme";
import PreviewProvider from "@/context/preview";
import WalletProvider from "@/context/wallet";

const {LocalStorageProvider} = LocalStorage

export const Context: React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    return <LocalStorageProvider>
        <ModeProvider>
            <ThemeProvider>
                <WalletProvider>
                    <PreviewProvider>
                        {children}
                    </PreviewProvider>
                </WalletProvider>

            </ThemeProvider>
        </ModeProvider>
    </LocalStorageProvider>
}
export default Context;
