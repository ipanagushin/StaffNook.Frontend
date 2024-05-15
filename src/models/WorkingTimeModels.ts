export interface ICreateWorkingTimeDto {
    projectId?: string;
    time?: number;
    description?: string;
    reportDate?: string;
}

export interface IUpdateWorkingTimeDto {
    id: string;
    projectId?: string;
    time: number;
    description: string;
    reportDate?: string;
}
  
export interface IWorkingTimeInfoDto {
    id: string;
    projectId?: string;
    projectName: string;
    time: number;
    description: string;
    reportDate: string;
}

export interface IWorkingTimeCalendarDto{
    calendar: IProductionCalendarModel[];
    reports: IWorkingTimeInfoDto[];
}

export interface IProductionCalendarModel{
    date: string;
    isDayOff: boolean;
    isShortDay: boolean;
}
  