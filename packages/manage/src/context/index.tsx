import React, {PropsWithChildren} from "react";
import {LocalStorage} from "@/lib/react-context";
import ModeProvider from "@/context/mode";
import ThemeProvider from "@/context/theme";
import PreviewProvider from "@/context/preview";
import WalletProvider from "@/context/wallet";
import ContractProvider from "@/context/contract";

const {LocalStorageProvider} = LocalStorage

export const Context: React.FC<PropsWithChildren> = (props) => {
    const {children} = props;
    return <LocalStorageProvider>
        <ModeProvider>
            <ThemeProvider>
                <WalletProvider>
                    <PreviewProvider>
                        <ContractProvider>
                            {children}
                        </ContractProvider>
                    </PreviewProvider>
                </WalletProvider>
            </ThemeProvider>
        </ModeProvider>
    </LocalStorageProvider>
}
export default Context;
