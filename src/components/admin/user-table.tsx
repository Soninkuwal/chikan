'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Ban, CheckCircle, Eye } from 'lucide-react';
import { UserDetailsDialog } from '../dialogs/user-details-dialog';
import { User } from '@/lib/data';
import { useUserStore } from '@/lib/user-store';

interface UserTableProps {
    unreadMessages: { [key: string]: number };
    onUserSelect: (userId: string) => void;
}

export function UserTable({ unreadMessages, onUserSelect }: UserTableProps) {
  const { users, toggleUserStatus } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
    if(unreadMessages[user.name] > 0) {
        onUserSelect(user.name);
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>KYC Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email} className="cursor-pointer" onClick={() => handleViewDetails(user)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://placehold.co/40x40?text=${user.name[0]}`}
                      data-ai-hint="avatar user"
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="relative">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {unreadMessages[user.name] > 0 && (
                        <span className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>₹{user.balance.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === 'Active' ? 'default' : 'destructive'}
                  className={user.status === 'Active' ? 'bg-green-500/80' : ''}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.kyc === 'Verified'
                      ? 'default'
                      : user.kyc === 'Pending'
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    user.kyc === 'Verified'
                      ? 'bg-primary/80'
                      : user.kyc === 'Pending'
                      ? 'bg-yellow-500/80'
                      : ''
                  }
                >
                  {user.kyc}
                </Badge>
              </TableCell>
              <TableCell>{user.joined}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                      {user.status === 'Active' ? (
                        <Ban className="mr-2 h-4 w-4" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      {user.status === 'Active' ? 'Ban User' : 'Unban User'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </>
  );
}
