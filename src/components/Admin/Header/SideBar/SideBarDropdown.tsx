import { PropsWithChildren, useState } from "react";
import * as MuiMaterial from '@mui/material';
import "./SideBarDropdown.css"

interface SideBarProps{
    GroupName: string
}

const SideBarDropdown = (props: PropsWithChildren<SideBarProps>) => {
    
    const [hasToogle, setHasToogle] = useState(true);

    return(
        <>
            <MuiMaterial.Typography
                fontWeight='500'
                className="sidebar-menu"
                onClick={_ => setHasToogle(!hasToogle)}
                aria-expanded={hasToogle}
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