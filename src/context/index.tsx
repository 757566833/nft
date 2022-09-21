import React, {PropsWithChildren} from "react";
import {LocalStorage} from "@/lib/react-context";
import ModeProvider from "@/context/mode";
import ThemeProvider from "@/context/theme";
const {LocalStorageProvider} = LocalStorage

export const Context: React.FC<PropsWithChildren<unknown>> = (props) => {
    const {children} = props;
    return <LocalStorageProvider>
        <ModeProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </ModeProvider>
    </LocalStorageProvider>
}
export default Context;
