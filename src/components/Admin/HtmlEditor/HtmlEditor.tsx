import SunEditor, { buttonList } from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'


interface IHtmlEditorProps{
    onChange: (content: string) => void,
    value?: string 
}

const HtmlEditor = (props: IHtmlEditorProps) =>{
    return(<>
        <SunEditor
            onChange={props.onChange}
            setContents={props.value}
            setDefaultStyle="font-size:14px;"
            setOptions={{
                buttonList: buttonList.complex,
                height: '100%'
            }}
            />
    </>)
}

export default HtmlEditor;