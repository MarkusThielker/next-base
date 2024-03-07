'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { AlertCircle, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import React, { JSX } from 'react';
import { ActionResponse } from '@/lib/actions/types/ActionResponse';

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({...props}: ToasterProps) => {
    const {theme = 'system'} = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-muted-foreground',
                    actionButton:
                        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                    cancelButton:
                        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                },
            }}
            {...props}
        />
    );
};

function sonnerContent(value: ActionResponse) {

    let icon: JSX.Element | undefined = undefined;
    switch (value.type) {
        case 'success':
            icon = <CheckCircle className="w-5 h-5 text-green-600"/>;
            break;
        case 'error':
            icon = <XCircle className="w-5 h-5 text-red-600"/>;
            break;
        case 'warning':
            icon = <AlertCircle className="w-5 h-5 text-yellow-600"/>;
            break;
        case 'info':
            icon = <HelpCircle className="w-5 h-5 text-blue-600"/>;
            break;
    }

    return (
        <div className="inline-flex items-center space-x-2 text-md">
            {icon}
            <span>{value.message}</span>
        </div>
    );
}

export { Toaster, sonnerContent };
