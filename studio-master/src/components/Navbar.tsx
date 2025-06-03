"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Dashboard', icon: Icons.home },
        { href: '/news', label: 'Flash News', icon: Icons.newspaper },
        { href: '/marketplace', label: 'Marketplace', icon: Icons.store },
        { href: '/crop-price-estimator', label: 'Crop Price Estimator', icon: Icons.calculator },
        { href: '/crop-diagnosis', label: 'Crop Doctor', icon: Icons.leaf },
        { href: '/community', label: 'Community Forum', icon: Icons.community },
        { href: '/weather', label: 'Weather', icon: Icons.cloud },
        { href: '/cart', label: 'Cart', icon: Icons.cart },
    ];

    return (
        <motion.nav
            className="bg-primary p-4 shadow-md sticky top-0 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-primary-foreground text-xl font-bold transition-colors hover:text-accent">
                    Krishi Jyothi
                </Link>
                <ul className="flex space-x-4 md:space-x-6">
                    {navLinks.map((link) => (
                        <li key={link.href} className="nav-item">
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-primary-foreground hover:text-accent transition-colors flex items-center py-2 px-3 rounded-md hover:bg-primary/20",
                                    pathname === link.href ? 'font-semibold underline underline-offset-4' : ''
                                )}
                            >
                                {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
