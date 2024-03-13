import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { IAvailableValue } from "@/models/AvailableValue";
import _ from "lodash";
import { useState } from "react";
import ReferenceDataService from "@/services/ReferenceDataService";
import { ReferenceType } from "@/common/ReferenceType";

interface IReferenceEditModalProps{
    AvailableValue?: IAvailableValue
    RefType: ReferenceType,
    OnClose: () => void,
    OnRefresh: () => void,
    ShowModal: boolean
}

const ReferenceEditModal = (modalInfo: IReferenceEditModalProps) =>{

    const [reference, setReference] = useState<IAvailableValue | undefined>(modalInfo.AvailableValue);
    const [titleError, setTitleError] = useState(false);



    const onClose = () =>{
        setReference(undefined);
        setTitleError(false);
        modalInfo.OnClose();
    }

    const onSaveReference = () =>{
        const postAct = () => {
            setReference(undefined);
            setTitleError(false);
            modalInfo.OnClose();
            modalInfo.OnRefresh();
        }

        setTitleError(!reference?.name.trim());

        if(reference?.name.trim() === ""){
            return;
        }

        if(_.isUndefined(modalInfo.AvailableValue)){
            ReferenceDataService.addReference(modalInfo.RefType, reference!)
                .then(postAct)
                .catch(console.error);
        }
        else{
            ReferenceDataService.updateReference(modalInfo.RefType, reference!)
                .then(postAct)
                .catch(console.error);
        }
    }

    return(
        <>
            <MuiMaterial.Dialog open={modalInfo.ShowModal}
                maxWidth={'md'} 
                fullWidth
                sx={{ 
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <MuiMaterial.DialogTitle>
                        {modalInfo.AvailableValue !== undefined ? "Редактирование записи" : "Добавление новой записи"}
                        <MuiMaterial.IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                            >
                            <MuiIcon.Close />
                        </MuiMaterial.IconButton>
                    </MuiMaterial.DialogTitle>
                    <MuiMaterial.DialogContent>
                        <MuiMaterial.Stack spacing={3}>
                            <MuiMaterial.TextField
                                label="Название"
                                variant="standard"
                                size="medium"
                                value={reference?.name ?? modalInfo.AvailableValue?.name}
                                onChange={(event) => setReference(() => ({
                                    value: modalInfo.AvailableValue?.value ?? "",
                                    name: event.target.value
                                    })
                                )}
                                error={titleError}
                                helperText={titleError && "Поле не может быть пустым"}
                            />

                            <MuiMaterial.Button variant="outlined" onClick={onSaveReference}>
                                Сохранить
                            </MuiMaterial.Button>
                        </MuiMaterial.Stack>
                    </MuiMaterial.DialogContent>
            </MuiMaterial.Dialog>
        
        </>
    )
}

export default ReferenceEditModal;