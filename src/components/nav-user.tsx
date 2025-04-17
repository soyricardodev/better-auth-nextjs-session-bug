"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, buttonVariants } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signOut } from "~/auth/auth-client";

import { BoltIcon, Layers2Icon, LogOutIcon } from "lucide-react";
import { cn, extractUserInitials } from "~/lib/utils";
import Link from "next/link";
import { useUser } from "~/auth/user-provider";
import { use } from "react";
import { useRouter } from "next/navigation";

export function NavUser() {
	const router = useRouter();

	const { userPromise } = useUser();
	const userData = use(userPromise);

	async function handleSignOut() {
		await signOut({
			fetchOptions: {
				onSuccess() {
					router.push("/login");
				},
			},
		});
	}

	if (userData == null) {
		return (
			<div className="flex items-center gap-2">
				<Link
					href="/login"
					className={cn(
						buttonVariants({ variant: "ghost", size: "sm" }),
					)}
				>
					Login
				</Link>
				<Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
					Register
				</Link>
			</div>
		);
	}

	const user = userData?.user;
	const userInitials = extractUserInitials(user?.name ?? "");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
					<Avatar>
						<AvatarImage src={user.image || undefined} alt={user.name} />
						<AvatarFallback>{userInitials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64">
				<DropdownMenuLabel className="flex min-w-0 flex-col">
					<span className="text-foreground truncate text-sm font-medium">
						{user.name}
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						{user.email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/profile">
							<BoltIcon size={16} className="opacity-60" aria-hidden="true" />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>
					<LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
