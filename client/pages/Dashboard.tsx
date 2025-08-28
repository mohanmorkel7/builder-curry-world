import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  LogOut,
  Settings,
  Shield,
  Bell,
  Search,
  Menu,
  Home,
  FileText,
  Database,
  UserCheck
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1% from last month',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180.1% from last month',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+19% from last month',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      title: 'Server Status',
      value: '99.9%',
      change: 'All systems operational',
      icon: Activity,
      trend: 'stable'
    }
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Updated user profile', time: '2 minutes ago', type: 'update' },
    { user: 'Jane Smith', action: 'Created new project', time: '5 minutes ago', type: 'create' },
    { user: 'Mike Johnson', action: 'Deleted old files', time: '10 minutes ago', type: 'delete' },
    { user: 'Sarah Wilson', action: 'Modified settings', time: '15 minutes ago', type: 'update' },
    { user: 'Tom Brown', action: 'Added new user', time: '1 hour ago', type: 'create' }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Users', active: false },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Database, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-xl text-slate-800">AdminPro</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out`}>
          <div className="p-6 pt-8">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-slate-600 mt-1">
                Here's what's happening with your business today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-slate-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <p className="text-xs text-slate-500 mt-1">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart Card */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                      <p className="text-slate-600">Chart visualization would go here</p>
                      <p className="text-sm text-slate-500 mt-1">Revenue: $45,231.89 ↗️ 20.1%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Recent Activity</CardTitle>
                  <CardDescription>Latest actions performed by users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'create' ? 'bg-green-500' :
                          activity.type === 'update' ? 'bg-blue-500' :
                          'bg-red-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">
                            {activity.user}
                          </p>
                          <p className="text-sm text-slate-600 truncate">
                            {activity.action}
                          </p>
                        </div>
                        <div className="text-xs text-slate-500">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
                <CardDescription>Frequently used admin functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Database className="h-6 w-6" />
                    <span className="text-sm">Database</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <UserCheck className="h-6 w-6" />
                    <span className="text-sm">User Roles</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
