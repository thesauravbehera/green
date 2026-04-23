import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Users, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
}

// Sample chat messages
const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Green',
    userAvatar: '',
    message: 'Hey everyone! Just harvested my first tomatoes! 🍅',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Mike Chen',
    userAvatar: '',
    message: 'Congrats Sarah! How long did they take to grow?',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  },
  {
    id: '3',
    userId: 'user1',
    userName: 'Sarah Green',
    userAvatar: '',
    message: 'About 3 months from seed! Worth the wait!',
    timestamp: new Date(Date.now() - 1000 * 60 * 2)
  }
];

export function CommunityChat() {
  const { currentUser, userLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState(24); // Mock online users count
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    if (!isOpen) return;

    const savedMessages = localStorage.getItem('community_chat');
    const allMessages = savedMessages ? JSON.parse(savedMessages) : SAMPLE_MESSAGES;
    
    // Convert date strings back to Date objects
    const messagesWithDates = allMessages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
    
    setMessages(messagesWithDates);
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userLoggedIn || !currentUser) {
      toast.error('Please log in to send messages');
      return;
    }

    if (!newMessage.trim()) return;

    try {
      const messageData: ChatMessage = {
        id: Date.now().toString(),
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userAvatar: currentUser.photoURL || '',
        message: newMessage,
        timestamp: new Date()
      };

      // Save to localStorage
      const savedMessages = localStorage.getItem('community_chat');
      const allMessages = savedMessages ? JSON.parse(savedMessages) : SAMPLE_MESSAGES;
      allMessages.push(messageData);
      localStorage.setItem('community_chat', JSON.stringify(allMessages));

      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
      toast.success('Message sent! 💬');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const formatTime = (timestamp: Date) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-2xl shadow-emerald-500/50 border-0 relative"
          size="lg"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white border-0 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {onlineUsers}
              </Badge>
            </>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="bg-slate-900/95 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Community Chat</h3>
                      <p className="text-white/80 text-xs">
                        {onlineUsers} gardeners online
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-4 space-y-3 bg-slate-950/50">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No messages yet</p>
                    <p className="text-slate-600 text-xs">Be the first to say hi! 👋</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwnMessage = currentUser?.uid === msg.userId;
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <Avatar className="w-8 h-8 border-2 border-emerald-500/20">
                          <AvatarImage src={msg.userAvatar} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs">
                            {msg.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs text-slate-400 ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                              {msg.userName}
                            </span>
                            <span className={`text-xs text-slate-600 ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                          <div
                            className={`inline-block px-3 py-2 rounded-2xl text-sm max-w-[80%] ${
                              isOwnMessage
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                                : 'bg-slate-800 text-slate-200'
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                {userLoggedIn ? (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="bg-slate-950/50 border-slate-800 text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 border-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                ) : (
                  <div className="text-center">
                    <p className="text-slate-500 text-sm mb-2">
                      Please log in to send messages
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      Log In
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}