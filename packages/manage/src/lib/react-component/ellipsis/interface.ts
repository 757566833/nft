import {DefaultComponentProps} from "@mui/material/OverridableComponent";
import {BoxTypeMap} from "@mui/material";

export interface EllipsisProps extends DefaultComponentProps<BoxTypeMap> {
  ellipsisWidth?: number
}
