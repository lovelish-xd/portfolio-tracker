'use client';
import Image from "next/image";
import Notification from "./notification";
import { useAuth } from '../contexts/Authcontext'; 
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        logout();
        router.push('/signin');
    };

    return (
        <div>
        <Notification />
        <nav className="flex items-center justify-between px-4 py-4 bg-slate-400 ">
            <div id="logo">
                <Image
                    alt="capx logo"
                    className="h-10"
                    height={40}
                    src="/assets/logo.png"
                    width={103}
                />
            </div>
            <div id="menu" className="text-black flex items-center justify-between">
                <p className="mx-4">Hi,{user?.user.fullname || 'User'}</p>
                <button 
                    onClick={handleSignOut}
                    className="border-none p-1 rounded-md hover:bg-red-500 bg-red-400"
                >
                    Sign Out
                </button>
            </div>
        </nav>
        </div>
    );
}