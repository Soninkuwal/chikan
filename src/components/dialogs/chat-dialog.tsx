'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Send, Smile, Paperclip, File, MoreHorizontal, MessageSquare, Forward, X, Heart, Video, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore, Message } from '@/lib/chat-store';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '../ui/progress';


interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userAvatar: string;
  isUserView?: boolean;
  chatWith?: 'user' | 'owner';
}

const emojis = ['😊', '😂', '❤️', '👍', '🙏', '🎉', '🔥', '🤔', '😢', '😡', '🤯', '😎'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ChatDialog({ open, onOpenChange, userName, userAvatar, isUserView = false, chatWith = 'user' }: ChatDialogProps) {
  const chatIdentifier = chatWith === 'owner' ? `admin_owner_chat` : userName;
  const { messages, addMessage, listenToMessages } = useChatStore();
  const userMessages = messages[chatIdentifier] || [];
  
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileToSend, setFileToSend] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const unsubscribe = listenToMessages(chatIdentifier);
      return () => unsubscribe();
    }
  }, [open, chatIdentifier, listenToMessages]);
  
  const sendMessage = (text: string, type: Message['type'] = 'text', fileUrl?: string) => {
    if (text.trim() || type !== 'text' || fileUrl) {
      let sender: Message['sender'] = 'user';
      if (chatWith === 'owner') {
        sender = 'admin';
      } else if (!isUserView) {
        sender = 'admin';
      }

      
      const message: Omit<Message, 'timestamp'> = {
        text: fileUrl || text,
        sender: sender,
        type: type,
        ...(replyingTo && {
            replyTo: {
                text: replyingTo.text,
                sender: replyingTo.sender,
            }
        })
      };
      
      addMessage(chatIdentifier, message as Message);
      setNewMessage('');
      setReplyingTo(null);
      setFilePreview(null);
      setFileToSend(null);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileToSend) {
        handleSendFile();
    } else {
        sendMessage(newMessage, 'text');
    }
  };

  const handleEmojiClick = (emoji: string) => {
      setNewMessage(prev => prev + emoji);
  }

  const handleSendAnimatedEmoji = () => {
    sendMessage('❤️', 'animated_emoji');
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setFileToSend(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendFile = () => {
    if (!fileToSend) return;
    
    setUploadProgress(0);
    const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
            if (prev === null) return 0;
            const nextProgress = prev + 20;
            if (nextProgress >= 100) {
                clearInterval(uploadInterval);
                setTimeout(() => {
                    const fileType = fileToSend.type.startsWith('image/') ? 'image' : 'video';
                    sendMessage(fileToSend.name, fileType, filePreview!);
                    setUploadProgress(null);
                }, 500);
                return 100;
            }
            return nextProgress;
        })
    }, 200);

    toast({
        title: "Uploading file...",
        description: `${fileToSend.name}`,
    })
  }

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  }

  const handleForward = (message: Message) => {
    setNewMessage(message.text);
    toast({
        title: "Message Forwarded",
        description: "Message content has been copied to the input box."
    });
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
            const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollableNode) {
              scrollableNode.scrollTo({ top: scrollableNode.scrollHeight, behavior: 'smooth' });
            }
        }, 100)
    }
  }, [userMessages]);
  
  const formatTimestamp = (timestamp: number | object) => {
    if (typeof timestamp !== 'number') return 'sending...';
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const getAvatarForSender = (sender: Message['sender']) => {
      if (sender === 'admin' && chatWith === 'user') {
          return "https://placehold.co/40x40?text=A"
      }
       if (sender === 'owner') {
          return "https://placehold.co/40x40?text=O"
      }
      return userAvatar;
  }
  
   const getAvatarFallbackForSender = (sender: Message['sender']) => {
      if (sender === 'admin' && chatWith === 'user') {
          return 'A';
      }
      if (sender === 'owner') {
          return 'O'
      }
      return userName[0];
  }
  
  const getDialogTitle = () => {
    if(chatWith === 'owner') return 'Owner';
    return isUserView ? 'Admin Support' : userName;
  }
  
  const getCurrentUser = () => {
     if(chatWith === 'owner' || !isUserView) return 'admin';
     return 'user';
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-4 border-b flex-row items-center space-x-4">
            <Avatar className="relative">
                <AvatarImage src={isUserView ? "https://placehold.co/40x40?text=A" : userAvatar} alt={userName} data-ai-hint="avatar user"/>
                <AvatarFallback>{isUserView ? 'A' : userName[0]}</AvatarFallback>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"/>
            </Avatar>
            <div>
              <DialogTitle>{getDialogTitle()}</DialogTitle>
              <p className="text-xs text-green-500 font-semibold">Online</p>
            </div>
        </DialogHeader>
        <div className="flex flex-col h-[60vh]">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
                {userMessages.map((msg, index) => {
                const isCurrentUserMsg = msg.sender === getCurrentUser()
                
                return (
                 <div key={index} className={cn("flex items-end gap-2 group", isCurrentUserMsg ? 'justify-end' : 'justify-start')}>
                    {!isCurrentUserMsg && (
                        <Avatar className="h-8 w-8 self-end">
                            <AvatarImage src={getAvatarForSender(msg.sender)} alt={userName} data-ai-hint="avatar support"/>
                             <AvatarFallback>{getAvatarFallbackForSender(msg.sender)}</AvatarFallback>
                        </Avatar>
                    )}

                    {isCurrentUserMsg && (
                         <div className="flex-col items-center self-center hidden group-hover:flex">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleReply(msg)}>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        <span>Reply</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleForward(msg)}>
                                        <Forward className="mr-2 h-4 w-4" />
                                        <span>Forward</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                   
                    <div className={cn(
                        "max-w-xs rounded-lg p-2 text-sm", 
                        isCurrentUserMsg
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    )}>
                        {msg.replyTo && (
                            <div className="p-2 mb-2 border-l-2 border-primary/50 bg-black/10 rounded-md">
                                <p className="font-bold text-xs">{msg.replyTo.sender === (isUserView ? 'user' : 'admin') ? 'You' : (isUserView ? 'Admin' : userName)}</p>
                                <p className="text-xs opacity-80 truncate">{msg.replyTo.text}</p>
                            </div>
                        )}
                        {msg.type === 'file' ? (
                            <div className="flex items-center gap-2 p-1">
                                <File className="h-6 w-6" />
                                <span className="underline cursor-pointer">{msg.text}</span>
                            </div>
                        ) : msg.type === 'animated_emoji' ? (
                            <div className="text-5xl animate-ping once p-2">
                                {msg.text}
                            </div>
                        ) : msg.type === 'image' ? (
                           <img src={msg.text} alt="sent image" className="rounded-md max-w-full h-auto" data-ai-hint="user image"/>
                        ) : msg.type === 'video' ? (
                            <video src={msg.text} controls className="rounded-md max-w-full h-auto" data-ai-hint="user video"/>
                        ) : (
                             <p className="p-1">{msg.text}</p>
                        )}
                       
                        <p className={cn(
                            "text-xs mt-1 text-right px-1",
                             isCurrentUserMsg
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        )}>{formatTimestamp(msg.timestamp)}</p>
                    </div>
                     {isCurrentUserMsg && (
                        <Avatar className="h-8 w-8 self-end">
                           <AvatarImage src={isUserView ? userAvatar : "https://placehold.co/40x40?text=A"} data-ai-hint="avatar support"/>
                           <AvatarFallback>{isUserView ? userName[0] : 'A'}</AvatarFallback>
                        </Avatar>
                    )}
                     {!isCurrentUserMsg && (
                         <div className="flex-col items-center self-center hidden group-hover:flex">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleReply(msg)}>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        <span>Reply</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleForward(msg)}>
                                        <Forward className="mr-2 h-4 w-4" />
                                        <span>Forward</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
                )})}
            </div>
            </ScrollArea>
             {replyingTo && (
                <div className="p-2 border-t bg-muted/50 flex justify-between items-center">
                    <div className="text-xs">
                        <p className="font-bold">Replying to {replyingTo.sender === (isUserView ? 'user' : 'admin') ? 'yourself' : (isUserView ? 'Admin' : userName)}</p>
                        <p className="truncate text-muted-foreground">{replyingTo.text}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setReplyingTo(null)}>
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {filePreview && (
                 <div className="p-2 border-t bg-muted/50">
                     <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-bold">Preview</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setFilePreview(null); setFileToSend(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}>
                            <X className="h-4 w-4"/>
                        </Button>
                     </div>
                     <div className="relative max-h-48 overflow-hidden rounded-md flex items-center justify-center bg-black/50">
                        {fileToSend?.type.startsWith('image/') ? (
                           <img src={filePreview} alt="preview" className="max-h-48 w-auto" data-ai-hint="preview image"/>
                        ) : fileToSend?.type.startsWith('video/') ? (
                            <video src={filePreview} controls className="max-h-48 w-auto" data-ai-hint="preview video"/>
                        ) : (
                             <div className="p-4 flex items-center gap-2 text-muted-foreground">
                                <File className="h-8 w-8"/>
                                <span>{fileToSend?.name}</span>
                            </div>
                        )}
                    </div>
                     {uploadProgress !== null && (
                         <div className="mt-2">
                            <Progress value={uploadProgress} className="w-full h-2" />
                            <p className="text-xs text-center mt-1">{uploadProgress}% uploaded</p>
                         </div>
                    )}
                 </div>
            )}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button type="button" variant="ghost" size="icon">
                            <Smile />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                        <div className="grid grid-cols-6 gap-1">
                            {emojis.map(emoji => (
                                <Button
                                    key={emoji}
                                    variant="ghost"
                                    size="icon"
                                    className="text-xl"
                                    onClick={() => handleEmojiClick(emoji)}
                                >
                                    {emoji}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    autoFocus
                    disabled={filePreview !== null}
                />
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*"/>

                <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip />
                </Button>
                
                <Button type="button" variant="ghost" size="icon" onClick={handleSendAnimatedEmoji} className="text-red-500">
                    <Heart />
                </Button>

                <Button type="submit" size="icon" disabled={!newMessage.trim() && !fileToSend}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
