import { useLocation } from 'react-router';

export const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return '';
    if (path.startsWith('/profile/tickets')) return 'Мої заявки';
    if (path.startsWith('/profile')) return 'Особистий кабінет';
    if (path.startsWith('/admin/comparison')) return 'Порівняння алгоритмів сортування';
    if (path.startsWith('/admin/tickets')) return 'Керування заявками';
    if (path.startsWith('/admin/user')) return 'Керування користувачами';
    if (path.startsWith('/admin/settings')) return 'Налаштування';
    return 'Сервісний центр';
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background/95 ">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold   uppercase">{getPageTitle()}</h1>
      </div>
    </header>
  );
};
