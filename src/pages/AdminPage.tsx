import AdminLayout from "@/components/Admin/AdminLayout";
import { GroupedMenuItems } from "@/components/Admin/Header/MenuItems";
import IdentityService from "@/services/IdentityService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

type AdminPageRouteParams = {
    pageId: string
}

const AdminPage = () =>{
    const {pageId}  = useParams<AdminPageRouteParams>();
    // const [currentUser, setCurrentUser] = useState<ICurrentUser>();

    useEffect(() => {
        const fecthCheck = async () =>{
            let currentUser = await IdentityService.getCurrentUserInfo();
            // setCurrentUser(currentUser.data);
        }

        fecthCheck()
            .catch(_ => {
                window.location.replace('/')
            })
    }, [])

    let routePage = GroupedMenuItems.flatMap(x => x.MenuItems).find(mi => mi.PageId == pageId);

    return (
        <AdminLayout PageId={pageId || ''}>
        {
        routePage?.Component
        }
        </AdminLayout>
    )
}

export default AdminPage;