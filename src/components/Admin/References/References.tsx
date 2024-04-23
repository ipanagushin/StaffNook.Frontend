import ReferenceDataService from "@/services/ReferenceDataService";
import { ReferenceType } from "@/common/ReferenceType";
import { IAvailableValue } from "@/models/AvailableValue";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import ReferenceEditModal from "./ReferenceEditModal";
import ContainerLoader from "@/components/ContainerLoader";

const References = () => {

    const [isLoad, setIsLoad] = useState(true);
    const [actualReference, setActualReference] = useState<IAvailableValue>();
    const [references, setReferences] = useState<IAvailableValue[]>();
    const [typeReference, setTypeReference] = useState<ReferenceType>(ReferenceType.Speciality);
    const [showEditModal, setShowEditModal] = useState(false);

    const onRefresh = () =>{
        setIsLoad(true);
        const fetchTypeEducation = async () =>{
            let referenceValues = await ReferenceDataService.getByType(typeReference);
            setReferences(referenceValues.data);
            setIsLoad(false);
        } 
    
      fetchTypeEducation()
        .catch(console.error);
    }

    useEffect(() => {
       onRefresh();
    }, [typeReference])
    
    const renderActionsCard = (availableValue: IAvailableValue) =>{
        return (
            <>
                <MuiMaterial.IconButton aria-label="edit" onClick={() => onEditReferenceClick(availableValue)}>
                    <MuiIcon.Edit/>
                </MuiMaterial.IconButton>
                
                <MuiMaterial.IconButton disabled aria-label="drop">
                    <MuiIcon.Delete/>
                </MuiMaterial.IconButton>
            </>
        )
    }

    const onAddReferenceClick = () =>{
        setActualReference(undefined);
        setShowEditModal(true);
    }

    const onEditReferenceClick = (reference: IAvailableValue) =>{
        setActualReference(reference);
        setShowEditModal(true);
    }

    const renderReference = (reference: IAvailableValue) => {
        return (
            <>
                <MuiMaterial.Card key={reference.value} variant="outlined" sx={{
                    marginTop:'1%'
                }}>
                    <MuiMaterial.CardHeader 
                        title={reference.name}
                        action={renderActionsCard(reference)}>
                    </MuiMaterial.CardHeader>
                    <MuiMaterial.CardContent>
                        <MuiMaterial.Typography variant="body1">
                            Значение: {reference.value}
                        </MuiMaterial.Typography>
                    </MuiMaterial.CardContent>
                </MuiMaterial.Card>
            </>
        )
    }

    const allReferences : IAvailableValue[] = [
        {value: ReferenceType.Speciality, name: "Специальности"},
        {value: ReferenceType.ProjectType, name: "Тип проекта"},
    ]

    return<>
            <MuiMaterial.Typography variant="h4">Справочники</MuiMaterial.Typography>

            <MuiMaterial.Autocomplete
                    sx={{ mb:2, mt:2 }}
                    disableClearable
                    options={allReferences}
                    renderOption={(props, option) => (
                        <MuiMaterial.Box component="li" {...props}>
                            {option.name}
                        </MuiMaterial.Box>
                    )}
                    getOptionLabel={option => option.name}
                    defaultValue={allReferences[0]}
                    onChange={(_, newValue) =>{
                          setTypeReference(newValue.value as ReferenceType)
                    }}
                    renderInput={(params) => <MuiMaterial.TextField {...params}/>}
                />
           
            <ContainerLoader Loading={isLoad}>
                <MuiMaterial.Stack alignItems="center">
                    <MuiMaterial.IconButton area-label='create' onClick={onAddReferenceClick}>
                        <MuiIcon.AddCircleOutline fontSize="large"/>
                    </MuiMaterial.IconButton>
                </MuiMaterial.Stack>
                
                {references?.map(x => renderReference(x))}
            </ContainerLoader>

            <ReferenceEditModal
                    OnClose={() => setShowEditModal(false)}
                    ShowModal={showEditModal}
                    AvailableValue={actualReference}
                    RefType={typeReference}
                    OnRefresh={onRefresh}
                />
        </>
}

export default References;