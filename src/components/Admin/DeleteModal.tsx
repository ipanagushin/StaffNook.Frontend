import * as MuiMaterial from "@mui/material";

interface IProps{
    objectId?: string,
    onClose: () => void,
    handleDeleteConfirm: (objectId?: string) => void,
    showModal: boolean
}

const DeleteModal = (modalInfo: IProps) =>{
    return(
        <MuiMaterial.Dialog maxWidth={'md'} open={modalInfo.showModal} onClose={() => modalInfo.onClose()}>
            <MuiMaterial.DialogTitle>Удалить запись?</MuiMaterial.DialogTitle>
            <MuiMaterial.DialogContent>
            <MuiMaterial.DialogContentText>
                Вы уверены, что хотите удалить данную запись? Данное действие нельзя будет отменить.
            </MuiMaterial.DialogContentText>
            </MuiMaterial.DialogContent>
            <MuiMaterial.DialogActions>
            <MuiMaterial.Button onClick={() => modalInfo.onClose()} autoFocus>Отмена</MuiMaterial.Button>
            <MuiMaterial.Button onClick={()=> {
                modalInfo.handleDeleteConfirm(modalInfo.objectId);
                modalInfo.onClose();
            }}>
                Удалить
            </MuiMaterial.Button>
            </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    )
}

export default DeleteModal;