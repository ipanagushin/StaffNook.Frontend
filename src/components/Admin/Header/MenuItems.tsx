import Roles from "../Roles/Roles";
import Users from "../Users/Users";

interface IAdminMenuItem{
    Name: string,
    Path: string,
    PageId: string,
    Component: JSX.Element
}

export interface IGroupAdminMenu{
    Name: string,
    MenuItems: IAdminMenuItem[]
}

// const Basic : IAdminMenuItem[] = [
//     {
//         Name: "Курсы",
//         PageId: "courses",
//         Path: "/admin/courses",
//         Component: <AdminCourses/>
//     },
//     {
//         Name: "Отклики",
//         Path: "/admin/negotiations",
//         PageId: "negotiations",
//         Component: <AdminNegotiations/>
//     },
//     {
//         Name: "Справочники",
//         Path: "/admin/references",
//         PageId: "references",
//         Component: <References/>
//     },
//     {
//         Name: "Новости",
//         Path: "/admin/news",
//         PageId: "news",
//         Component: <News/>
//     },
//     {
//         Name: "События",
//         Path: "/admin/base-events",
//         PageId: "base-events",
//         Component: <Events PublicationType={PublicationTypeEnum.Base}/>
//     },
//     {
//         Name: "Преподаватели",
//         Path: "/admin/base-educators",
//         PageId: "base-educators",
//         Component: <Educator PublicationType={PublicationTypeEnum.Base}/>
//     }
// ]

// const Dovuz : IAdminMenuItem[] = [
//     {
//         Name: "Категории - курсы",
//         PageId: "dovuz-courses",
//         Path: "/admin/dovuz-courses",
//         Component: <DovuzCategories/>
//     },
//     {
//         Name: "Объёмы курсов",
//         PageId: "dovuz-volumes",
//         Path: "/admin/dovuz-volumes",
//         Component: <DovuzVolumes/>
//     },
//     {
//         Name: "События",
//         Path: "/admin/dovuz-events",
//         PageId: "dovuz-events",
//         Component: <Events PublicationType={PublicationTypeEnum.Dovuz}/>
//     },
//     {
//         Name: "Преподаватели",
//         Path: "/admin/dovuz-educators",
//         PageId: "dovuz-educators",
//         Component: <Educator PublicationType={PublicationTypeEnum.Dovuz}/>
//     }
// ]

const Settings : IAdminMenuItem[] = [
    {
        Name: "Сотрудники",
        Path: "/admin/users",
        PageId: "users",
        Component: <Users/>
    },
    {
        Name: "Роли",
        Path: "/admin/roles",
        PageId: "roles",
        Component: <Roles/>
    }
];

export const GroupedMenuItems :IGroupAdminMenu[] = [
    // {
    //     Name: "Основные",
    //     MenuItems: Basic
    // },
    // {
    //     Name: "Довуз",
    //     MenuItems: Dovuz
    // },
    {
        Name: "Настройки системы",
        MenuItems: Settings
    },
]