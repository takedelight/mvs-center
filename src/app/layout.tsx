import { useAuth } from '@/core/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Spinner,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Home, User, FileText, Users, Settings, ChartLine } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

const navigationItems = [
  { title: 'Головна', url: '/', icon: Home },
  { title: 'Мій профіль', url: '/profile', icon: User },
  { title: 'Мої заявки', url: '/profile/tickets', icon: FileText },
];

const operatorItems = [
  { title: 'Заявки', url: '/admin/tickets', icon: FileText },
  { title: 'Користувачі', url: '/admin/users', icon: Users },
  { title: 'Порівняння', url: '/admin/comparison', icon: ChartLine },
  { title: 'Налаштування', url: '/admin/settings', icon: Settings },
];

export const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    value: { isPending, user },
  } = useAuth();

  const isAuthRoute =
    location.pathname.startsWith('/signin') || location.pathname.startsWith('/register');

  useEffect(() => {
    if (!isPending && !isAuthRoute && !user) {
      navigate('/signin');
    }
  }, [isPending, isAuthRoute, user, navigate]);

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="size-7" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      {!isAuthRoute && (
        <Sidebar>
          <SidebarHeader className="h-16 flex items-center px-4 border-b">
            <SidebarMenuButton asChild className="font-bold text-base hover:bg-transparent">
              <Link to="/">Сервісний центр МВС</Link>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.url} className="flex items-center gap-2">
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {user?.role === 'OPERATOR' && (
              <SidebarGroup>
                <SidebarGroupLabel>Панель керування</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {operatorItems.map((item) => {
                      const isActive = location.pathname === item.url;

                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link to={item.url} className="flex items-center gap-2">
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
        </Sidebar>
      )}

      <SidebarInset className="flex h-screen flex-col">
        {!isAuthRoute && <Header />}

        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <Spinner className="size-7" />
            </div>
          }
        >
          <main className="flex-1 px-4 overflow-auto">
            <Outlet />
          </main>
        </Suspense>

        {!isAuthRoute && (
          <footer className="container mx-auto px-1 py-2 text-center text-sm font-semibold border-t">
            Тема 18: Структура даних та алгоритм під час підтримки роботи сервісного центру МВС.
            Порівняння алгоритмів сортування з heapsort як базовим
          </footer>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
