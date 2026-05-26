import { useAuth } from '@/core/auth';
import { LogOut } from '@/features/logout';
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
  SidebarFooter,
  Spinner,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Home, User, FileText, Users, Settings, ChartLine, ShieldCheck, Car } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

const navigationItems = [
  { title: 'Головна', url: '/', icon: Home },
  { title: 'Мій профіль', url: '/profile', icon: User },
  { title: 'Мої заявки', url: '/profile/tickets', icon: FileText },
  { title: 'Мої авто', url: '/profile/car', icon: Car },
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

  const userInitial = user?.firstName ? user.firstName.trim().charAt(0).toUpperCase() : 'U';

  return (
    <SidebarProvider>
      {!isAuthRoute && (
        <Sidebar>
          <SidebarHeader className=" border-b h-16 bg-sidebar-background flex flex-col gap-4">
            {user && (
              <div className="flex flex-col gap-3 w-full ">
                <div className="flex items-center justify-between gap-3 px-1 py-0.5 min-w-0 w-full">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-sm shrink-0 select-none">
                      {userInitial}
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-sm font-semibold truncate text-foreground leading-tight">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs truncate text-muted-foreground mt-1">
                        {user.email || 'Користувач'}
                      </span>
                    </div>
                  </div>

                  {user.role === 'OPERATOR' && (
                    <div
                      className="flex items-center justify-center text-primary shrink-0"
                      title="Оператор"
                    >
                      <ShieldCheck className="size-4 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>
            )}
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

          <SidebarFooter>
            <LogOut />
          </SidebarFooter>
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

        {/*<footer className="container mx-auto px-1 py-2 text-center text-sm font-semibold border-t-0 opacity-0 select-none pointer-events-none h-0 p-0 overflow-hidden">

        </footer>*/}
      </SidebarInset>
    </SidebarProvider>
  );
};
