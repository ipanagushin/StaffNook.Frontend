export class NavMenuItem {
  constructor(name: string, isEveryoneAvailable: boolean, href?: string) {
    this.Name = name;
    this.Href = href;
    this.IsEveryoneAvailable = isEveryoneAvailable;
  }

  Name!: string;
  Href: string | undefined;
  IsEveryoneAvailable: boolean;
}

export const HeaderMenuConstants = [
  new NavMenuItem("Сотрудники", true, "/employees"),
  new NavMenuItem("Мой профиль", true, "/my-profile"),
  new NavMenuItem("Мои отчеты", true, "/my-reports"),
  // new NavMenuItem("Отчеты пользователей", false, "/user-reports"),
];
