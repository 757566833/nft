import React, {useCallback, useEffect, useMemo} from "react";
import {Box, Typography} from "@mui/material";
import {PreviewItem, usePreview} from "@/context/preview";
import {useFilterValue} from "@/components/preview/context/filter";
import {intersection} from "@/utils";
import {useCountValue} from "@/components/preview/context/count";
import Edit from "@/components/preview/edit";
import {useEdit} from "@/components/preview/context/edit";
import {IContract} from "@/services/contract";
import {CURRENT_CONTRACT} from "@/constant";
import {LocalStorage} from "@/lib/react-context";
import {useWallet} from "@/context/wallet";
import {FixedSizeGrid} from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

const {useLocalStorage} = LocalStorage

export const List: React.FC = () => {
    const [preview, setPreview] = usePreview();
    const [wallet] = useWallet()
    const {chainId} = wallet
    const [filterValue] = useFilterValue();
    const [, setCountValue] = useCountValue()
    const [currentContract] = useLocalStorage<Record<number, IContract | null>>(CURRENT_CONTRACT, {})
    const current = useMemo(() => {
        if (typeof chainId == "number") {
            return currentContract[chainId]
        }
        return
    }, [chainId, currentContract])
    useEffect(() => {
        const map: Record<number, number> = {}
        for (let i = 0; i < preview.length; i++) {
            const group = preview[i];
            for (let j = 0; j < group.length; j++) {
                if (map[group[j].traitId]) {
                    map[group[j].traitId] = map[group[j].traitId] + 1
                } else {
                    map[group[j].traitId] = 1
                }
            }
        }
        setCountValue(map)
    }, [preview, setCountValue])
    const [, setEdit] = useEdit()

    const handleChange = useCallback((group: PreviewItem, index: number) => {
        setEdit({
            visible: true,
            value: {
                index,
                data: group
            }
        })
    }, [setEdit])
    useEffect(() => {
        setPreview([])
    }, [current?.address, setPreview])
    const list = useMemo(() => {
        return preview.filter(item => filterValue.length > 0 ? intersection(filterValue, item.map(i => i.traitId)).length > 0 : true)
    }, [filterValue, preview])
    const row: React.FC<{ columnIndex:number, rowIndex:number, style: React.CSSProperties }> = useCallback((props) => {
        const {columnIndex,rowIndex, style} = props
        const index = rowIndex*6+columnIndex
        const group = list[index]
        return <Box key={index} sx={{...style,}} hidden={!group}>
            <Box
                sx={{
                    '&:hover': {
                        boxShadow: '0px 0px 10px  #b5b5b5',
                        cursor: 'pointer'
                    },
                }}
                border={"1px solid #dde3e7"}
                display={"inline-block"}
                margin={2}
                width={240}
                height={288}
                borderRadius={3}
                overflow={"hidden"}
                onClick={() => handleChange(group, index)}
            >
                <Box width={240} height={240} position={"relative"}>
                    {group?.map((item, index) => {
                        return <Box key={index} width={240} height={240} position={"absolute"}
                                    zIndex={item.zIndex}
                                    component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}
                                    loading={'lazy'}
                        />
                    })}
                </Box>
                <Box paddingLeft={2} paddingTop={1} paddingBottom={1} paddingRight={2}>
                    <Typography lineHeight={2}>{current?.name} {index}</Typography>
                </Box>
            </Box>
        </Box>
    }, [current?.name, handleChange, list])
    return <>
        <Edit/>
        <AutoSizer>
            {({height, width}) => {
                return <FixedSizeGrid
                    columnCount={6}
                    columnWidth={272}
                    height={height}
                    rowCount={Math.ceil(list.length/6)}
                    rowHeight={320}
                    width={width}
                >
                    {row}
                </FixedSizeGrid>
            }}
        </AutoSizer>

    </>
}
export default List
// const Row:React.FC<{index:number,style:React.CSSProperties}> = ({ index, style }) => {
//
//     return <Box
//         sx={{
//             '&:hover': {
//                 boxShadow: '0px 0px 10px  #b5b5b5',
//                 cursor: 'pointer'
//             }
//         }}
//         border={"1px solid #dde3e7"}
//         display={"inline-block"}
//         margin={2}
//         key={index}
//         width={240}
//         height={288}
//         borderRadius={3}
//         overflow={"hidden"}
//         onClick={()=>handleChange(group,index)}
//     >
//         <Box width={240} height={240} position={"relative"}>
//             {group.map((item, index) => {
//                 return <Box key={index} width={240} height={240} position={"absolute"}
//                             zIndex={item.zIndex}
//                             component={"img"} src={`${process.env.NEXT_PUBLIC_FILE}${item.url}`}
//                             loading={'lazy'}
//                 />
//             })}
//         </Box>
//         <Box paddingLeft={2} paddingTop={1} paddingBottom={1} paddingRight={2}>
//             <Typography lineHeight={2}>{current?.name} {index}</Typography>
//         </Box>
//     </Box>
// }
