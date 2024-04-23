import { PropsWithChildren, useState } from "react";
import * as MuiMaterial from '@mui/material';
import "./SideBarDropdown.css"
import { useTheme } from '@mui/material/styles';

interface SideBarProps{
    GroupName: string
}

const SideBarDropdown = (props: PropsWithChildren<SideBarProps>) => {
    const [hasToogle, setHasToogle] = useState(true);
    const theme = useTheme();

    return(
        <>
            <MuiMaterial.Typography
                fontWeight='500'
                className="sidebar-menu"
                onClick={_ => setHasToogle(!hasToogle)}
                aria-expanded={hasToogle}
                sx={{
                    color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary,
                }}
            >
                {props.GroupName}
            </MuiMaterial.Typography>
            <MuiMaterial.Collapse in={hasToogle}>
                    <MuiMaterial.Typography sx={{
                        paddingLeft: '7%'
                    }}>
                        {props.children}
                    </MuiMaterial.Typography>
            </MuiMaterial.Collapse>
        </>
    )
}

export default SideBarDropdown;
