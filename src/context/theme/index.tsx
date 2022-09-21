import {createTheme, ThemeProvider as ControlTheme} from '@mui/material/styles';
import React, {PropsWithChildren} from "react";
import {useMode} from "@/context/mode";
const baseWhite = '#fff'
const baseBlock = '#212121'
const white= {
    /**
     * Preview: ![blue 50](https://mui.com/static/colors-preview/blue-50-24x24.png)
     */
    50: baseWhite,
    /**
     * Preview: ![blue 100](https://mui.com/static/colors-preview/blue-100-24x24.png)
     */
    100: baseWhite,
    /**
     * Preview: ![blue 200](https://mui.com/static/colors-preview/blue-200-24x24.png)
     */
    200: baseWhite,
    /**
     * Preview: ![blue 300](https://mui.com/static/colors-preview/blue-300-24x24.png)
     */
    300: baseWhite,
    /**
     * Preview: ![blue 400](https://mui.com/static/colors-preview/blue-400-24x24.png)
     */
    400: baseWhite,
    /**
     * Preview: ![blue 500](https://mui.com/static/colors-preview/blue-500-24x24.png)
     */
    500: baseWhite,
    /**
     * Preview: ![blue 600](https://mui.com/static/colors-preview/blue-600-24x24.png)
     */
    600: baseWhite,
    /**
     * Preview: ![blue 700](https://mui.com/static/colors-preview/blue-700-24x24.png)
     */
    700: baseWhite,
    /**
     * Preview: ![blue 800](https://mui.com/static/colors-preview/blue-800-24x24.png)
     */
    800: baseWhite,
    /**
     * Preview: ![blue 900](https://mui.com/static/colors-preview/blue-900-24x24.png)
     */
    900: baseWhite,
    /**
     * Preview: ![blue A100](https://mui.com/static/colors-preview/blue-A100-24x24.png)
     */
    A100: baseWhite,
    /**
     * Preview: ![blue A200](https://mui.com/static/colors-preview/blue-A200-24x24.png)
     */
    A200: baseWhite,
    /**
     * Preview: ![blue A400](https://mui.com/static/colors-preview/blue-A400-24x24.png)
     */
    A400: baseWhite,
    /**
     * Preview: ![blue A700](https://mui.com/static/colors-preview/blue-A700-24x24.png)
     */
    A700: baseWhite,
};
const block= {
    /**
     * Preview: ![blue 50](https://mui.com/static/colors-preview/blue-50-24x24.png)
     */
    50: baseBlock,
    /**
     * Preview: ![blue 100](https://mui.com/static/colors-preview/blue-100-24x24.png)
     */
    100: baseBlock,
    /**
     * Preview: ![blue 200](https://mui.com/static/colors-preview/blue-200-24x24.png)
     */
    200: baseBlock,
    /**
     * Preview: ![blue 300](https://mui.com/static/colors-preview/blue-300-24x24.png)
     */
    300: baseBlock,
    /**
     * Preview: ![blue 400](https://mui.com/static/colors-preview/blue-400-24x24.png)
     */
    400: baseBlock,
    /**
     * Preview: ![blue 500](https://mui.com/static/colors-preview/blue-500-24x24.png)
     */
    500: baseBlock,
    /**
     * Preview: ![blue 600](https://mui.com/static/colors-preview/blue-600-24x24.png)
     */
    600: baseBlock,
    /**
     * Preview: ![blue 700](https://mui.com/static/colors-preview/blue-700-24x24.png)
     */
    700: baseBlock,
    /**
     * Preview: ![blue 800](https://mui.com/static/colors-preview/blue-800-24x24.png)
     */
    800: baseBlock,
    /**
     * Preview: ![blue 900](https://mui.com/static/colors-preview/blue-900-24x24.png)
     */
    900: baseBlock,
    /**
     * Preview: ![blue A100](https://mui.com/static/colors-preview/blue-A100-24x24.png)
     */
    A100: baseBlock,
    /**
     * Preview: ![blue A200](https://mui.com/static/colors-preview/blue-A200-24x24.png)
     */
    A200: baseBlock,
    /**
     * Preview: ![blue A400](https://mui.com/static/colors-preview/blue-A400-24x24.png)
     */
    A400: baseBlock,
    /**
     * Preview: ![blue A700](https://mui.com/static/colors-preview/blue-A700-24x24.png)
     */
    A700: baseBlock,
};
const ThemeProvider:React.FC<PropsWithChildren<unknown>> = (props)=>{
    const {children} = props;
    const [mode] = useMode();
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary:mode=="dark"?white:block,
                },
                components:{
                  MuiAppBar:{
                      styleOverrides:{
                          root:{
                              background:mode=="dark"?"#212121":"#fff"
                          }
                      }
                  }

                }
            }),
        [mode],
    );
    return <ControlTheme theme={theme}>
        <meta name="color-scheme" id={'colorScheme'} content={mode}/>
        {children}
    </ControlTheme>
}
export  default  ThemeProvider
