import React from 'react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center h-[60vh]"
        >
            <h1 className="text-4xl font-bold text-primary tracking-tighter">Notifications</h1>
            <div className="mt-8 w-full max-w-md space-y-4">
                <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold">New Message</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                        You have received a new message from the admin.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold">System Update</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                        The system will undergo maintenance in 24 hours.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                </div>
            </div>
            <Button className="mt-8" variant="outline" onClick={() => navigate('/')}>
                Back to Dashboard
            </Button>
        </motion.div>
    );
};

export default NotFound;