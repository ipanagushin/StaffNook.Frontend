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
  new NavMenuItem("Мои отчеты", true, "/my-reports"),
  new NavMenuItem("Отчеты пользователей", false, "/user-reports"),
  // Возможно в будущем
  // new NavMenuItem("Отчеты по задачам", "/issue-reports"),
];
