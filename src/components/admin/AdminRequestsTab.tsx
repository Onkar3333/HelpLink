import { useState } from 'react';
import { useAdminRequests, AdminRequest } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  RefreshCw,
  Loader2,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { HELP_CATEGORIES } from '@/lib/constants';

export function AdminRequestsTab() {
  const {
    requests,
    loading,
    refetch,
    verifyRequest,
    unverifyRequest,
    deleteRequest,
    updateRequestStatus,
  } = useAdminRequests();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(null);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesVerified =
      verifiedFilter === 'all' ||
      (verifiedFilter === 'verified' && request.is_verified) ||
      (verifiedFilter === 'unverified' && !request.is_verified);

    return matchesSearch && matchesStatus && matchesVerified;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'urgent':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'resolved':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return '';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = HELP_CATEGORIES.find((c) => c.id === categoryId);
    return category?.icon;
  };

  const handleDelete = (request: AdminRequest) => {
    setSelectedRequest(request);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRequest) {
      await deleteRequest(selectedRequest.id);
      setDeleteDialogOpen(false);
      setSelectedRequest(null);
    }
  };

  const criticalUnverifiedCount = requests.filter(
    (r) => r.urgency === 'critical' && !r.is_verified
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {requests.filter((r) => r.is_verified).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unverified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {requests.filter((r) => !r.is_verified).length}
            </div>
          </CardContent>
        </Card>
        <Card className={criticalUnverifiedCount > 0 ? 'border-destructive' : ''}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              {criticalUnverifiedCount > 0 && (
                <AlertTriangle className="w-4 h-4 text-destructive" />
              )}
              Critical Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {criticalUnverifiedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Verified" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={refetch} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No requests found
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const CategoryIcon = getCategoryIcon(request.category);
                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {CategoryIcon && (
                          <div className="p-2 rounded-lg bg-muted">
                            <CategoryIcon className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[200px]">
                            {request.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.city || 'No location'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={request.requester_avatar || ''} />
                          <AvatarFallback className="text-xs">
                            {request.requester_name?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm truncate max-w-[100px]">
                          {request.requester_name || 'Unknown'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(request.status)}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.is_verified ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20 gap-1">
                          <XCircle className="w-3 h-3" />
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(request.created_at), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/request/${request.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {request.is_verified ? (
                            <DropdownMenuItem
                              onClick={() => unverifyRequest(request.id)}
                            >
                              <ShieldX className="w-4 h-4 mr-2" />
                              Unverify
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => verifyRequest(request.id)}
                            >
                              <ShieldCheck className="w-4 h-4 mr-2" />
                              Verify
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => updateRequestStatus(request.id, 'closed')}
                            disabled={request.status === 'closed'}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Close Request
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(request)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete (Spam)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedRequest?.title}"? This action
              cannot be undone and will permanently remove the request and all
              associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
