export interface ICreateWorkingTimeDto {
    projectId: string;
    time: number;
    description: string;
}

export interface IUpdateWorkingTimeDto {
    projectId: string;
    time: number;
    description: string;
}
  
export interface IWorkingTimeInfoDto {
    projectId: string;
    time: number;
    description: string;
}
  