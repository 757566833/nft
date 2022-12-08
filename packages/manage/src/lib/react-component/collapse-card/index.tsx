import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import {CollapseCardProps} from 'src/lib/react-component/collapse-card/interface';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PropsWithChildren, useCallback} from "react";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const  CollapseCard:React.FC<PropsWithChildren<CollapseCardProps>>  = (props)=> {
    const [expanded, setExpanded] = React.useState(false);
    const {children,actions,collapse} = props;
    const handleExpandClick = useCallback(() => {
        setExpanded(!expanded);
    },[expanded])

    return (
        <Card>
            {children}
            <CardActions disableSpacing>
                {actions}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {collapse}
                </CardContent>
            </Collapse>
        </Card>
    );
}
export  default CollapseCard
