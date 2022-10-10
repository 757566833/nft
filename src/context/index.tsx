import React, {PropsWithChildren} from "react";
import {LocalStorage} from "@/lib/react-context";
import ModeProvider from "@/context/mode";
import ThemeProvider from "@/context/theme";
import PreviewProvider from "@/context/preview";

const {LocalStorageProvider} = LocalStorage

export const Context: React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    return <LocalStorageProvider>
        <ModeProvider>
            <ThemeProvider>
                <PreviewProvider>
                    {children}
                </PreviewProvider>
            </ThemeProvider>
        </ModeProvider>
    </LocalStorageProvider>
}
export default Context;
