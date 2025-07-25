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
import { MoreHorizontal, Pencil, Trash2, Ban, CheckCircle, Eye, MessageSquare } from 'lucide-react';
import { Admin } from '@/lib/data';
import { AdminDetailsDialog } from './admin-details-dialog';
import { ChatDialog } from '../dialogs/chat-dialog';

interface AdminTableProps {
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}


export function AdminTable({ admins, setAdmins }: AdminTableProps) {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [chattingWithAdmin, setChattingWithAdmin] = useState<Admin | null>(null);

  const toggleAdminStatus = (id: string) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === 'Active' ? 'Suspended' : 'Active',
            }
          : admin
      )
    );
  };

  const handleViewDetails = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDetailsOpen(true);
  }

  const handleChat = (admin: Admin) => {
    setChattingWithAdmin(admin);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Administrator</TableHead>
            <TableHead>Wallet Balance</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id} className="cursor-pointer" onClick={() => handleViewDetails(admin)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://placehold.co/40x40?text=${admin.name[0]}`}
                      data-ai-hint="avatar admin"
                    />
                    <AvatarFallback>{admin.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-muted-foreground">{admin.email}</p>
                  </div>
                </div>
              </TableCell>
               <TableCell>₹{admin.walletBalance.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                    {admin.permissions.map(p => <Badge variant="secondary" key={p}>{p}</Badge>)}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={admin.status === 'Active' ? 'default' : 'destructive'}
                  className={admin.status === 'Active' ? 'bg-green-500/80' : ''}
                >
                  {admin.status}
                </Badge>
              </TableCell>
              <TableCell>{admin.joined}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuItem onClick={() => handleViewDetails(admin)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChat(admin)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat with Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleAdminStatus(admin.id)}>
                      {admin.status === 'Active' ? (
                        <Ban className="mr-2 h-4 w-4" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      {admin.status === 'Active' ? 'Suspend' : 'Reactivate'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {selectedAdmin && (
        <AdminDetailsDialog
          admin={selectedAdmin}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
      {chattingWithAdmin && (
        <ChatDialog
          open={!!chattingWithAdmin}
          onOpenChange={(isOpen) => !isOpen && setChattingWithAdmin(null)}
          userName={chattingWithAdmin.name}
          userAvatar={`https://placehold.co/40x40?text=${chattingWithAdmin.name[0]}`}
          isUserView={false}
          chatWith="user"
        />
      )}
    </>
  );
}
