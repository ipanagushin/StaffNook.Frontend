export interface IClaim {
  key: string;
  value: string;
}

export interface IGroupedClaim {
  groupName: string;
  claims: { [name: string]: string };
}
